import { Modal } from "./modal.js";
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

    const coWorkers = await Requests.coWorkers();

    userEmail.innerText = userInfo.email;
    userLevel.innerText = userInfo.professional_level;
    userInfo.department_uuid
      ? (userDepartment.innerText = coWorkers[0].name)
      : (userDepartment.innerText = "Voc?? ainda n??o possui um departamento.");
    userInfo.kind_of_work
      ? (userWork.innerText = userInfo.kind_of_work)
      : (userWork.innerText = "Voc?? ainda n??o possui essa informa????o.");

    const ulCoWorkers = document.querySelector(".coWorkers");
    const emptyCoWorkers = document.createElement("h3");

    emptyCoWorkers.innerText =
      "Voc?? ainda n??o possui companheiros de trabalho.";

    coWorkers.length > 0
      ? coWorkers[0].users.forEach((worker) => {
          const coWorkersCard = Render.renderCoWorkers(worker);

          ulCoWorkers.appendChild(coWorkersCard);
        })
      : ulCoWorkers.appendChild(emptyCoWorkers);

    const departmentsOfUserCompanie =
      await Requests.departmentsOfUserCompanie();

    const ulCompanieDepartments = document.querySelector(
      ".companieDepartments"
    );
    const emptyDepartments = document.createElement("h3");

    emptyDepartments.innerText = "Voc?? ainda n??o faz parte de uma empresa.";

    departmentsOfUserCompanie.departments
      ? departmentsOfUserCompanie.departments.forEach((department) => {
          const departmentCard = Render.renderDepartmentCard(department);

          ulCompanieDepartments.appendChild(departmentCard);
        })
      : ulCompanieDepartments.appendChild(emptyDepartments);
  }

  static async handleEditUser() {
    const btnEditUser = document.querySelector(".btnEditUser");
    const btnSubmitUserUpdate = document.querySelector(".submitUpdate");

    btnEditUser.addEventListener("click", (evt) => {
      evt.preventDefault();

      Modal.handleModal();
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
