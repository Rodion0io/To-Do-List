// import { redact } from "./redact.js";
// import { change } from "./change.js";
// import { del } from "./delete.js";

// export function f(text){
//     const listCards = document.querySelector(".cards");

//     const card = document.createElement("div");
//     card.setAttribute("id", eventObject.id);
    
//     card.classList.add("card");
//         const inputFild = document.createElement("input");
//         inputFild.setAttribute("type", "checkbox");
//         inputFild.classList.add("select");
//         inputFild.addEventListener("click", change);


//         const textBlock = document.createElement("div");
//         textBlock.classList.add("text");

//         const workList = document.createElement("p");
//         workList.classList.add("event");
//         workList.innerHTML = text;

//         const redactIcon = document.createElement("img");
//         redactIcon.classList.add("redact");
//         redactIcon.setAttribute("src", "/src/img/icons8-редактировать.svg");
//         redactIcon.addEventListener("click", redact);

//         textBlock.appendChild(workList);
//         textBlock.appendChild(redactIcon);

//         const deleteIcon = document.createElement("img");
//         deleteIcon.classList.add("icon");
//         deleteIcon.setAttribute("src", "/src/img/BlackCross.svg");
//         deleteIcon.addEventListener("click", del);

//         card.appendChild(inputFild);
//         card.appendChild(textBlock);
//         card.appendChild(deleteIcon);

//         listCards.appendChild(card);
// }