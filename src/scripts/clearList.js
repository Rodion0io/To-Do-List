import file from "../data.json" with {type: "json"}
import { request } from "./API.js"
import { URL } from "./contsnts.js"

export function clearList(){
    request("DELETE", `${URL}clear`)
        .then(() => console.log("Успех"))
        .catch(() => console.log("Провал"));
}