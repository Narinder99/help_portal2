import { updateDataApi } from './apiCall.js'

let documentId = JSON.parse(sessionStorage.getItem('documentId')).id
let url = JSON.parse(sessionStorage.getItem('documentId')).url.replace("submit", "update")
let updateLink = (url + `/${documentId}`).replaceAll('"', '')
sessionStorage.clear()

document.querySelector('#verifyBtn').addEventListener('click', () => {
    let data = document.getElementById('phoneNumber').value
    let param = {
        "type":"null",
        "phoneNumber": 0,
        "email": "null"
    }
    if (validateEmail(data)) { 
        param.type="email"
        param.email = data
         updateDataApi(updateLink,param,dataUpdate)

    }
    else if (validateNumber(data)) {
        param.type="phoneNumber"
        param.phoneNumber = data
        updateDataApi(updateLink,param,dataUpdate)

    }
    else {
        console.log("Invalid input! neither number nor email")
    }
    document.getElementById('customDialog').style.display = 'none'

})


function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function validateNumber(number) {
    return String(number)
        .toLowerCase()
        .match(
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        );
}

function dataUpdate(){
    console.log("data updated")
    document.getElementById('phoneNumberDiv').style.display = 'none'
    document.getElementById('btnDiv').style.display = 'none'
    document.getElementById('contact').style.display = 'flex'
    document.getElementById('connect').style.display = 'none'
    document.getElementById('thanx').style.marginTop = 0

}

