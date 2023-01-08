export function hitSearchApi(url,params,LoadListCallback) {
    async function getData() {
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
        let data = await response.json();

        return data;
    }

    getData().then(data => LoadListCallback(data));
}

export function hitGetApi(url,LoadListCallback) {
    async function getData() {
        let response = await fetch(url)
        let data = await response.json();
        return data;
    }
    getData().then(data => LoadListCallback(data));
}
export function submitDataApi(url,params,dataSubmited){
    async function storeData(){
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
        let data = await response.json();
        return data;    
    }
    storeData().then(data => dataSubmited(url,JSON.stringify(data._id)))
}

export function updateDataApi(url,params,dataUpdate){
    async function updateData(){
        let response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(params),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
        let data = await response.json();
        return data;    
    }
    updateData().then(data => dataUpdate())
}
