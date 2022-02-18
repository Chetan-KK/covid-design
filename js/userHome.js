const welcomeMessage = document.querySelector(`.welcome`)

function closeMessage() {
    welcomeMessage.style.transform = `translateX(-200%)`;
}

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

// scroll up button show
window.onscroll = function () {
    scrollFunction();
};
function scrollFunction() {
    if (window.scrollY > 20) {
        scrollup.style.transform = `scale(1)`;
    } else {
        scrollup.style.transform = `scale(0)`;
    }
}