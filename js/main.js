//darkmode toggle
let toggleThemeButton = document.getElementById(`toggle-theme-button`);

function load() {
  let theme = localStorage.getItem(`theme`);
  if (theme == `dark`) {
    darkMode();
  } else {
    lightMode();
  }
  //  calling api
  updateNews();
  updateIndia();

  //load animation on start
  let timer = setTimeout(loaded, 2000);
  function loaded() {
    let loading = document.getElementById(`loading`);
    loading.style.display = `none`;
  }
}
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
///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//nav bar for mobile toggle
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
  scrollbar();
};
function scrollFunction() {
  if (window.scrollY > 20) {
    scrollup.style.transform = `scale(1)`;
  } else {
    scrollup.style.transform = `scale(0)`;
  }
}
function scrollbar() {
  let scrollbar = document.getElementById(`scrollbar`);
  let scrollTop = window.scrollY;
  let docHeight = document.body.offsetHeight;
  let winHeight = window.innerHeight;
  let scrollPercent = scrollTop / (docHeight - winHeight);
  let scrollPercentRounded = Math.round(scrollPercent * 100);
  scrollbar.style.width = scrollPercentRounded + "vw";
  /////////////////
  //active nav
  let nav = document.getElementById(`Sidenav`);

  if (scrollPercentRounded > 91) {
    resetNav();
    let nav_link3 = nav.getElementsByTagName(`a`)[3];
    nav_link3.classList.add(`active`);
  } else if (scrollPercentRounded > 60) {
    resetNav();
    let nav_link2 = nav.getElementsByTagName(`a`)[2];
    nav_link2.classList.add(`active`);
  } else if (scrollPercentRounded > 19) {
    resetNav();
    let nav_link1 = nav.getElementsByTagName(`a`)[1];
    nav_link1.classList.add(`active`);
  } else if (scrollPercentRounded > 0) {
    resetNav();
    let nav_link0 = nav.getElementsByTagName(`a`)[0];
    nav_link0.classList.add(`active`);
  }

  function resetNav() {
    let nav = document.getElementById(`Sidenav`);
    let navLen = nav.getElementsByTagName(`a`).length;
    for (let i = 0; i < navLen; i++) {
      let nav_link = nav.getElementsByTagName(`a`)[i];
      nav_link.classList.remove(`active`);
    }
  }
}

//////////////////////

const chart_states = [];
const chart_cases_active = [];
const chart_cases_recovered = [];
const chart_cases_deaths = [];

//fetching data in website

async function updateIndia() {
  var Data_of_Contry = document.getElementById(`Data_of_Contry`);
  fetch(
    // `https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true`
    `json/cases.json`
  )
    .then((Response) => Response.json())
    .then((rsp) => {
      active_cases_india.innerHTML = rsp.activeCases;
      active_cases_india_change.innerHTML = `(` + rsp.activeCasesNew + `)`;
      recovered_cases_india.innerHTML = rsp.recovered;
      recovered_cases_india_change.innerHTML = `(` + rsp.recoveredNew + `)`;
      death_cases_india.innerHTML = rsp.deaths;
      death_cases_india_change.innerHTML = `(` + rsp.deathsNew + `)`;
      Last_Updated.innerHTML = rsp.lastUpdatedAtApify;

      for (var i = 0; i < rsp.regionData.length; i++) {
        var new_tr = document.createElement(`tr`);
        Data_of_Contry.appendChild(new_tr);
        var sno = document.createElement(`td`);
        Data_of_Contry.appendChild(sno).innerHTML = i + 1;
        var state_name = document.createElement(`td`);
        Data_of_Contry.appendChild(state_name).innerHTML =
          rsp.regionData[i].region;
        var active = document.createElement(`td`);
        Data_of_Contry.appendChild(active).innerHTML =
          rsp.regionData[i].activeCases;
        var recoverd = document.createElement(`td`);
        Data_of_Contry.appendChild(recoverd).innerHTML =
          rsp.regionData[i].recovered;
        var deceased = document.createElement(`td`);
        Data_of_Contry.appendChild(deceased).innerHTML =
          rsp.regionData[i].deceased;
        var totalInfected = document.createElement(`td`);
        Data_of_Contry.appendChild(totalInfected).innerHTML =
          rsp.regionData[i].totalInfected;

        chart_states.push(rsp.regionData[i].region);
        chart_cases_active.push(rsp.regionData[i].activeCases);
        chart_cases_recovered.push(rsp.regionData[i].recovered);
        chart_cases_deaths.push(rsp.regionData[i].deceased);
      }
    })
    .catch((err) => {
      var time_out = setTimeout(error_print, 6000);

      function error_print() {
        var network_error = document.getElementById(`network_error`);
        var error_display = document.getElementById(`error_display`);
        network_error.style.display = `flex`;
        error_display.innerHTML = `Unable to load, try again later`;
      }
    });
}

