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

      const btnCreate = document.querySelector(".submitNewCo");
      const newCompanieName = document.getElementById("companiename");
      const newCompanieOpen = document.getElementById("opening_hours");
      const newCompanieDescription = document.getElementById("description");
      const newCompanieSector = document.getElementById("sector");

      newCompanieSector.innerText = "";

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

        const res = await Requests.createNewCompanie(data);

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

    btnCreatedCompanies.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const createdCompanies = document.querySelector(
        ".render__companies div ul"
      );
      createdCompanies.innerText = "";

      const allCompanies = await Requests.showAllCompanies();

      sectionCreatedCompanies.classList.toggle("hidden");

      allCompanies.forEach((companie) => {
        const cardLi = Render.companieModalCard(companie);

        createdCompanies.appendChild(cardLi);
      });
    });

    btnCloseCompanies.addEventListener("click", (evt) => {
      evt.preventDefault();

      sectionCreatedCompanies.classList.toggle("hidden");
    });

    const btnSearchCompanie = document.querySelector(".search-companie");
    const companieNameInput = document.getElementById("companie");

    btnSearchCompanie.addEventListener("click", async (evt) => {
      evt.preventDefault();

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
          const cardLi = Render.companieModalCard(companie);

          createdCompanies.appendChild(cardLi);
        }
      });

      companieNameInput.value = "";

      sectionCreatedCompanies.classList.toggle("hidden");
    });

    const btnSearchSector = document.querySelector(".search-by-sector");
    const sectorNameInput = document.getElementById("sectorSearch");

    btnSearchSector.addEventListener("click", async (evt) => {
      evt.preventDefault();

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
          const cardLi = Render.companieModalCard(companie);

          createdCompanies.appendChild(cardLi);
        }
      });

      sectorNameInput.value = "";

      sectionCreatedCompanies.classList.toggle("hidden");
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
