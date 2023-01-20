import { Render } from "./render.js";
import { Modal } from "./modal.js";
import { Requests } from "./requests.js";

class Companies {
  static handleDarkMode() {
    const btnMode = document.querySelector(".dark-toggle");
    const html = document.querySelector("html");

    if (localStorage.getItem("@kenzieCompanies:dark__mode") == "true") {
      if (!html.classList.contains("dark-mode")) {
        html.classList.toggle("dark-mode");
      }
    }

    btnMode.addEventListener("click", () => {
      if (localStorage.getItem("@kenzieCompanies:dark__mode") == "false") {
        html.classList.add("dark-mode");
        localStorage.setItem("@kenzieCompanies:dark__mode", true);
      } else {
        html.classList.remove("dark-mode");
        localStorage.setItem("@kenzieCompanies:dark__mode", false);
      }
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

  static async createNewCompanie() {
    const btnCreateNewCompanie = document.querySelector(".create-companie");
    const sectionCreatedCompanies =
      document.querySelector(".render__companies");

    btnCreateNewCompanie.addEventListener("click", async (evt) => {
      evt.preventDefault();

      if (!sectionCreatedCompanies.classList.contains("hidden")) {
        sectionCreatedCompanies.classList.toggle("hidden");
      }

      Modal.handleModal();

      const btnCreate = document.querySelector(".submitNewCo");
      const newCompanieName = document.getElementById("companiename");
      const newCompanieOpen = document.getElementById("opening_hours");
      const newCompanieDescription = document.getElementById("description");
      const newCompanieSector = document.getElementById("sector");

      const sectors = await Requests.allSectors();

      sectors.forEach((sector) => {
        const cardOption = Render.renderSectorsOptions(
          sector.uuid,
          sector.description
        );

        newCompanieSector.appendChild(cardOption);
      });

      btnCreate.addEventListener("click", async (evt) => {
        evt.preventDefault();

        const data = {
          name: newCompanieName.value,
          opening_hours: newCompanieOpen.value,
          description: newCompanieDescription.value,
          sector_uuid: newCompanieSector.selectedOptions[0].id,
        };

        await Requests.createNewCompanie(data);

        newCompanieName.value = "";
        newCompanieOpen.value = "";
        newCompanieDescription.value = "";
      });
    });
  }

  static async handleCreatedCompanies() {
    const btnCreatedCompanies = document.querySelector(".created-companies");
    const btnCloseCompanies = document.querySelector(".close-section");
    const sectionCreatedCompanies =
      document.querySelector(".render__companies");
    const companiesModal = document.querySelector(".bg__modal");

    btnCloseCompanies.addEventListener("click", (evt) => {
      evt.preventDefault();

      sectionCreatedCompanies.classList.toggle("hidden");
    });

    btnCreatedCompanies.addEventListener("click", async (evt) => {
      evt.preventDefault();

      if (!companiesModal.classList.contains("hidden")) {
        companiesModal.classList.toggle("hidden");
      }

      const createdCompanies = document.querySelector(
        ".render__companies div ul"
      );
      createdCompanies.innerText = "";

      const allCompanies = await Requests.showAllCompanies();

      allCompanies.forEach((companie) => {
        const cardLi = Render.renderCompanieCard(companie);

        createdCompanies.appendChild(cardLi);
      });

      if (sectionCreatedCompanies.classList.contains("hidden")) {
        sectionCreatedCompanies.classList.toggle("hidden");
      }
    });

    const btnSearchCompanie = document.querySelector(".search-companie");
    const companieNameInput = document.getElementById("companie");

    btnSearchCompanie.addEventListener("click", async (evt) => {
      evt.preventDefault();

      if (!companiesModal.classList.contains("hidden")) {
        companiesModal.classList.toggle("hidden");
      }

      if (companieNameInput.value.length) {
        const createdCompanies = document.querySelector(
          ".render__companies div ul"
        );
        createdCompanies.innerText = "";

        const allCompanies = await Requests.showAllCompanies();

        allCompanies.forEach((companie) => {
          if (
            companie.name.toLowerCase() ==
              companieNameInput.value.toLowerCase() ||
            companie.name
              .toLowerCase()
              .includes(companieNameInput.value.toLowerCase())
          ) {
            const cardLi = Render.renderCompanieCard(companie);

            createdCompanies.appendChild(cardLi);
          }
        });

        companieNameInput.value = "";

        if (sectionCreatedCompanies.classList.contains("hidden")) {
          sectionCreatedCompanies.classList.toggle("hidden");
        }
      }
    });

    const btnSearchSector = document.querySelector(".search-by-sector");
    const sectorNameInput = document.getElementById("sectorSearch");

    btnSearchSector.addEventListener("click", async (evt) => {
      evt.preventDefault();

      if (!companiesModal.classList.contains("hidden")) {
        companiesModal.classList.toggle("hidden");
      }

      if (sectorNameInput.value.length) {
        const createdCompanies = document.querySelector(
          ".render__companies div ul"
        );
        createdCompanies.innerText = "";

        const allCompanies = await Requests.showAllCompanies();

        allCompanies.forEach((companie) => {
          if (
            companie.sectors.description.toLowerCase() ==
              sectorNameInput.value.toLowerCase() ||
            companie.sectors.description
              .toLowerCase()
              .includes(sectorNameInput.value.toLowerCase())
          ) {
            const cardLi = Render.renderCompanieCard(companie);

            createdCompanies.appendChild(cardLi);
          }
        });

        sectorNameInput.value = "";

        if (sectionCreatedCompanies.classList.contains("hidden")) {
          sectionCreatedCompanies.classList.toggle("hidden");
        }
      }
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

Companies.handleDarkMode();
Companies.headerNavigation();
Companies.createNewCompanie();
Companies.handleCreatedCompanies();
Companies.logout();
