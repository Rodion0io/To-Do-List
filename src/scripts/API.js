export function request(typeRequest, url, body = null){
    const headers = {
        "Content-Type": "application/json"
    }

    switch (typeRequest){
        case ("GET"):
            return fetch(url, {
                method: typeRequest,
                headers: headers
            }).then(respones => {
                if (respones.ok){
                    return respones.json();
                    console.log(success);
                }
                return respones.json().then(error => {
                    const e = new Error('Увы!');
                    e.data = error;
                    throw e;
                })
            })
        case ("POST"):
            return fetch(url, {
                method: typeRequest,
                body: JSON.stringify(body),
                headers: headers
            }).then(respones => {
                if (respones.ok){
                    return respones.json();
                }
                return respones.json().then(error => {
                    const e = new Error('Увы!');
                    e.data = error;
                    throw e;
                })
            })
        case ("DELETE"):
            return fetch(url, {
                method: typeRequest,
                headers: headers
            }).then(respones => {
                if (respones.ok){
                    return respones.json();
                }
                return respones.json().then(error => {
                    const e = new Error('Увы!');
                    e.data = error;
                    throw e;
                })
            })
        case ("PUT"):
            return fetch(url, {
                method: typeRequest,
                body: JSON.stringify(body),
                headers: headers
            }).then(respones => {
                if (respones.ok){
                    return respones.json();
                }
                return respones.json().then(error => {
                    const e = new Error('Увы!');
                    e.data = error;
                    throw e;
                })
            })
        
    }

    

}