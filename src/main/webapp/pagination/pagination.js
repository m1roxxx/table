let showRows = document.querySelector(".numberRows button").textContent;
let numberRows = 0;
let activePage = 1;

let searchString = "";
let sortType = "";
let sortColumn = "";

let numberPages = 0;

getPage();

function updateButtons() {

    let buttons = document.querySelectorAll(".pagination-number");

    for (let i = 1; i < buttons.length - 1; i++) {

        if (i !== 1) buttons[i].classList.add("disabled");
        buttons[i].classList.remove("active");

    }

    switch (activePage) {
        case 1:
        case 2:

            document.querySelector(".pagination-number.first").innerHTML = "1";

            if (activePage === 1) {
                document.querySelector(".pagination-number.first").classList.add("active");
            }
            if (activePage === 2) {
                document.querySelector(".pagination-number.second").classList.add("active");
            }

            if (numberPages >= 2) {
                document.querySelector(".pagination-number.second").classList.remove("disabled");
                document.querySelector(".pagination-number.second").innerHTML = "2";
            }
            if (numberPages >= 3) {
                document.querySelector(".pagination-number.center").classList.remove("disabled");
                document.querySelector(".pagination-number.center").innerHTML = "3";
            }
            if (numberPages >= 4) {
                document.querySelector(".pagination-number.pred-last").classList.remove("disabled");
                document.querySelector(".pagination-number.pred-last").innerHTML = "4";
            }
            if (numberPages >= 5) {
                document.querySelector(".pagination-number.last").classList.remove("disabled");
                document.querySelector(".pagination-number.last").innerHTML = numberPages.toString();
            }
            break;

        case numberPages - 1:
        case numberPages:

            document.querySelector(".pagination-number.first").innerHTML = "1";

            if (numberPages === 3) {
                document.querySelector(".pagination-number.second").classList.remove("disabled");
                document.querySelector(".pagination-number.center").classList.remove("disabled");

                document.querySelector(".pagination-number.second").innerHTML = (numberPages - 1).toString();
                document.querySelector(".pagination-number.center").innerHTML = numberPages.toString();
                document.querySelector(".pagination-number.center").classList.add("active");
            }

            if (numberPages === 4) {
                document.querySelector(".pagination-number.second").classList.remove("disabled");
                document.querySelector(".pagination-number.center").classList.remove("disabled");
                document.querySelector(".pagination-number.pred-last").classList.remove("disabled");

                document.querySelector(".pagination-number.second").innerHTML = (numberPages - 2).toString();
                document.querySelector(".pagination-number.center").innerHTML = (numberPages - 1).toString();
                document.querySelector(".pagination-number.pred-last").innerHTML = numberPages.toString();

                if (activePage === numberPages) {
                    document.querySelector(".pagination-number.pred-last").classList.add("active");
                }

                if (activePage === numberPages - 1) {
                    document.querySelector(".pagination-number.center").classList.add("active");
                }
            }

            if (numberPages >= 5) {

                let buttons = document.querySelectorAll(".pagination-number");

                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].classList.remove("disabled");
                }

                document.querySelector(".pagination-number.second").innerHTML = (numberPages - 3).toString();
                document.querySelector(".pagination-number.center").innerHTML = (numberPages - 2).toString();
                document.querySelector(".pagination-number.pred-last").innerHTML = (numberPages - 1).toString();
                document.querySelector(".pagination-number.last").innerHTML = numberPages.toString();

                if (activePage === numberPages) {
                    document.querySelector(".pagination-number.last").classList.add("active");
                }

                if (activePage === numberPages - 1) {
                    document.querySelector(".pagination-number.pred-last").classList.add("active");
                }
            }
            break;

        default:

            let buttons = document.querySelectorAll(".pagination-number");

            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove("disabled");
            }

            console.log(activePage)

            document.querySelector(".pagination-number.first").innerHTML = "1";
            document.querySelector(".pagination-number.second").innerHTML = (activePage - 1).toString();
            document.querySelector(".pagination-number.center").innerHTML = activePage.toString();
            document.querySelector(".pagination-number.center").classList.add("active");
            document.querySelector(".pagination-number.pred-last").innerHTML = (activePage + 1).toString();
            document.querySelector(".pagination-number.last").innerHTML = numberPages.toString();
            break;
    }
}

async function nextPage() {
    if (activePage + 1 <= numberPages) {
        activePage += 1;
        await getPage();
    }
}

async function predPage() {
    if (activePage - 1 > 0) {
        activePage -= 1;
        await getPage();
    }
}

async function openPage(event) {
    activePage = parseInt(event.textContent);
    await getPage();
}

function dropDown() {
    document.querySelector(".selectMenu").classList.toggle("active");
}

async function selectNumberRows(event) {
    document.querySelector(".numberRows button").textContent = event.textContent;
    await getPage();
}

document.addEventListener("click", (event) => {
    if (event.target.id !== "select-button") {
        document.querySelector(".selectMenu").classList.remove("active");
    }
})

document.querySelector(".search input").addEventListener("input", debounce(async (event) => {
    searchString = event.target.value;

    await getPage();

}, 1000));

document.querySelector(".search input").addEventListener("blur", (event) => {

    event.target.classList.remove("blur");

    if (event.target.value !== "") {
        event.target.classList.add("blur");
    }
});

async function sortPage(event) {
    let arrows = document.querySelectorAll(".th svg");

    sortColumn = event.children[0].textContent;
    let arrow = event.children[1];

    for (let i = 0; i < arrows.length; i++) {
        if (arrows[i] !== arrow) {
            arrows[i].classList.remove("down");
            arrows[i].classList.remove("up");
        }
    }

    if (arrow.classList.contains("down")) {

        arrow.classList.remove("down");
        arrow.classList.add("up");

        sortType = "DESC";

    } else if (arrow.classList.contains("up")) {

        arrow.classList.remove("up");
        arrow.classList.add("down");

        sortType = "ASC";

    } else {
        arrow.classList.add("down");
    }

    await getPage();
}

async function getPage() {
    let countRows = document.querySelector(".numberRows button").textContent;

    let stringRequest = "/api/users?searchString=" + searchString + "&showRows=" + countRows + "&pageNumber=" + activePage + "&sortColumn=" + sortColumn + "&sortType=" + sortType;

    let response = await fetch(stringRequest, {
        method: "GET"
    }).then(resp => resp.json());

    showRows = countRows;
    numberRows = parseInt(response.info);
    numberPages = numberRows / showRows;

    if ((numberRows / showRows) - Math.floor(numberPages) !== 0) {
        numberPages = Math.floor(numberRows / showRows) + 1;
    } else {
        numberPages = numberRows / showRows;
    }

    tableFill(response.object);
    updateButtons();

    if (activePage > numberPages) {
        activePage = numberPages;

        console.log(activePage)

        await getPage();
    }
}

function tableFill(users) {
    document.querySelector('.table tbody').innerHTML = users.map((user) => `
    <tr>
      <td>${user.name}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
    </tr>`).join('')

}