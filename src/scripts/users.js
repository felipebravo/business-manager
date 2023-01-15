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

  static async hireWorker() {
    const hireWorkersBtns = document.querySelectorAll(".button-hire");

    hireWorkersBtns.forEach((button) => {
      button.addEventListener("click", async (evt) => {
        evt.preventDefault();

        await Requests.hireWorker(button.closest("li").id);

        setTimeout(() => {
          Users.handleAllUsers();
        }, 1500);
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

  // static async handleUsersOutOfWork() {
  //   const section = document.querySelector(".available__employees");

  //   const ulUsersOutOfWork = document.createElement("ul");

  //   const allUsersOutOfWork = await Requests.usersOutOfWork();

  //   allUsersOutOfWork.forEach((user) => {
  //     const userCard = Render.renderUsers(user);

  //     ulUsersOutOfWork.appendChild(userCard);
  //   });

  //   section.appendChild(ulUsersOutOfWork);
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

Users.handleDarkMode();
Users.headerNavigation();
Users.handleAllUsers();
Users.logout();
