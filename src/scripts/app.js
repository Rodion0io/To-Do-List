import file from "../data.json" with { type: "json" };
import { redact } from "./redact.js";
import { change } from "./change.js";
import { del } from "./delete.js";
import { saveData } from "./saveData.js";

// Обработчик добавления дела
document.getElementById("add").addEventListener("click", () => {

    let eventObject = {
        id: undefined,
        event: undefined, 
        isSelected: false,
    };
    
    let event = prompt("Введите событие:");
    if (event != "" && event != null){
        eventObject.event = event;
        eventObject.id = Math.random();
        file.push(eventObject);
        console.log(file);
    
    const listCards = document.querySelector(".cards");

    const card = document.createElement("div");
    card.setAttribute("id", eventObject.id);
    
    card.classList.add("card");
        const inputFild = document.createElement("input");
        inputFild.setAttribute("type", "checkbox");
        inputFild.classList.add("select");
        if (eventObject.isSelected){
            inputFild.checked = true;
        }
        else{
            inputFild.checked = false;
        }
        inputFild.addEventListener("click", change);


        const textBlock = document.createElement("div");
        textBlock.classList.add("text");

        const workList = document.createElement("p");
        workList.classList.add("event");
        workList.innerHTML = eventObject.event;

        const redactIcon = document.createElement("img");
        redactIcon.classList.add("redact");
        redactIcon.setAttribute("src", "/src/img/icons8-редактировать.svg");
        redactIcon.addEventListener("click", redact);

        textBlock.appendChild(workList);
        textBlock.appendChild(redactIcon);

        const deleteIcon = document.createElement("img");
        deleteIcon.classList.add("icon");
        deleteIcon.setAttribute("src", "/src/img/BlackCross.svg");
        deleteIcon.addEventListener("click", del);

        card.appendChild(inputFild);
        card.appendChild(textBlock);
        card.appendChild(deleteIcon);

        listCards.appendChild(card);
    }
    
})

document.getElementById("update").addEventListener("click", saveData)
document.getElementById("clear").addEventListener("click", function() {
    if (file.length !== 0){
        for (let i = 0; i < file.length; i++){
            document.querySelector(".cards").innerHTML = "";
        }
        file.splice(0, file.length);
        console.log(file);
        alert("Хранилище списка очищено!");
    }
    else{
        alert("Хранилище пусто");
    }
})


window.addEventListener("load", function(){
    const cloudFile = JSON.parse(localStorage.getItem("data"));
    for (let i = 0; i < cloudFile.length; i++){
        file.push(cloudFile[i]);
        const listCards = document.querySelector(".cards");

        const card = document.createElement("div");
        card.setAttribute("id", cloudFile[i].id);
        
        card.classList.add("card");
            const inputFild = document.createElement("input");
            inputFild.setAttribute("type", "checkbox");
            inputFild.classList.add("select");
            if (cloudFile[i].isSelected){
                inputFild.checked = true;
            }
            else{
                inputFild.checked = false;
            }
            inputFild.addEventListener("click", change);


            const textBlock = document.createElement("div");
            textBlock.classList.add("text");

            const workList = document.createElement("p");
            workList.classList.add("event");
            workList.innerHTML = cloudFile[i].event;

            const redactIcon = document.createElement("img");
            redactIcon.classList.add("redact");
            redactIcon.setAttribute("src", "/src/img/icons8-редактировать.svg");
            redactIcon.addEventListener("click", redact);

            textBlock.appendChild(workList);
            textBlock.appendChild(redactIcon);

            const deleteIcon = document.createElement("img");
            deleteIcon.classList.add("icon");
            deleteIcon.setAttribute("src", "/src/img/BlackCross.svg");
            deleteIcon.addEventListener("click", del);

            card.appendChild(inputFild);
            card.appendChild(textBlock);
            card.appendChild(deleteIcon);

            listCards.appendChild(card);
    }
    console.log(file)
})

let flag = 0;
document.getElementById("unwrap").addEventListener("click", function(){
    
    if (!flag){
        flag = 1;
        document.querySelector(".list-btn").setAttribute("src", "/src/img/icons8-свернуть-50.png");
        document.querySelector(".cards").style.height = "auto";
    }
    else{
        flag = 0;
        document.querySelector(".list-btn").setAttribute("src", "/src/img/icons8-развернуть-50.png");
        document.querySelector(".cards").style.height = "180px";  
    }
})