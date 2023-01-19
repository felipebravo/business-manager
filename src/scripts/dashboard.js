import { Render } from "./render.js";
import { Requests } from "./requests.js";

class Dashboard {
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

  static async adminOrNotAdmin() {
    const res = await Requests.userInfo();

    const adminHeader = document.querySelector(".admin-user");

    const mobileMenu = document.querySelector(".mobile-menu");
    const navList = document.querySelector(".nav-list");

    const userName = document.querySelector(".user-info span");
    const userIcon = document.querySelector(".user-info i");
    const welcomeMessage = document.querySelector(".current-page h2");

    if (res.uuid) {
      adminHeader.removeChild(mobileMenu);
      adminHeader.removeChild(navList);

      userIcon.classList.remove("fa-user-shield");
      userIcon.classList.add("fa-user");
      userName.innerText = res.username;

      welcomeMessage.innerText = "Bem-vindo!";

      const adminProfile = document.querySelector(".admin-options");
      const notAdminProfile = document.querySelector(".not-admin-user");

      adminProfile.classList.toggle("hidden");
      notAdminProfile.classList.toggle("hidden");
    }

    Dashboard.notAdmin(res);
  }

  static async notAdmin(userInfo) {
    const userEmail = document.querySelector(".userEmail");
    const userLevel = document.querySelector(".userLevel");
    const userDepartment = document.querySelector(".userDepartment");
    const userWork = document.querySelector(".userWork");

    userEmail.innerText = userInfo.email;
    userLevel.innerText = userInfo.professional_level;
    userInfo.department_uuid
      ? (userDepartment.innerText = userInfo.department_uuid)
      : (userDepartment.innerText = "Você ainda não possui um departamento.");
    userInfo.kind_of_work
      ? (userWork.innerText = userInfo.kind_of_work)
      : (userWork.innerText = "Você ainda não possui essa informação.");

    const coWorkers = await Requests.coWorkers();

    const ulCoWorkers = document.querySelector(".coWorkers");
    const emptyCoWorkers = document.createElement("h3");

    emptyCoWorkers.innerText =
      "Você ainda não possui companheiros de trabalho.";

    coWorkers.length > 0
      ? coWorkers.forEach((worker) => {
          const coWorkersCard = Render.renderUsers(worker);

          ulCoWorkers.appendChild(coWorkersCard);
        })
      : ulCoWorkers.appendChild(emptyCoWorkers);

    const departmentsOfUserCompanie =
      await Requests.departmentsOfUserCompanie();

    const ulCompanieDepartments = document.querySelector(
      ".companieDepartments"
    );
    const emptyDepartments = document.createElement("h3");

    emptyDepartments.innerText = "Você ainda não faz parte de uma empresa.";

    departmentsOfUserCompanie.length > 0
      ? departmentsOfUserCompanie.forEach((department) => {})
      : ulCompanieDepartments.appendChild(emptyDepartments);
  }

  static async handleEditUser() {
    const btnEditUser = document.querySelector(".btnEditUser");
    const modalEditUser = document.querySelector(".bg__modal");
    const btnSubmitUserUpdate = document.querySelector(".submitUpdate");
    const btnCloseModal = document.querySelector(".button-close");

    btnEditUser.addEventListener("click", (evt) => {
      evt.preventDefault();

      if (modalEditUser.classList.contains("hidden")) {
        modalEditUser.classList.toggle("hidden");
      }
    });

    const userInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("password");

    btnSubmitUserUpdate.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const data = {};

      userInput.value.length > 0 && (data.username = userInput.value);
      emailInput.value.length > 0 && (data.email = emailInput.value);
      passInput.value.length > 0 && (data.password = passInput.value);

      await Requests.updateUserInfo(data);
    });

    btnCloseModal.addEventListener("click", (evt) => {
      evt.preventDefault();

      modalEditUser.classList.toggle("hidden");
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

Dashboard.handleDarkMode();
Dashboard.headerNavigation();
Dashboard.adminOrNotAdmin();
Dashboard.handleEditUser();
Dashboard.logout();
