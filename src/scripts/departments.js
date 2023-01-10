import { Render } from "./render.js";
import { Requests } from "./requests.js";

class Departments {
  static handleDarkMode() {
    const btnMode = document.querySelector(".dark-toggle");
    const html = document.querySelector("html");

    btnMode.addEventListener("click", () => {
      html.classList.toggle("dark-mode");
    });
  }

  static async createNewDepartment() {
    const section = document.querySelector(".create__department");
    const btnCreateNewDepartment = document.querySelector(
      ".create__department form button"
    );
    const newDepart = document.getElementById("departmentname");
    const newDepartDescription = document.getElementById(
      "departmentdescription"
    );
    const selectOption = document.getElementById("companiesOptions");

    const allCompanies = await Requests.showAllCompanies();

    allCompanies.forEach((companie) => {
      const cardOption = Render.renderCompaniesOptions(companie);

      selectOption.appendChild(cardOption);
    });

    btnCreateNewDepartment.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const data = {
        name: newDepart.value,
        description: newDepartDescription.value,
        company_uuid: selectOption.selectedOptions[0].id,
      };

      const res = await Requests.createDepartment(data);
    });
  }

  static async handleDepartmentsByCompanie() {
    const div = document.querySelector(".departments__companie");
    const btnSearchDepartByCompanie = document.querySelector(
      ".departments__by__companie form button"
    );

    const selectOption = document.getElementById("selectCompanie");

    const allCompanies = await Requests.showAllCompanies();

    allCompanies.forEach((companie) => {
      const cardOption = Render.renderCompaniesOptions(companie);

      selectOption.appendChild(cardOption);
    });

    const selectDepart = document.getElementById("selectDepartment");

    const allDepartments = await Requests.allDepartments();

    allDepartments.forEach((department) => {
      const cardOption = Render.renderDepartmentsOptions(department);

      selectDepart.appendChild(cardOption);
    });

    btnSearchDepartByCompanie.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const res = await Requests.allDepartmentsByCompanie(
        selectOption.selectedOptions[0].id
      );

      if (selectDepart.selectedOptions[0].id == 0) {
        div.innerText = "";

        res.forEach((department) => {
          const departmentCard = Render.renderDepartmentCard(department);

          div.appendChild(departmentCard);
        });
      } else {
        div.innerText = "";

        res.forEach((department) => {
          if (department.name == selectDepart.selectedOptions[0].innerText) {
            const departmentCard = Render.renderDepartmentCard(department);

            div.appendChild(departmentCard);
          }
        });
      }
    });
  }

  static async handleDepartmentDescription() {
    const div = document.querySelector(".department__render");
    const btnSearchDepart = document.querySelector(
      ".department__description form button"
    );

    const selectOption = document.getElementById("departmentoptions");

    const allDepartments = await Requests.allDepartments();

    allDepartments.forEach((department) => {
      const cardOption = Render.renderDepartmentsOptions(department);

      selectOption.appendChild(cardOption);
    });

    btnSearchDepart.addEventListener("click", (evt) => {
      evt.preventDefault();

      allDepartments.forEach((department) => {
        if (selectOption.selectedOptions[0].innerText == department.name) {
          const cardDepartment = Render.renderDepartmentCard(department);

          div.innerText = "";

          div.appendChild(cardDepartment);
        }
      });
    });
  }

  static async handleWorkersByDepartment() {
    const sectionForm = document.querySelector(".workers__by__department form");
    const btnSearch = document.querySelector(
      ".workers__by__department form button"
    );
    const ulWorkers = document.createElement("ul");

    const selectDepart = document.getElementById("departoptions");

    const allDepartments = await Requests.allDepartments();

    allDepartments.forEach((department) => {
      const cardOption = Render.renderDepartmentsOptions(department);

      selectDepart.appendChild(cardOption);
    });

    btnSearch.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const allWorkers = await Requests.allWorkers();

      ulWorkers.innerText = "";

      allWorkers.forEach((worker) => {
        if (worker.department_uuid == selectDepart.selectedOptions[0].id) {
          const workerCard = Render.renderUsers(worker);

          ulWorkers.appendChild(workerCard);
        }
      });

      sectionForm.appendChild(ulWorkers);
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

Departments.handleDarkMode();
Departments.createNewDepartment();
Departments.handleDepartmentsByCompanie();
Departments.handleDepartmentDescription();
Departments.handleWorkersByDepartment();
Departments.logout();
