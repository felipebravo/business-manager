import { Render } from "./render.js";
import { Requests } from "./requests.js";

class Users {
  static handleDarkMode() {
    const btnMode = document.querySelector(".dark-toggle");
    const html = document.querySelector("html");

    btnMode.addEventListener("click", () => {
      html.classList.toggle("dark-mode");
    });
  }

  static async hireFireWorker() {
    const btnHire = document.querySelector(".hire");
    const btnFire = document.querySelector(".fire");

    const selectWorker = document.getElementById("workername");
    const selectDepart = document.getElementById("departhiring");

    const allWorkers = await Requests.allWorkers();

    function workersOptions(worker) {
      const cardWorker = Render.renderWorkersOptions(worker);

      selectWorker.appendChild(cardWorker);
    }
    allWorkers.forEach(workersOptions);

    const allDepartments = await Requests.allDepartments();

    function departsOptions(department) {
      const cardOption = Render.renderDepartmentsOptions(department);

      selectDepart.appendChild(cardOption);
    }
    allDepartments.forEach(departsOptions);

    btnHire.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const data = {
        user_uuid: selectWorker.selectedOptions[0].id,
        department_uuid: selectDepart.selectedOptions[0].id,
      };

      const res = await Requests.hireWorker(data);
    });

    btnFire.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const res = await Requests.fireWorker(selectWorker.selectedOptions[0].id);
    });
  }

  static async editWorker() {
    const btnEdit = document.querySelector(".edit__worker button");

    const allWorkers = await Requests.allWorkers();

    const selectWorker = document.getElementById("employeename");
    const selectType = document.getElementById("worktype");
    const selectLevel = document.getElementById("level");

    function workersOptions(worker) {
      const cardWorker = Render.renderWorkersOptions(worker);

      selectWorker.appendChild(cardWorker);
    }
    allWorkers.forEach(workersOptions);

    btnEdit.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const data = {
        kind_of_work: selectType.selectedOptions[0].innerText.toLowerCase(),
        professional_level: selectLevel.selectedOptions[0].id,
      };
      console.log(data);
      console.log(selectWorker.selectedOptions[0].id);
      const res = await Requests.editWorker(
        data,
        selectWorker.selectedOptions[0].id
      );

      console.log(res);
    });
  }

  static async handleUsersOutOfWork() {
    const section = document.querySelector(".available__employees");

    const ulUsersOutOfWork = document.createElement("ul");

    const allUsersOutOfWork = await Requests.usersOutOfWork();

    allUsersOutOfWork.forEach((user) => {
      const userCard = Render.renderUsers(user);

      ulUsersOutOfWork.appendChild(userCard);
    });

    section.appendChild(ulUsersOutOfWork);
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

Users.handleDarkMode();
Users.hireFireWorker();
Users.editWorker();
Users.handleUsersOutOfWork();
Users.logout();
