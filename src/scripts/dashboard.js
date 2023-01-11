import { Render } from "./render.js";
import { Requests } from "./requests.js";

class Dashboard {
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

  static async adminOrNotAdmin() {
    const ulHeader = document.querySelector(".nav-list");
    const userDiv = document.querySelector(".user-info");
    const user = document.querySelector(".user-info span");

    const res = await Requests.userInfo();

    if (res.uuid) {
      ulHeader.classList.add("hidden");
      user.innerText = res.username;
      user.classList.add("font-title-2");
      userDiv.classList.remove("hidden");

      //   Dashboard.notAdmin(res);
      // } else {
      //   Dashboard.begin();
      // }
    }
  }

  static async notAdmin(userInfo) {
    const main = document.querySelector("main");
    const section = document.createElement("section");
    const divUserCompanie = document.createElement("div");
    const userCompanieTitle = document.createElement("h2");
    const divUserDepartment = document.createElement("div");
    const userDepartmentTitle = document.createElement("h2");
    const divUserCoWorkers = document.createElement("div");
    const userCoWorkersTitle = document.createElement("h2");
    const ulCoWorkers = document.createElement("ul");
    const divEditUser = document.createElement("div");
    const userEditTitle = document.createElement("h2");

    userCompanieTitle.innerText = "Sua empresa";
    userDepartmentTitle.innerText = "Seu departamento";
    userCoWorkersTitle.innerText = "Funcionários do seu departamento";
    userEditTitle.innerText = "Edite seus dados";

    const coWorkers = await Requests.coWorkers();
    const departments = await Requests.departmentsOfUserCompanie();
    const allCompanies = await Requests.showAllCompanies();

    allCompanies.forEach((companie) => {
      if (companie.name == departments.name) {
        const companieCard = Render.companieModalCard(companie);

        companieCard.classList.add("companie__card");
        section.appendChild(divUserCompanie);
        divUserCompanie.append(userCompanieTitle, companieCard);
      }
    });

    departments.departments.forEach((department) => {
      if (department.uuid == userInfo.department_uuid) {
        const departmentCard = Render.renderDepartmentCard(department);

        departmentCard.classList.add("department__card");
        section.appendChild(divUserDepartment);
        divUserDepartment.append(userDepartmentTitle, departmentCard);
      }
    });

    coWorkers[0].users.forEach((coworker) => {
      const coworkersCard = Render.renderUsers(coworker);

      ulCoWorkers.appendChild(coworkersCard);
    });
    ulCoWorkers.classList.add("coworkers__card");
    section.appendChild(divUserCoWorkers);
    divUserCoWorkers.append(userCoWorkersTitle, ulCoWorkers);

    const labelInputName = document.createElement("label");
    const inputUserName = document.createElement("input");
    const labelInputEmail = document.createElement("label");
    const inputUserEmail = document.createElement("input");
    const labelInputPass = document.createElement("label");
    const inputUserPass = document.createElement("input");
    const btnUpdateUser = document.createElement("button");

    labelInputName.innerText = "Nome de usuário";
    labelInputEmail.innerText = "E-mail";
    labelInputPass.innerText = "Senha";
    labelInputName.setAttribute("for", "newUserName");
    labelInputEmail.setAttribute("for", "newUserEmail");
    labelInputPass.setAttribute("for", "newUserPass");
    inputUserName.setAttribute("placeholder", "Digite um nome de usuário");
    inputUserEmail.setAttribute("placeholder", "Digite um e-mail válido");
    inputUserPass.setAttribute("placeholder", "Digite uma senha");
    inputUserPass.setAttribute("type", "password");
    inputUserName.id = "newUserName";
    inputUserEmail.id = "newUserEmail";
    inputUserPass.id = "newUserPass";
    inputUserName.classList.add("input-default");
    inputUserEmail.classList.add("input-default");
    inputUserPass.classList.add("input-default");
    btnUpdateUser.innerText = "Atualizar";
    btnUpdateUser.classList.add("button-orange");
    btnUpdateUser.classList.add("font-text-1");

    divEditUser.append(
      userEditTitle,
      labelInputName,
      inputUserName,
      labelInputEmail,
      inputUserEmail,
      labelInputPass,
      inputUserPass,
      btnUpdateUser
    );
    section.appendChild(divEditUser);

    btnUpdateUser.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const data = {
        username: inputUserName.value,
        email: inputUserEmail.value,
        password: inputUserPass.value,
      };

      const res = await Requests.updateUserInfo(data);
      console.log(res);
    });

    main.appendChild(section);
  }

  // static async begin() {
  //   const main = document.querySelector("main");
  //   const ulCompanies = document.createElement("ul");
  //   const allCompanies = await Requests.showAllCompanies();

  //   ulCompanies.classList.add("admin__companies");

  //   allCompanies.forEach((companie) => {
  //     const cardLi = Render.companieModalCard(companie);

  //     ulCompanies.appendChild(cardLi);
  //   });

  //   main.appendChild(ulCompanies);
  // }

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
Dashboard.adminOrNotAdmin();
Dashboard.headerNavigation();
Dashboard.logout();
