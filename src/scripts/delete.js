import file from "../data.json" with { type: "json" };
import { request } from "./API.js";
import { URL } from "./contsnts.js";


export function del(){
    document.removeEventListener('click', deleteEvent);

    document.addEventListener('click', deleteEvent);
}

function deleteEvent(event){
    if (event.target.classList.contains('icon')) {
        const parentId = event.target.closest('.card').id;

        console.log(parentId);
        const indexInFile = file.findIndex((index) => index.id == parentId);

        document.getElementById(parentId).remove();
        request("DELETE", `${URL}delete/${parentId}`)
        .then(() => console.log("Успех"))
        .catch(() => console.log("Провал"));
        file.splice(indexInFile, 1);
        console.log(file);
    }
}