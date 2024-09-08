import file from "../data.json" with {type: "json"}

export function downloadData(){
    let a = document.createElement("a");
    let downloadFile = new Blob([JSON.stringify(file)], {type: 'application/json'});
    a.href = URL.createObjectURL(downloadFile);
    a.download = "example.json";
    a.click();
}