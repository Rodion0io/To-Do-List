import file from "../data.json" with { type: "json" };
import { URL } from "./contsnts.js";
import { request } from "./API.js";

export function redact(){

    // Про удаление события посмотрел в gpt
    document.removeEventListener('click', redactEvent);

    document.addEventListener('click', redactEvent);
}

function redactEvent(event){
    if (event.target.classList.contains('redact')) {
        let newEvent = prompt("Введите событие:");
        const parentId = event.target.closest('.card').id;
        console.log('Parent ID:', parentId);
        request("PUT", `${URL}changeText/${parentId}`, {text: newEvent})
        .then(() => console.log("Успех"))
        .catch(() => console.log("Увы!"));

        const indexInFile = file.findIndex((index) => index.id == parentId);
        console.log(indexInFile);

        const changedBlock = event.target.closest('.card').children[1].querySelector('.event');

        file[indexInFile].text = newEvent;

        changedBlock.textContent = newEvent;

        
    }
}