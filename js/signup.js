//darkmode toggle
let toggleThemeButton = document.getElementById(`toggle-theme-button`);

function otherPageLoad() {
    let theme = localStorage.getItem(`theme`);
    if (theme == `dark`) {
        darkMode();
    } else {
        lightMode();
    }
}

function lightMode() {
    localStorage.setItem(`theme`, `light`);
    document.body.classList.remove(`dark-mode`);
    toggleThemeButton.innerHTML = `<i class="fas fa-moon"></i>`;
}
function darkMode() {
    localStorage.setItem(`theme`, `dark`);
    document.body.classList.add(`dark-mode`);
    toggleThemeButton.innerHTML = `<i class="fas fa-sun"></i>`;
}

toggleThemeButton.addEventListener(`click`, function () {
    let theme = localStorage.getItem(`theme`);
    if (theme == `dark`) {
        lightMode();
    } else {
        darkMode();
    }
});

function open_nav() {
    let sidenav = document.getElementById("Sidenav");
    sidenav.style.transform = "translateX(0vw)";
    sidenav.style.boxShadow = `0 0 20px 3px black`;
}

function close_nav() {
    let sidenav = document.getElementById("Sidenav");
    sidenav.style.transform = "translateX(100%)";
    sidenav.style.boxShadow = `0 0 0px 0px black`;
}

const dose1date = document.querySelector(`.dosesDate .dose1`)
const dose2date = document.querySelector(`.dosesDate .dose2`)

const doses = document.getElementById(`doses`)
resetDoses()
doses.addEventListener(`change`, () => {
    if (doses.value == 0) {
        resetDoses()
    }
    else if (doses.value == 1) {
        resetDoses()
        dose1date.removeAttribute(`disabled`)
        dose1date.setAttribute(`required`, `required`)
    }
    else if (doses.value == 2) {
        dose1date.removeAttribute(`disabled`)
        dose2date.removeAttribute(`disabled`)
        dose1date.setAttribute(`required`, `required`)
        dose2date.setAttribute(`required`, `required`)
    }
})

function resetDoses() {
    dose1date.setAttribute(`disabled`, `disabled`)
    dose2date.setAttribute(`disabled`, `disabled`)
    dose1date.removeAttribute(`required`, `required`)
    dose2date.removeAttribute(`required`, `required`)
}

