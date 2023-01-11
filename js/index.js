import { hitSearchApi, hitGetApi, submitDataApi } from './apiCall.js';
import { areaApiUrl, departmentNamesApiUrl, areaWiseDataStoreUrl, departmentWiseDataStoreUrl, otherDataStoreUrl } from '../string.js';

// area click listener
document.querySelector('#state').addEventListener('click', HitDropDownStateListApi)
document.querySelector('#district').addEventListener('click', HitDropDownDistrictListApi)
document.querySelector('#sub_district').addEventListener('click', HitDropDownSubDistrictListApi)
document.querySelector('#village').addEventListener('click', HitDropDownVillageListApi)

// usage type radio button listener
document.querySelector('#areaWise').addEventListener('click', areaPageLoad)
document.querySelector('#departmentWise').addEventListener('click', departmentPageLoad)
document.querySelector('#other').addEventListener('click', otherPageLoad)

// department click listener
document.querySelector('#ministries').addEventListener('click', HitDropDownMinistriesListApi)
document.querySelector('#area').addEventListener('click', HitDropDownAreaListApi)

// feedback problem radio btn click handler
document.querySelector('#problem').addEventListener('click', () => {
    feedbackProblemSelected = "Problem"
})
document.querySelector('#feedback').addEventListener('click', () => {
    feedbackProblemSelected = "Feedback"
})

//submit Button listener
document.querySelector('#submitBtn').addEventListener('click', submitFeedbackProblem)

// hide dialog
document.querySelector('#customDialog').addEventListener('click', () => {
    document.getElementById('customDialog').style.display = 'none'
})

let dropDownListId;
// Place Fields
let stateSelected = "none"
let districtSelected = "none"
let subDistrictSelected = "none"
let villageSelected = "none"

// Department Fields
let areaSelected = "none"
let ministrySelected = "none"

let usageType = "Place"
let feedbackProblemSelected = "Problem"


window.onload = function () {
    document.getElementById("departmentWiseDiv").style.display = "none"
};

function HitDropDownStateListApi() {
    dropDownListId = "state"
    console.log("state api working")
    // clear below list
    districtSelected = "none"
    subDistrictSelected = "none"
    villageSelected = "none"
    document.getElementById("district").length = 1
    document.getElementById("sub_district").length = 1
    document.getElementById("village").length = 1
    let dropdownList = document.getElementById(dropDownListId)
    stateSelected = dropdownList.value
    if (dropdownList.length <= 1) {
        hitSearchApi(areaApiUrl + "/search", updateUrl(), LoadDropdownList)
    }
}

function HitDropDownDistrictListApi() {
    // store selected data
    stateSelected = getDataFromField("state")

    dropDownListId = "district";
    //clear below list
    subDistrictSelected = "none"
    villageSelected = "none"
    document.getElementById("sub_district").length = 1
    document.getElementById("village").length = 1
    let dropdownList = document.getElementById(dropDownListId)
    districtSelected = dropdownList.value
    if (dropdownList.length <= 1) {
        hitSearchApi(areaApiUrl + "/search", updateUrl(), LoadDropdownList)
    }
}

function HitDropDownSubDistrictListApi() {
    // store selected data
    districtSelected = getDataFromField("district")

    dropDownListId = "sub_district";
    // clear below list
    villageSelected = "none"
    document.getElementById("village").length = 1
    let dropdownList = document.getElementById(dropDownListId)
    subDistrictSelected = dropdownList.value
    if (dropdownList.length <= 1) {
        hitSearchApi(areaApiUrl + "/search", updateUrl(), LoadDropdownList)
    }
}

function HitDropDownVillageListApi() {
    // store selected data
    subDistrictSelected = getDataFromField("sub_district")

    dropDownListId = "village";
    let dropdownList = document.getElementById(dropDownListId)
    villageSelected = dropdownList.value
    if (dropdownList.length <= 1) {
        hitSearchApi(areaApiUrl + "/search", updateUrl(), LoadDropdownList)
    }
}

function HitDropDownMinistriesListApi() {
    dropDownListId = "ministries";
    let dropdownList = document.getElementById(dropDownListId)
    ministrySelected = dropdownList.value
    if (dropdownList.length <= 1) {
        hitGetApi(departmentNamesApiUrl, LoadDropdownList)
    }
}

