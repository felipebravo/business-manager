import { Render } from "./render.js";
import { Requests } from "./requests.js";

export class Sectors {
  static handleDarkMode() {
    const btnMode = document.querySelector(".dark-toggle");
    const html = document.querySelector("html");

    btnMode.addEventListener("click", () => {
      html.classList.toggle("dark-mode");
    });
  }

  static headerNavigation() {
    const mobileMenu = document.querySelector(".mobile-menu");
    const navList = document.querySelector(".nav-list");
    const navLinks = document.querySelectorAll(".nav-list li");

    mobileMenu.addEventListener("click", () => {
      navList.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    });
  }

  static async allSectors() {
    const selectOption = document.getElementById("sector");

    const sections = await Requests.allSectors();

    sections.forEach((sector) => {
      const cardOption = Render.renderSectorsOptions(
        sector.uuid,
        sector.description
      );

      selectOption.appendChild(cardOption);
    });
  }

  static async handleSector() {
    const btnSearch = document.querySelector(".main__form button");

    btnSearch.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const sectorOption = document.querySelector("select");

      const res = await Requests.companiesBySector(
        sectorOption.selectedOptions[0].innerText
      );

      const sectionUl = document.querySelector("section ul");
      sectionUl.innerText = "";

      res.forEach((companie) => {
        const cardLi = Render.companieModalCard(companie);

        sectionUl.appendChild(cardLi);
      });
    });
  }

  static logout() {
    const btnLogout = document.querySelector(".logout");

    btnLogout.addEventListener("click", (evt) => {
      evt.preventDefault();

      localStorage.removeItem("@kenzieCompanies:user_uuid");
      localStorage.removeItem("@kenzieCompanies:token");
      window.location.href = "../../homepage.html";
    });
  }
}

Sectors.handleDarkMode();
Sectors.headerNavigation();
Sectors.handleSector();
Sectors.allSectors();
Sectors.logout();
