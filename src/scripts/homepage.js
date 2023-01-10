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
    const btnLogin = document.querySelector(".login__form button");

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
    const btnSignup = document.querySelector(".signup__form button");

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
}

HomePage.login();
HomePage.signup();
HomePage.allPartners();