function HitDropDownAreaListApi() {
    dropDownListId = "area";
    // clear below list
    districtSelected = "none"
    subDistrictSelected = "none"
    villageSelected = "none"
    let dropdownList = document.getElementById(dropDownListId)
    areaSelected = dropdownList.value
    let filter = {
        "state": "none",
        "district": "none",
        "subDistrict": "none",
        "village": "none"
    }
    if (dropdownList.length <= 1) {
        hitSearchApi(areaApiUrl + "/search", filter, LoadDropdownList)
    }
}

function LoadDropdownList(data) {
    // console.log(JSON.stringify(data))
    let dropdownList = document.getElementById(dropDownListId)
    console.log(dropdownList + "       " + dropDownListId)
    dropdownList.length = 0

    let defaultOption = document.createElement("option");
    if (dropDownListId == "area") {
        defaultOption.text = `India`
        defaultOption.value = "India"
    }
    else {
        defaultOption.text = `Choose ${dropDownListId}`
        defaultOption.value = "none"
    }

    dropdownList.add(defaultOption);
    dropdownList.selectedIndex = 0;
    let array = [];

    switch (dropDownListId) {
        case "state":
            for (let i = 0; i < Object.keys(data).length; i++) {
                array.push(data[i].state)
            }
            break;

        case "area":
            for (let i = 0; i < Object.keys(data).length; i++) {
                array.push(data[i].state)
            }
            break;

        case "district":
            for (let i = 0; i < Object.keys(data[0].districts).length; i++) {
                array.push(data[0].districts[i].districtName)
            }
            break;

        case "sub_district":
            for (let i = 0; i < Object.keys(data[0].districts[0].subDistricts).length; i++) {
                array.push(data[0].districts[0].subDistricts[i].subDistrictName)
            }
            break;

        case "village":
            for (let i = 0; i < Object.keys(data[0].districts[0].subDistricts[0].villages).length; i++) {
                array.push(data[0].districts[0].subDistricts[0].villages[i].villageName)
            }
            break;

        case "ministries":
            for (let i = 0; i < Object.keys(data[0].ministries).length; i++) {
                array.push(data[0].ministries[i].ministries)
            }
            break;

        default:
            break;
    }
    array.sort();
    console.log("size"+array.length)
    dropdownList.length = array.length
    for (let i = 0; i < array.length; i++) {
        let option = document.createElement('option');
        option.text = array[i];
        option.value = array[i];
        dropdownList.add(option);
    }

}

function updateUrl() {
    let filter = {
        "state": stateSelected,
        "district": districtSelected,
        "subDistrict": subDistrictSelected,
        "village": villageSelected
    }
    return filter
}

function areaPageLoad() {
    usageType = "Place"
    document.getElementById("areaWiseDiv").style.display = "block"
    document.getElementById("departmentWiseDiv").style.display = "none"
}

function departmentPageLoad() {
    usageType = "Department"
    document.getElementById("areaWiseDiv").style.display = "none"
    document.getElementById("departmentWiseDiv").style.display = "block"
}

function otherPageLoad() {
    usageType = "Other"
    document.getElementById("areaWiseDiv").style.display = "none"
    document.getElementById("departmentWiseDiv").style.display = "none"
}


// Tags Code    ------Start------
const tagContainer = document.querySelector('.tag-container');
const input = document.querySelector('.tag-container input');
input.setAttribute('placeholder', 'HashTags (optional)')
let tags = [];

function createTag(label) {
    const div = document.createElement('div');
    div.setAttribute('class', 'tag');
    const span = document.createElement('span');
    // span.setAttribute('placeholder',"Tags if any")
    span.innerHTML = label;
    span.setAttribute('class', 'span')
    const closeIcon = document.createElement('i');
    //closeIcon.innerHTML = 'close';
    closeIcon.setAttribute('class', 'gg-close')
    closeIcon.setAttribute('data-item', label);
    div.appendChild(span);
    div.appendChild(closeIcon);
    return div;
}

function clearTags() {
    document.querySelectorAll('.tag').forEach(tag => {
        tag.parentElement.removeChild(tag);
    });
}

function addTags() {
    clearTags();
    tags.slice().reverse().forEach(tag => {
        tagContainer.prepend(createTag(tag));
    });
}

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        if (e.target.value.trim() != "") {
            e.target.value.split(",").forEach(tag => {
                tags.push(tag.trim());
            });
            addTags();
            input.value = '';
        }
    }
});

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'I') {
        const tagLabel = e.target.getAttribute('data-item');
        const index = tags.indexOf(tagLabel);
        tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
        addTags();
    }
})

