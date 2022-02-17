const signupButton = document.getElementById(`signupButton`)
const signupPage = document.getElementById(`signupPage`)
const closeButton = document.getElementById(`closeButton`)

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

signupButton.addEventListener(`click`, openSignupPage)
closeButton.addEventListener(`click`, closeSignupPage)


function openSignupPage() {
    signupPage.style.transform = `scale(1)`
}

function closeSignupPage() {
    signupPage.style.transform = `scale(0)`
}
