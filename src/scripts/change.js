import file from "../data.json" with { type: "json" };
import { request } from "./API.js";
import { URL } from "./contsnts.js";

export function change(){
    document.removeEventListener('click', checngeFlag);

    document.addEventListener('click', checngeFlag);
}


function checngeFlag(event){
    if (event.target.classList.contains("select")){
        const parentId = event.target.closest('.card').id;
        const indexInFile = file.findIndex((index) => index.id == parentId);

        console.log(parentId);
        console.log(indexInFile);
        console.log(file);

        

        if (file[indexInFile].isSelected == true){
            request("PUT", `${URL}changeIndicator/${parentId}`, {isSelected: false});
            file[indexInFile].isSelected = false;
            console.log(file[indexInFile]);
        }
        else{
            request("PUT", `${URL}changeIndicator/${parentId}`, {isSelected: true});
            file[indexInFile].isSelected = true;
            console.log(file[indexInFile]);
        }
    }
}