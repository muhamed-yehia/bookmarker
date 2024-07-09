let siteNameInput = document.querySelector('#siteName');
let siteUrlInput = document.querySelector('#siteURL');
let inputcout = document.querySelector('#cout-name');
let inputUrl = document.querySelector('#cout-url');
let addbtn = document.querySelector("#addBtn")
let popUp = document.querySelector("#modal")
let closeBtn = document.querySelector('.btn-close')
let sitesContainer = [];

if (localStorage.getItem(`sites`) != null) {
    sitesContainer= JSON.parse(localStorage.getItem(`sites`))
    displaysites()

}

function addSite() {
    let site = {
        siteName: siteNameInput.value,
        URL: siteUrlInput.value,
    }
    sitesContainer.push(site)
    clearInput()
    displaysites()
    localStorage.setItem(`sites`, JSON.stringify(sitesContainer))
}

function displaysites() {
    let sitesInput = ``;
    for (let i = 0; i < sitesContainer.length; i++) {
        sitesInput += `<div class="text-center col-lg-2 col-md-3 col-sm-6">
        <h3 class="h6 text-white my-2">index : ${i + 1}</h3>
        <h2 class="h6 text-white my-2">web site Name : ${sitesContainer[i].siteName}</h2>
        <button onclick= "setUpdateForm(${i})" class="btn btn-outline-info btn-sm my-2 w-100 "><a href="https://${sitesContainer[i].URL}" target="_blank">Visit Site</a></button>
        <button onclick="deletSite(${i})" class="btn btn-outline-danger btn-sm my-2 w-100 ">Delete Site</button>

    </div>`
    }
    document.querySelector('#sites').innerHTML = sitesInput;
}

function clearInput() {
    siteNameInput.value = null;
    siteUrlInput.value = null;
}
function deletSite(deletedindex) {
    sitesContainer.splice(deletedindex, 1)
    displaysites()
    localStorage.setItem(`sites`, JSON.stringify(sitesContainer))
}

function validatInputs() {
    let nameValue = siteNameInput.value;
    
    let regex = {
       siteName: /^[A-Za-z0-9]{3,15}$/
    };
  
    if (regex.siteName.test(nameValue)) {
        siteNameInput.classList.replace('is-invalid','is-valid')
        inputcout.classList.replace('d-block','d-none')
        return
    } 
    else {
        siteNameInput.classList.replace('is-valid','is-invalid')
        inputcout.classList.replace('d-none','d-block')
    }

  
}
function validatInputsUrl() {

    let urlValue = siteUrlInput.value; 
    
    let regex = {
  
       URL: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?\.(\w+)*$/,
    };
  
    if (regex.URL.test(urlValue)) {
        siteUrlInput.classList.replace('is-invalid','is-valid')
        inputUrl.classList.replace('d-block','d-none')
    }
    else {
        siteUrlInput.classList.replace('is-valid','is-invalid')
        inputUrl.classList.replace('d-none','d-block')
        return;
    }
  
}

addbtn.addEventListener("click",function(){
    
    let urlValue = siteUrlInput.value; 
    let nameValue = siteNameInput.value;
    let regex = {
  
       URL: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?\.(\w+)*$/,
       siteName: /^[A-Za-z0-9]{3,15}$/

    };
  
    if (regex.URL.test(urlValue)||regex.siteName.test(nameValue)) {
        popUp.classList.replace("d-flex", "d-none")
        addSite()
        displaysites()
    }
    else {
        popUp.classList.replace("d-none", "d-flex")
        return
    }



  
   
  
})

closeBtn.addEventListener("click",function () {
    popUp.classList.replace("d-flex", "d-none")
})
