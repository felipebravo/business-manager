export class Requests {
  static baseUrl = "http://localhost:6278/";
  static token = localStorage.getItem("@kenzieCompanies:token") || "";
  static headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.token}`,
  };

  static async userInfo() {
    const userInfo = await fetch(`${this.baseUrl}users/profile`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return userInfo;
  }

  static async coWorkers() {
    const coWorkers = await fetch(
      `${this.baseUrl}users/departments/coworkers`,
      {
        method: "GET",
        headers: this.headers,
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return coWorkers;
  }

  static async departmentsOfUserCompanie() {
    const departments = await fetch(`${this.baseUrl}users/departments`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return departments;
  }

  static async updateUserInfo(body) {
    const update = await fetch(`${this.baseUrl}users`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        res.uuid ? alert("Atualização feita com sucesso!") : alert(res);
      })
      .catch((err) => console.log(err));

    return update;
  }

  static async showAllCompanies() {
    const allCompanies = await fetch(`${this.baseUrl}companies`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return allCompanies;
  }

  static async login(body) {
    const userLogin = await fetch(`${this.baseUrl}auth/login`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("@kenzieCompanies:token", res.token);
        localStorage.setItem("@kenzieCompanies:user__uuid", res.uuid);

        res.token != "undefined" && res.token
          ? (window.location.href = "./src/pages/dashboard.html")
          : null;

        return res;
      })
      .catch((err) => console.log(err));

    return userLogin;
  }

  static async signup(body) {
    const newUser = await fetch(`${this.baseUrl}auth/register/user`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        res.uuid ? (window.location.href = "./homepage.html") : alert(res);

        return res;
      })
      .catch((err) => console.log(err));

    return newUser;
  }

  static async companiesBySector(sector) {
    const companiesBySector = await fetch(
      `${this.baseUrl}companies/${sector}`,
      {
        method: "GET",
        headers: this.headers,
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return companiesBySector;
  }

  static async allSectors() {
    const allSectors = await fetch(`${this.baseUrl}sectors`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return allSectors;
  }

  static async createNewCompanie(body) {
    const newCompanie = await fetch(`${this.baseUrl}companies`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        res.uuid ? alert("Empresa cadastrada com sucesso!") : alert(res);
      })
      .catch((err) => console.log(err));

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
