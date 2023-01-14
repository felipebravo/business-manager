import { instance } from "./axios.js";
import { Toast } from "./toast.js";

export class Requests {
  static baseUrl = "http://localhost:6278/";
  static token = localStorage.getItem("@kenzieCompanies:token") || "";
  static headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.token}`,
  };

  static async login(data) {
    const userLogin = await instance
      .post("/auth/login", data)
      .then((res) => {
        localStorage.setItem("@kenzieCompanies:token", res.data.token);
        localStorage.setItem("@kenzieCompanies:user__uuid", res.data.uuid);
        res.data.token != "undefined" &&
          res.data.token &&
          (window.location.href = "./src/pages/dashboard.html");
      })
      .catch((err) => {
        Toast.create("Email ou senha inválido(a)!", "red");
      });

    return userLogin;
  }

  static async signup(data) {
    await instance
      .post("/auth/register/user", data)
      .then((res) => {
        Toast.create("Usuário cadastrado!", "green");

        res.data.uuid &&
          setTimeout(() => {
            window.location.href = "./homepage.html";
          }, 2000);
      })
      .catch((err) => {
        Toast.create(
          "Usuário não cadastrado, preencha todos os campos!",
          "red"
        );
      });
  }

  static async showAllCompanies() {
    let allCompanies = "";

    await instance
      .get("/companies")
      .then((res) => (allCompanies = res.data))
      .catch((err) => console.error(err));

    return allCompanies;
  }

  static async userInfo() {
    let userInfo = "";

    await instance
      .get("/users/profile")
      .then((res) => (userInfo = res.data))
      .catch((err) => console.error(err));

    return userInfo;
  }

  static async coWorkers() {
    let coWorkers = "";

    await instance
      .get("/users/departments/coworkers")
      .then((res) => {
        coWorkers = res.data;
      })
      .catch((err) => console.error(err));

    return coWorkers;
  }

  static async departmentsOfUserCompanie() {
    let departmentsOfUserCompanie = "";

    await instance
      .get("/users/departments")
      .then((res) => {
        departmentsOfUserCompanie = res.data;
      })
      .catch((err) => console.error(err));

    return departmentsOfUserCompanie;
  }

  static async updateUserInfo(data) {
    await instance
      .patch("/users", data)
      .then((res) => {
        res.data.uuid &&
          Toast.create("Usuário atualizado com sucesso!", "green");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        Toast.create("Algo deu errado, verifique as informações!", "red");
      });
  }

  static async allSectors() {
    let allSectors = "";

    await instance
      .get("/sectors")
      .then((res) => {
        allSectors = res.data;
      })
      .catch((err) => console.error(err));

    return allSectors;
  }

  static async companiesBySector(sector) {
    let companiesBySector = "";

    await instance
      .get(`/companies/${sector}`)
      .then((res) => (companiesBySector = res.data))
      .catch((err) => console.error(err));

    return companiesBySector;
  }

  static async createNewCompanie(data) {
    const newCompanie = await instance
      .post("/companies", data)
      .then((res) => {
        res.data.uuid && Toast.create("Empresa criada com sucesso!", "green");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        Toast.create("Todos os campos são obrigatórios!", "red");
      });

    return newCompanie;
  }

  static async createDepartment(body) {
    const newDepartment = await fetch(`${this.baseUrl}departments`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        res.uuid ? alert("Departamento criado com sucesso!") : alert(res);
      })
      .catch((err) => console.log(err));

    return newDepartment;
  }

  static async allDepartments() {
    const departments = await fetch(`${this.baseUrl}departments`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return departments;
  }

  static async allDepartmentsByCompanie(uuid) {
    const departsByCompanie = await fetch(
      `${this.baseUrl}departments/${uuid}`,
      {
        method: "GET",
        headers: this.headers,
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return departsByCompanie;
  }

  static async allWorkers() {
    const allWorkers = await fetch(`${this.baseUrl}users`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return allWorkers;
  }

  static async hireWorker(body) {
    const hireWorker = await fetch(`${this.baseUrl}departments/hire/`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        res.uuid ? alert("Funcionário contratado com sucesso!") : alert(res);
      })
      .catch((err) => console.log(err));

    return hireWorker;
  }

  static async fireWorker(uuid) {
    const fireWorker = await fetch(
      `${this.baseUrl}departments/dismiss/${uuid}`,
      {
        method: "PATCH",
        headers: this.headers,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        res.department_uuid == null
          ? alert("Funcionário demitido com sucesso!")
          : alert(res);
      })
      .catch((err) => console.log(err));

    return fireWorker;
  }

  static async editWorker(body, uuid) {
    const workerEdited = await fetch(
      `${this.baseUrl}admin/update_user/${uuid}`,
      {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        res.uuid ? alert("Alteração realizada com sucesso") : alert(res[0]);
      })
      .catch((err) => console.log(err));

    return workerEdited;
  }

  static async deleteWorker(uuid) {
    await fetch(`${this.baseUrl}admin/delete_user/${uuid}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => res.json())
      .then(alert("Deletado"))
      .catch((err) => console.log(err));
  }

  static async usersOutOfWork() {
    const outOfWork = await fetch(`${this.baseUrl}admin/out_of_work`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return outOfWork;
  }
}
