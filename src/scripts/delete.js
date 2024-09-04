import file from "../data.json" with { type: "json" };

export function del(){
    document.removeEventListener('click', deleteEvent);

    document.addEventListener('click', deleteEvent);
}

function deleteEvent(event){
    if (event.target.classList.contains('icon')) {
        const parentId = event.target.closest('.card').id;

        const indexInFile = file.findIndex((index) => index.id == parentId);

        document.getElementById(parentId).remove();
        file.splice(indexInFile, 1);

        console.log(file);
    }
}