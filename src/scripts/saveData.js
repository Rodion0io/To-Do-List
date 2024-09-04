import file from "../data.json" with {type: "json"}

export function saveData(){
    if (JSON.stringify(file) == "" || JSON.stringify(file) != ""){
        localStorage.setItem("data", JSON.stringify(file));
        alert("хранилище обновлено");
        
    }
}