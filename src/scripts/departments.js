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

  static async createNewDepartment() {
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

      await Requests.createDepartment(data);

      newDepart.value = "";
      newDepartDescription.value = "";
    });
  }

  static async handleDepartmentsByCompanie() {
    const btnSearchDepartByCompanie = document.querySelector(
      ".btnSearchDepartByCompanie"
    );
    const btnCloseDepartmentSection = document.querySelector(".close-section");
    const section = document.querySelector(".departments__results");

    const selectOption = document.getElementById("selectCompanie");

    btnCloseDepartmentSection.addEventListener("click", (evt) => {
      evt.preventDefault();

      section.classList.toggle("hidden");
    });

    const allCompanies = await Requests.showAllCompanies();

    allCompanies.forEach((companie) => {
      const cardOption = Render.renderCompaniesOptions(companie);

      selectOption.appendChild(cardOption);
    });

    const selectDepart = document.getElementById("selectDepartment");

    selectDepart.innerText = "";
    const emptySelect = document.createElement("option");
    emptySelect.innerText = "Selecione o departamento";
    emptySelect.id = "0";
    selectDepart.appendChild(emptySelect);

    const allDepartments = await Requests.allDepartments();

    allDepartments.forEach((department) => {
      const cardOption = Render.renderDepartmentsOptions(department);

      selectDepart.appendChild(cardOption);
    });

    btnSearchDepartByCompanie.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const departmentsByCompany = document.querySelector(
        ".departments__results div ul"
      );
      departmentsByCompany.innerText = "";

      const res = await Requests.allDepartmentsByCompanie(
        selectOption.selectedOptions[0].id
      );

      if (selectDepart.selectedOptions[0].id == 0) {
        departmentsByCompany.innerText = "";

        res.forEach((department) => {
          const departmentCard = Render.renderDepartmentCard(department);

          departmentsByCompany.appendChild(departmentCard);
        });
      } else {
        departmentsByCompany.innerText = "";

        res.forEach((department) => {
          if (department.name == selectDepart.selectedOptions[0].innerText) {
            const departmentCard = Render.renderDepartmentCard(department);

            departmentsByCompany.appendChild(departmentCard);
          }
        });
      }

      if (section.classList.contains("hidden")) {
        section.classList.toggle("hidden");
      }

      Departments.closeSectionResults();
    });
  }

  static async handleDepartmentDescription() {
    const div = document.querySelector(".department__render");
    const btnSearchDepart = document.querySelector(
      ".department__description form button"
    );

    const selectOption = document.getElementById("departmentoptions");

    selectOption.innerText = "";
    const emptySelect = document.createElement("option");
    emptySelect.innerText = "Selecione o departamento";
    emptySelect.id = "0";
    selectOption.appendChild(emptySelect);

    const allDepartments = await Requests.allDepartments();

    allDepartments.forEach((department) => {
      const cardOption = Render.renderDepartmentsOptions(department);

      selectOption.appendChild(cardOption);
    });

    btnSearchDepart.addEventListener("click", (evt) => {
      evt.preventDefault();

      allDepartments.forEach((department) => {
        if (selectOption.selectedOptions[0].innerText == department.name) {
          const cardDepartment =
            Render.renderDepartmentCardDescription(department);

          if (div.classList.contains("hidden")) {
            div.classList.toggle("hidden");
          }

          div.innerText = "";

          div.appendChild(cardDepartment);

          Departments.updateDepartmentDescription(
            department.name,
            department.uuid
          );
        }
      });
    });
  }

  static async updateDepartmentDescription(department, uuid) {
    const btnEditDepartment = document.querySelector(".btnEditDepartment");
    const btnCloseEditSection = document.querySelector(".close-edit-section");

    const departmentDescriptionForm =
      btnEditDepartment.parentNode.parentNode.parentNode.parentNode;
    const sectionEditDepartment = document.querySelector(".edit__department");

    const disableLabel = document.querySelector(".disable-label");

    btnEditDepartment.addEventListener("click", (evt) => {
      evt.preventDefault();

      departmentDescriptionForm.classList.toggle("hidden");
      sectionEditDepartment.classList.toggle("hidden");

      disableLabel.innerText = department;

      Departments.handleDepartmentEdited(uuid);
      Departments.handleDepartmentToDelete(uuid);
    });

    btnCloseEditSection.addEventListener("click", (evt) => {
      evt.preventDefault();
      console.log(departmentDescriptionForm);
      console.log(sectionEditDepartment);
      departmentDescriptionForm.classList.toggle("hidden");
      sectionEditDepartment.classList.toggle("hidden");
    });
  }

  static async handleDepartmentEdited(uuid) {
    const btnUpdateDepartment = document.querySelector(".update-department");

    const descriptionInput = document.getElementById("newDescription");

    btnUpdateDepartment.addEventListener("click", async (evt) => {
      evt.preventDefault();

      let data = {};

      descriptionInput.value.length > 0 &&
        ((data = {
          description: descriptionInput.value,
        }),
        await Requests.editDepartment(uuid, data));
    });
  }

  static async handleDepartmentToDelete(uuid) {
    const btnDeleteDepartment = document.querySelector(".delete-department");

    btnDeleteDepartment.addEventListener("click", async (evt) => {
      evt.preventDefault();

      await Requests.deleteDepartment(uuid);
    });
  }

  static async handleWorkersByDepartment() {
    const btnSearchWorkers = document.querySelector(".searchWorkers");
    const sectionWorkersByDepartments = document.querySelector(
      ".departments__results"
    );
    const ulWorkers = document.querySelector(".departments__results div ul");

    const selectDepart = document.getElementById("departoptions");

    const emptySelect = document.createElement("option");
    emptySelect.innerText = "Selecione o departamento";
    emptySelect.id = "0";
    selectDepart.appendChild(emptySelect);

    const allDepartments = await Requests.allDepartments();

    allDepartments.forEach((department) => {
      const cardOption = Render.renderDepartmentsOptions(department);

      selectDepart.appendChild(cardOption);
    });

    btnSearchWorkers.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const allWorkers = await Requests.allWorkers();

      let count = 0;

      ulWorkers.innerText = "";

      allWorkers.forEach((worker) => {
        if (worker.department_uuid == selectDepart.selectedOptions[0].id) {
          count += 1;

          const workerCard = Render.renderUsersByDepartment(worker);

          ulWorkers.appendChild(workerCard);
        }
      });

      if (count == 0) {
        const emptyUl = document.createElement("h2");
        emptyUl.innerText =
          "Esse departamento ainda não possui nenhum funcionário";
        ulWorkers.appendChild(emptyUl);
      }

      if (sectionWorkersByDepartments.classList.contains("hidden")) {
        sectionWorkersByDepartments.classList.toggle("hidden");
      }

      Departments.dismissWorker();
    });
  }

  static async dismissWorker() {
    const dismissWorkersBtns = document.querySelectorAll(".button-dismiss");
    const sectionWorkersByDepartments = document.querySelector(
      ".departments__results"
    );

    dismissWorkersBtns.forEach((button) => {
      button.addEventListener("click", async (evt) => {
        evt.preventDefault();

        await Requests.fireWorker(button.closest("li").id);

        sectionWorkersByDepartments.classList.toggle("hidden");
      });
    });
  }

  // static async editWorker(uuid) {
  //   const section = document.querySelector(".user__edition");
  //   const btnEdit = document.querySelector(".edit__worker button");
  //   if (section.classList.contains("hidden")) {
  //     section.classList.toggle("hidden");
  //   }

  //   const allWorkers = await Requests.allWorkers();

  //   const selectWorker = document.getElementById("employeename");
  //   const selectType = document.getElementById("worktype");
  //   const selectLevel = document.getElementById("level");

  //   function workersOptions(worker) {
  //     const cardWorker = Render.renderWorkersOptions(worker);

  //     selectWorker.appendChild(cardWorker);
  //   }
  //   allWorkers.forEach(workersOptions);

  //   btnEdit.addEventListener("click", async (evt) => {
  //     evt.preventDefault();

  //     const data = {
  //       kind_of_work: selectType.selectedOptions[0].innerText.toLowerCase(),
  //       professional_level: selectLevel.selectedOptions[0].id,
  //     };
  //     console.log(data);
  //     console.log(selectWorker.selectedOptions[0].id);
  //     const res = await Requests.editWorker(
  //       data,
  //       selectWorker.selectedOptions[0].id
  //     );

  //     console.log(res);
  //   });
  // }

  static async closeSectionResults() {
    const btnCloseSectionResults = document.querySelector(".close-section");
    const section = document.querySelector(".departments__results");

    btnCloseSectionResults.addEventListener("click", (evt) => {
      evt.preventDefault();

      section.classList.add("hidden");
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
Departments.headerNavigation();
Departments.createNewDepartment();
Departments.handleDepartmentsByCompanie();
Departments.handleDepartmentDescription();
Departments.handleWorkersByDepartment();
Departments.logout();
