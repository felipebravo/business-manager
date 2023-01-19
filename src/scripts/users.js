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

  static async handleAllUsers() {
    const ulAllUsers = document.querySelector(".users__ul");

    ulAllUsers.innerText = "";

    const allUsers = await Requests.allWorkers();

    allUsers.forEach((worker) => {
      const userCard = Render.renderUsers(worker);

      ulAllUsers.appendChild(userCard);
    });

    Users.hireWorker();
    Users.fireWorker();
    Users.deleteWorker();
  }

  static async handleUsersOutOfWork() {
    const ulAllUsers = document.querySelector(".users__ul");

    ulAllUsers.innerText = "";

    const allUsersOutOfWork = await Requests.usersOutOfWork();

    allUsersOutOfWork.forEach((user) => {
      const userCard = Render.renderUsers(user);

      ulAllUsers.appendChild(userCard);
    });

    Users.hireWorker();
    Users.fireWorker();
    Users.deleteWorker();
  }

  static async handleEmployeedsUsers() {
    const ulAllUsers = document.querySelector(".users__ul");

    ulAllUsers.innerText = "";

    const allUsers = await Requests.allWorkers();

    allUsers.forEach((worker) => {
      if (worker.department_uuid != null) {
        const userCard = Render.renderUsers(worker);

        ulAllUsers.appendChild(userCard);
      }
    });

    Users.hireWorker();
    Users.fireWorker();
    Users.deleteWorker();
  }

  static async filterWorkers() {
    const btnAvailableUsers = document.querySelector(".available__users");
    const btnEmployeedsUsers = document.querySelector(".employeeds__users");
    const btnAllUsers = document.querySelector(".all__users");

    btnAvailableUsers.addEventListener("click", (evt) => {
      evt.preventDefault();

      Users.handleUsersOutOfWork();
    });

    btnEmployeedsUsers.addEventListener("click", (evt) => {
      evt.preventDefault();

      Users.handleEmployeedsUsers();
    });

    btnAllUsers.addEventListener("click", (evt) => {
      evt.preventDefault();

      Users.handleAllUsers();
    });
  }

  static async hireWorker() {
    const hireWorkersBtns = document.querySelectorAll(".button-hire");
    const formChooseDepartment = document.querySelector(".form__hireWorker");
    const btnSubmitHire = document.querySelector(".submit-hire");
    const btnCloseHireForm = document.querySelector(".close-hire-form");

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

    hireWorkersBtns.forEach((button) => {
      button.addEventListener("click", (evt) => {
        evt.preventDefault();

        button.closest(".divUserStatus").classList.toggle("hidden");
        button.closest("li").appendChild(formChooseDepartment);
        formChooseDepartment.classList.toggle("hidden");

        btnCloseHireForm.addEventListener("click", (evt) => {
          evt.preventDefault();

          button.closest("li").removeChild(formChooseDepartment);
          formChooseDepartment.classList.toggle("hidden");
          button.closest(".divUserStatus").classList.toggle("hidden");
        });

        btnSubmitHire.addEventListener("click", async (evt) => {
          evt.preventDefault();

          if (selectDepart.selectedOptions[0].id != 0) {
            const data = {
              user_uuid: button.closest("li").id,
              department_uuid: selectDepart.selectedOptions[0].id,
            };

            await Requests.hireWorker(data);

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        });
      });
    });
  }

  static async fireWorker() {
    const fireWorkersBtns = document.querySelectorAll(".button-fire");

    fireWorkersBtns.forEach((button) => {
      button.addEventListener("click", async (evt) => {
        evt.preventDefault();

        await Requests.fireWorker(button.closest("li").id);

        setTimeout(() => {
          Users.handleAllUsers();
        }, 1500);
      });
    });
  }

  static async deleteWorker() {
    const deleteUserBtns = document.querySelectorAll(".button-delete");

    deleteUserBtns.forEach((button) => {
      button.addEventListener("click", async (evt) => {
        evt.preventDefault();

        await Requests.deleteWorker(button.closest("li").id);

        setTimeout(() => {
          Users.handleAllUsers();
        }, 1500);
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

Users.handleDarkMode();
Users.headerNavigation();
Users.handleAllUsers();
Users.filterWorkers();
Users.logout();
