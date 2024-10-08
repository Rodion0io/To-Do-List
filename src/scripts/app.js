import file from "../data.json" with { type: "json" };
import { URL } from "./contsnts.js";
import { redact } from "./redact.js";
import { change } from "./change.js";
import { del } from "./delete.js";
import { downloadData } from "./saveData.js";
import { request } from "./API.js";
import { clearList } from "./clearList.js";

// Обработчик добавления дела
document.getElementById("add").addEventListener("click", () => {

    let eventObject = {
        id: undefined,
        text: undefined, 
        isSelected: false,
    };
    
    let text = prompt("Введите событие:");
    if (text != "" && text != null){
        eventObject.text = text;
        eventObject.id = Math.random();
        
        
        request("POST", `${URL}addEvent`, eventObject)
        .then(() => console.log("Успех"))
        .catch(() => console.log("Провал"))
        .finally(() => file.push(eventObject));

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
        workList.innerHTML = eventObject.text;

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

document.getElementById("update").addEventListener("click", downloadData)
document.getElementById("clear").addEventListener("click", function() {
    clearList();
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


document.getElementById("chooseFile").addEventListener("change", function(event) {
    // здесь мы будем обрабатывать и отправлять файл в таблицу бд
    const loadFile = event.target.files[0];

    if (loadFile) {
        const reader = new FileReader();


        if (file.length !== 0){
            for (let i = 0; i < file.length; i++){
                document.querySelector(".cards").innerHTML = "";
            }
        }
        reader.onload = function(e) {
            try {
                const cloudFile = JSON.parse(e.target.result);

                request("POST", `${URL}newList`, cloudFile).then(() => console.log("Успех!")).catch(() => console.log("Увы!"));

                file.length = 0; 
                file.push(...cloudFile);

                const listCards = document.querySelector(".cards");
                listCards.innerHTML = "";

                for (let i = 0; i < cloudFile.length; i++) {
                    const card = document.createElement("div");
                    card.setAttribute("id", cloudFile[i].id);
                    card.classList.add("card");

                    const inputFild = document.createElement("input");
                    inputFild.setAttribute("type", "checkbox");
                    inputFild.classList.add("select");

                    inputFild.checked = !!cloudFile[i].isSelected;

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

                console.log(file);
            } catch (error) {
                console.error("Ошибка при чтении или парсинге файла:", error);
            }
        };

        reader.readAsText(loadFile);
    }
});



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

window.onload = function(){
    let backFile;
    request("GET", `${URL}getList`)
        .then(data => {
            if (data && data.length) {
                console.log('Success:', data);
                backFile = data;
            } else {
                console.error('Data is empty or undefined');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            const listCards = document.querySelector(".cards");
                listCards.innerHTML = "";
            for (let i = 0; i < backFile.length; i++){
                file.push(backFile[i]);
                const card = document.createElement("div");
                card.setAttribute("id", backFile[i].id);
                card.classList.add("card");
        
                const inputFild = document.createElement("input");
                inputFild.setAttribute("type", "checkbox");
                inputFild.classList.add("select");
        
                inputFild.checked = !!backFile[i].isSelected;
        
                inputFild.addEventListener("click", change);
        
                const textBlock = document.createElement("div");
                textBlock.classList.add("text");
        
                const workList = document.createElement("p");
                workList.classList.add("event");
                workList.innerHTML = backFile[i].text;
        
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

    
}