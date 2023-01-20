import { instance } from "./axios.js";
import { Toast } from "./toast.js";

export class Requests {
  static async login(data) {
    const userLogin = await instance
      .post("/auth/login", data)
      .then((res) => {
        localStorage.setItem("@kenzieCompanies:token", res.data.token);
        localStorage.setItem("@kenzieCompanies:user__uuid", res.data.uuid);
        localStorage.setItem("@kenzieCompanies:dark__mode", false);
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
        Toast.create("Todos os campos são obrigatórios!", "red");
      });

    return newCompanie;
  }

  static async createDepartment(data) {
    const newDepartment = await instance
      .post("/departments", data)
      .then((res) => {
        res.data.uuid &&
          Toast.create("Departamento criado com sucesso!", "green");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        Toast.create("Todos os campos são obrigatórios!", "red");
      });

    return newDepartment;
  }

  static async allDepartments() {
    let allDepartments = "";

    await instance
      .get("/departments")
      .then((res) => {
        allDepartments = res.data;
      })
      .catch((err) => console.error(err));

    return allDepartments;
  }

  static async allDepartmentsByCompanie(uuid) {
    let departsByCompanie = "";

    await instance
      .get(`/departments/${uuid}`)
      .then((res) => {
        departsByCompanie = res.data;
      })
      .catch((err) => console.error(err));

    return departsByCompanie;
  }

  static async editDepartment(uuid, data) {
    await instance
      .patch(`/departments/${uuid}`, data)
      .then((res) => {
        res.data.uuid &&
          Toast.create("Departamento atualizado com sucesso!", "green");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        Toast.create("Algo deu errado, verifique as informações!", "red");
      });
  }

  static async deleteDepartment(uuid) {
    await instance
      .delete(`/departments/${uuid}`)
      .then((res) => {
        Toast.create("Departamento deletado com sucesso!", "green");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => Toast.create("Algo deu errado, tente novamente!", "red"));
  }

  static async allWorkers() {
    let allWorkers = "";

    await instance
      .get("/users")
      .then((res) => {
        allWorkers = res.data;
      })
      .catch((err) => console.error(err));

    return allWorkers;
  }

  static async editWorker(data, uuid) {
    await instance
      .patch(`/admin/update_user/${uuid}`, data)
      .then((res) => {
        res.data.uuid &&
          Toast.create("Usuário atualizado com sucesso!", "green");

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        Toast.create("Algo deu errado, tente novamente!", "red");
      });
  }

  static async usersOutOfWork() {
    let outOfWork = "";

    await instance
      .get("/admin/out_of_work")
      .then((res) => {
        outOfWork = res.data;
      })
      .catch((err) => console.error(err));

    return outOfWork;
  }

  static async hireWorker(data) {
    await instance
      .patch("/departments/hire/", data)
      .then((res) => {
        res.data.uuid &&
          Toast.create("Usuário contratado com sucesso!", "green");
      })
      .catch((err) => {
        Toast.create("Algo deu errado, tente novamente!", "red");
      });
  }

  static async fireWorker(uuid) {
    await instance
      .patch(`/departments/dismiss/${uuid}`)
      .then((res) => {
        res.data.department_uuid == null &&
          Toast.create("Usuário desligado com sucesso!", "green");
      })
      .catch((err) => {
        Toast.create("Algo deu errado, tente novamente!", "red");
      });
  }

  static async deleteWorker(uuid) {
    await instance
      .delete(`admin/delete_user/${uuid}`)
      .then((res) => {
        Toast.create("Usuário deletado com sucesso!", "green");
      })
      .catch((err) => {
        Toast.create("Algo deu errado, tente novamente!", "red");
      });
  }
}