///news for covid from actual api
// async function updateNews() {
//   var requests = {
//     method: "GET",
//     redirect: "follow",
//   };

//   fetch(
//     "https://newsapi.org/v2/everything?q=Aajtak.in&from=&sortBy=publishedAt&apiKey=ec5f7561699e4613a0bf1b6485c02c10"
//   )
//     .then((response) => response.json())
//     .then((result) => {
//       for (let i = 0; i < result.articles.length; i++) {
//         let allNews = document.querySelector(`.all-news`);
//         let news = document.createElement(`div`);
//         news.classList.add(`news`);

//         let title = document.createElement(`div`);
//         title.classList.add(`title`);
//         title.innerHTML = result.articles[i].title;

//         let author = document.createElement(`div`);
//         author.classList.add(`author`);
//         author.innerHTML = `author: ` + result.articles[i].author;

//         let description = document.createElement(`div`);
//         description.classList.add(`description`);
//         description.innerHTML = result.articles[i].description;
//         let hr = document.createElement(`hr`);
//         hr.id = `news-hr`;
//         news.appendChild(title);
//         news.appendChild(author);
//         news.appendChild(description);
//         allNews.appendChild(news);
//         allNews.appendChild(hr);
//       }
//     })
//     .catch((error) => console.log("error", error));
// }
// updateNews();

//fetch from copy of api because this api is not free
async function updateNews() {
  var requests = {
    method: "GET",
    redirect: "follow",
  };

  fetch("json/news.json")
    .then((response) => response.json())
    .then((result) => {
      for (let i = 0; i < result.articles.length; i++) {
        let allNews = document.querySelector(`.all-news`);
        let news = document.createElement(`div`);
        news.classList.add(`news`);

        let title = document.createElement(`div`);
        title.classList.add(`title`);
        title.innerHTML = result.articles[i].title;

        let author = document.createElement(`div`);
        author.classList.add(`author`);
        author.innerHTML = `author: ` + result.articles[i].author;

        let description = document.createElement(`div`);
        description.classList.add(`description`);
        description.innerHTML = result.articles[i].description;
        let hr = document.createElement(`hr`);
        hr.id = `news-hr`;
        news.appendChild(title);
        news.appendChild(author);
        news.appendChild(description);
        allNews.appendChild(news);
        allNews.appendChild(hr);
      }
    })
    .catch((error) => console.log("error", error));
}

//chart show
function chart_show_toogle() {
  let chart_toggle = document.getElementById(`myChart`);
  let chart_show = document.getElementById(`chart_show`);
  chart_show.style.display = `none`;
  chart_toggle.setAttribute(`height`, `0`);
  let canvas = document.getElementById(`canvas-scroll`);
  canvas.classList.add(`canvas-scroll`);
  create_chart();
}

//chart

async function create_chart() {
  const data = {
    labels: chart_states,
    datasets: [
      {
        label: "active cases by states",
        data: chart_cases_active,
        backgroundColor: [`rgba(0, 222, 255, 0.4)`],
        borderColor: ["rgb(0, 222, 255)"],
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Recovered cases by states",
        data: chart_cases_recovered,
        backgroundColor: [`rgba(86, 255, 100, .4)`],
        borderColor: ["rgb(86, 255, 100)"],
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Deaths by states",
        data: chart_cases_deaths,
        backgroundColor: [`rgba(255, 128, 0, .4)`],
        borderColor: ["rgb(255, 128, 0)"],
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      hitRadius: 50,
      hoverRadius: 9,
      radius: 5,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

/////////////////
//auto year change
let year = document.getElementById(`year`);
const date = new Date();
year.innerHTML = date.getFullYear().toString().substr(-2);
///////////////////////////////////////////////
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(`sw.js`)
    .then((registration) => {
      console.log(`sw is registerd` + registration);
    })
    .catch((error) => {
      console.log(error);
    });
}
