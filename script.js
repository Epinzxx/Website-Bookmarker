const siteName = document.getElementById("name");
const siteUrl = document.getElementById("url");
const sitePlace = document.getElementById("saved-sites");
const form = document.getElementById("form");

class Site {
  constructor(siteN, siteU) {
    this.siteN = siteN;
    this.siteU = siteU;
  }
}
class UI {
  static displaySites = () => {
    const sites = Store.getSite();
    sites.forEach((site) => UI.addSite(site));
  };
  static addSite = (e) => {
    let output = "";
    output += `<div class="site-div">
    <p class="text">${e.siteN}</p>
    <a href="${e.siteU}" class="link" target="_blank">Visit</a>
    <span class="delete">Delete</span>
    </div>`;
    sitePlace.innerHTML += output;
    siteUrl.value = "";
    siteName.value = "";
  };
  static deleteSite = (e) => {
    if (e.classList.contains("delete")) {
      e.parentElement.remove();
    }
  };
}
class Store {
  static getSite = () => {
    let sites;
    if (localStorage.getItem("sites") === null) {
      sites = [];
    } else {
      sites = JSON.parse(localStorage.getItem("sites"));
    }
    return sites;
  };
  static addBook = (e) => {
    let sites = Store.getSite();
    sites.push(e);
    localStorage.setItem("sites", JSON.stringify(sites));
  };
  static deleteSite = (e) => {
    const sites = Store.getSite();
    sites.forEach((site, index) => {
      if (site.siteN == e) {
        sites.splice(index, 1);
      }
    });
    localStorage.setItem("sites", JSON.stringify(sites));
    setTimeout(alert("Sited Deleted"), 3000);
  };
}
document.addEventListener("DOMContentLoaded", UI.displaySites);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = siteName.value;
  const site = siteUrl.value;
  const reg =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  const regex = new RegExp(reg);
  if (name === "" || site === "") {
    alert("Fill in both Fields");
  } else if (!site.match(regex)) {
    alert("Please input a valid URL, i.e 'https://");
    return false;
  } else {
    const siteObj = new Site(name, site);
    UI.addSite(siteObj);
    Store.addBook(siteObj);
  }
});
sitePlace.addEventListener("click", (e) => {
  UI.deleteSite(e.target);
  Store.deleteSite(
    e.target.previousElementSibling.previousElementSibling.textContent
  );
});
