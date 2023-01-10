import { Render } from "./render.js";
import { Modal } from "./modal.js";
import { Requests } from "./requests.js";

class Companies {
  static handleDarkMode() {
    const btnMode = document.querySelector(".dark-toggle");
    const html = document.querySelector("html");

    btnMode.addEventListener("click", () => {
      html.classList.toggle("dark-mode");
    });
  }

  static async createNewCompanie() {
    const btnCreateNewCompanie = document.querySelector(".create-companie");

    btnCreateNewCompanie.addEventListener("click", async (evt) => {
      evt.preventDefault();

      Modal.showCompaniesModal();

      const btnCreate = document.querySelector("form button");
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

        console.log(newCompanieName.value);
        console.log(newCompanieOpen.value);
        console.log(newCompanieDescription.value);
        console.log(newCompanieSector.selectedOptions[0].id);

        const data = {
          name: newCompanieName.value,
          opening_hours: newCompanieOpen.value,
          description: newCompanieDescription.value,
          sector_uuid: newCompanieSector.selectedOptions[0].id,
        };

        const res = await Requests.createNewCompanie(data);
      });
    });
  }

  static async handleCreatedCompanies() {
    const btnCreatedCompanies = document.querySelector(".created-companies");

    btnCreatedCompanies.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const createdCompanies = document.querySelector(".render__companies div");
      createdCompanies.innerText = "";
      const ulCompanies = document.createElement("ul");
      const allCompanies = await Requests.showAllCompanies();

      allCompanies.forEach((companie) => {
        const cardLi = Render.companieModalCard(companie);

        ulCompanies.appendChild(cardLi);
      });

      createdCompanies.appendChild(ulCompanies);
    });

    const btnSearchCompanie = document.querySelector(".search-companie");
    const companieNameInput = document.getElementById("companie");

    btnSearchCompanie.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const createdCompanies = document.querySelector(".render__companies div");
      createdCompanies.innerText = "";
      const ulCompanies = document.createElement("ul");
      const allCompanies = await Requests.showAllCompanies();

      allCompanies.forEach((companie) => {
        if (
          companie.name.toLowerCase() ==
            companieNameInput.value.toLowerCase() ||
          companie.name
            .toLowerCase()
            .includes(companieNameInput.value.toLowerCase())
        ) {
          const cardLi = Render.companieModalCard(companie);

          ulCompanies.appendChild(cardLi);
        }
      });

      createdCompanies.appendChild(ulCompanies);
    });

    const btnSearchSector = document.querySelector(".search-by-sector");
    const sectorNameInput = document.getElementById("sectorSearch");

    btnSearchSector.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const createdCompanies = document.querySelector(".render__companies div");
      createdCompanies.innerText = "";
      const ulCompanies = document.createElement("ul");
      const allCompanies = await Requests.showAllCompanies();

      allCompanies.forEach((companie) => {
        if (
          companie.sectors.description.toLowerCase() ==
            sectorNameInput.value.toLowerCase() ||
          companie.sectors.description
            .toLowerCase()
            .includes(sectorNameInput.value.toLowerCase())
        ) {
          const cardLi = Render.companieModalCard(companie);

          ulCompanies.appendChild(cardLi);
        }
      });

      createdCompanies.appendChild(ulCompanies);
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
Companies.createNewCompanie();
Companies.handleCreatedCompanies();
Companies.logout();
