import file from "../data.json" with { type: "json" };

export function change(){
    document.removeEventListener('click', checngeFlag);

    document.addEventListener('click', checngeFlag);
}


function checngeFlag(event){
    if (event.target.classList.contains("select")){
        const parentId = event.target.closest('.card').id;
        const indexInFile = file.findIndex((index) => index.id == parentId);

        if (file[indexInFile].isSelected == true){
            file[indexInFile].isSelected = false;
            console.log(file[indexInFile]);
        }
        else{
            file[indexInFile].isSelected = true;
            console.log(file[indexInFile]);
        }
    }
}