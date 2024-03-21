
let isAuthorized = false;

checkOnValidSession().then(r => {

    console.log(isAuthorized);

    editPage(isAuthorized);

    document.addEventListener("submit", (event)=> {
        event.preventDefault();
    })
});

async function checkOnValidSession() {

    let response = await fetch("/api/login", {
        method: "GET"
    }).then(resp => resp.json());

    if(response.message === "session has been updated") {
        isAuthorized = true;
    }
}

function editPage(isAuthorized) {
    if(isAuthorized){
        document.querySelector(".noAuthorized").classList.remove("active");
        document.querySelector(".authorized").classList.add("active");
    }else {
        document.querySelector(".authorized").classList.remove("active");
        document.querySelector(".noAuthorized").classList.add("active");
    }
}

function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    }
}