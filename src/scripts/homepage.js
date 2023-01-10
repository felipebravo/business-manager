import { Render } from "./render.js";
import { Requests } from "./requests.js";

class HomePage {
  static async login() {
    const token = localStorage.getItem("@kenzieCompanies:token");

    token != "undefined" && token
      ? (window.location.href = "./src/pages/dashboard.html")
      : null;

    const userInput = document.getElementById("user");
    const passInput = document.getElementById("pass");
    const btnLogin = document.querySelector(".submitLogin");

    btnLogin.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const data = {
        email: userInput.value,
        password: passInput.value,
      };

      const res = await Requests.login(data);

      res == undefined
        ? alert("Login ou senha inválido, tente novamente!")
        : null;
    });
  }

  static async seeLoginPass() {
    const btnSeePassword = document.querySelector(".btnSeePassword");
    const btnHidePassword = document.querySelector(".btnHidePassword");

    btnSeePassword.addEventListener("click", (evt) => {
      evt.preventDefault();

      const inputLoginPassword = (document.getElementById("pass").type =
        "text");

      btnSeePassword.classList.toggle("hidden");
      btnHidePassword.classList.toggle("hidden");
    });

    btnHidePassword.addEventListener("click", (evt) => {
      evt.preventDefault();

      const inputLoginPassword = (document.getElementById("pass").type =
        "password");

      btnSeePassword.classList.toggle("hidden");
      btnHidePassword.classList.toggle("hidden");
    });
  }

  static async allPartners() {
    const ulSomePartners = document.querySelector(".all__partners");

    const allCompanies = await Requests.showAllCompanies();

    allCompanies.forEach((partner, index) => {
      const cardLi = Render.somePartners(partner);

      ulSomePartners.appendChild(cardLi);
    });
  }

  static async signup() {
    const userInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const levelInput = document.getElementById("level");
    const passInput = document.getElementById("password");
    const btnSignup = document.querySelector(".submitSignUp");

    btnSignup.addEventListener("click", async (evt) => {
      evt.preventDefault();

      const data = {
        username: userInput.value,
        password: passInput.value,
        email: emailInput.value,
        professional_level: levelInput.value,
      };

      const res = await Requests.signup(data);
    });
  }

  static async seeSignupPass() {
    const btnSeeSignPassword = document.querySelector(".btnSeeSignPassword");
    const btnHideSignPassword = document.querySelector(".btnHideSignPassword");

    btnSeeSignPassword.addEventListener("click", (evt) => {
      evt.preventDefault();

      const inputSignupPassword = (document.getElementById("password").type =
        "text");

      btnSeeSignPassword.classList.toggle("hidden");
      btnHideSignPassword.classList.toggle("hidden");
    });

    btnHideSignPassword.addEventListener("click", (evt) => {
      evt.preventDefault();

      const inputSignupPassword = (document.getElementById("password").type =
        "password");

      btnSeeSignPassword.classList.toggle("hidden");
      btnHideSignPassword.classList.toggle("hidden");
    });
  }
}

HomePage.login();
HomePage.seeLoginPass();
HomePage.signup();
HomePage.seeSignupPass();
HomePage.allPartners();