// Tag code ------End------

function submitFeedbackProblem() {
    switch (usageType) {
        case "Place":
            // store selected data
            villageSelected = getDataFromField("village")

            if (emptyCheckField(stateSelected, "State")) { }
            else if (emptyCheckField(districtSelected, "District")) { }
            else if (emptyCheckField(subDistrictSelected, "Sub-District")) { }
            else if (emptyCheckField(villageSelected, "Village")) { }
            else if (document.getElementById('pincode').value == "") {
                window.alert("PinCode field is empty")
            }
            else if (document.getElementById('feedbackProblem').innerHTML.replace(/&nbsp;/g, '').length <= 20) {
                let remainingChar = 20 - document.getElementById('feedbackProblem').innerHTML.replace(/&nbsp;/g, '').length
                window.alert(`Please Input ${remainingChar} Char more`)
            }
            else {
                let data = {
                    "state": stateSelected,
                    "district": districtSelected,
                    "subDistrict": subDistrictSelected,
                    "village": villageSelected,
                    "pinCode": document.getElementById('pincode').value,
                    "feedback": (feedbackProblemSelected == "Feedback"),
                    "problem": (feedbackProblemSelected == "Problem"),
                    "msg": document.getElementById('feedbackProblem').innerHTML,
                    "hashTags": tags
                }
                submitDataApi(areaWiseDataStoreUrl, data, dataSubmited)
            }
            break;
        case "Department":
            // store selected data
            ministrySelected = getDataFromField("ministries")

            if (emptyCheckField(ministrySelected, "Ministry")) { }
            else if (emptyCheckField(areaSelected, "Area")) { }
            else if (document.getElementById('departmentInfo').innerHTML.replace(/&nbsp;/g, '').length <= 0) {
                window.alert("Department Info field is empty")
            }
            else if (document.getElementById('feedbackProblem').innerHTML.replace(/&nbsp;/g, '').length < 20) {
                let remainingChar = 20 - document.getElementById('feedbackProblem').innerHTML.replace(/&nbsp;/g, '').length
                window.alert(`Please Input ${remainingChar} Char more`)
            }
            else {

                let data = {
                    "ministries": ministrySelected,
                    "area": areaSelected,
                    "departmentInfo": document.getElementById("departmentInfo").innerHTML,
                    "feedback": (feedbackProblemSelected == "Feedback"),
                    "problem": (feedbackProblemSelected == "Problem"),
                    "msg": document.getElementById('feedbackProblem').innerHTML,
                    "hashTags": tags
                }
                submitDataApi(departmentWiseDataStoreUrl, data, dataSubmited)

            }
            break;
        case "Other":


            if (document.getElementById('feedbackProblem').innerHTML.replace(/&nbsp;/g, '').length < 20) {
                let remainingChar = 20 - document.getElementById('feedbackProblem').innerHTML.replace(/&nbsp;/g, '').length
                window.alert(`Please Input ${remainingChar} Char more`)
            }
            else {
                let data = {
                    "feedback": (feedbackProblemSelected == "Feedback"),
                    "problem": (feedbackProblemSelected == "Problem"),
                    "msg": document.getElementById('feedbackProblem').innerHTML,
                    "hashTags": tags
                }
                submitDataApi(otherDataStoreUrl, data, dataSubmited)

            }
            break;
        default:
            window.alert("Something went wrong here! Please reload the Page")
            break;
    }

}

function emptyCheckField(data, field) {
    if (data == "none") {
        window.alert(`${field} field is empty`)
        return true
    }
    return false
}
function dataSubmited(url, id) {
    let data = {
        "url": url,
        "id": id
    }
    sessionStorage.setItem("documentId", JSON.stringify(data));
    clearForm()
    console.log(data.id)
    document.getElementById('customDialog').style.display = "flex"
    document.getElementById('customDialog').innerHTML = '<object  id="customDialogObject" type="text/html" data="https://help-portal2-4gik-main-vplgaqghsq-wm.a.run.app/verification"/>'
}

function clearForm() {
    document.getElementById('feedbackProblem').innerHTML = ""
    clearTags()
}

function getDataFromField(data) {
    let dropdownList = document.getElementById(data)
    return dropdownList.value
}


