import { Users } from "./users.js";
export class Render {
  static homePageAllCompanies(allCompanies) {
    const sectionsList = document.querySelector(".sections__list");
    const liSections = document.createElement("li");
    const sections = [];

    sectionsList.innerText = "";

    allCompanies.forEach((companie) => {
      !sections.includes(companie.sectors.description)
        ? sections.push(companie.sectors.description)
        : null;
    });

    sections.forEach((section) => {
      liSections.appendChild(Render.createCompaniesSections(section));
    });

    sectionsList.appendChild(liSections);

    const ulSections = document.querySelectorAll("ul li ul");

    allCompanies.forEach((companie) => {
      ulSections.forEach((section) => {
        if (companie.sectors.description == section.className) {
          const cardLi = Render.companieModalCard(companie);

          section.appendChild(cardLi);
        }
      });
    });
  }

  static createCompaniesSections(section) {
    const ulSection = document.createElement("ul");
    const ulTitle = document.createElement("h3");

    ulSection.classList.add(section);
    ulTitle.innerText = section;
    ulTitle.classList.add("font-title-2");

    ulSection.appendChild(ulTitle);

    return ulSection;
  }

  static companieModalCard(companie) {
    const li = document.createElement("li");
    const companieName = document.createElement("h3");
    const companieDescription = document.createElement("p");
    const companieSector = document.createElement("span");
    const companieOpen = document.createElement("span");

    companieName.innerText = companie.name;
    companieName.classList.add("font-title-2");
    companieDescription.innerText = companie.description;
    companieDescription.classList.add("font-text-2");
    companieSector.innerText = companie.sectors.description;
    companieSector.classList.add("font-text-1");
    companieOpen.innerText = companie.opening_hours;
    companieOpen.classList.add("font-text-2");

    li.append(companieName, companieDescription, companieSector, companieOpen);

    return li;
  }

  static somePartners(companie) {
    const li = document.createElement("li");
    const companieName = document.createElement("h3");
    const companieDescription = document.createElement("p");
    const companieSector = document.createElement("p");
    const companieOpeningHour = document.createElement("span");

    li.classList.add("slide");
    companieName.innerText = companie.name;
    companieName.classList.add("font-title-2");
    companieDescription.innerText = companie.description;
    companieDescription.classList.add("font-text-2");
    companieDescription.classList.add("p__description");
    companieSector.innerText = companie.sectors.description;
    companieSector.classList.add("font-text-1");
    companieOpeningHour.innerText = companie.opening_hours;
    companieOpeningHour.classList.add("font-text-3");

    li.append(
      companieName,
      companieDescription,
      companieSector,
      companieOpeningHour
    );

    return li;
  }

  static renderSectorsOptions(uuid, description) {
    const option = document.createElement("option");

    option.innerText = description;
    option.name = description;
    option.id = uuid;

    return option;
  }

  static renderUsers(user) {
    const li = document.createElement("li");
    const divUserData = document.createElement("div");
    const divUserStatus = document.createElement("div");
    const divHandleUser = document.createElement("div");
    const btnEditUser = document.createElement("button");
    const btnDeleteUser = document.createElement("button");
    const userEdit = document.createElement("i");
    const userDelete = document.createElement("i");
    const userStatus = document.createElement("i");
    const userName = document.createElement("h2");
    const userEmail = document.createElement("p");
    const userLevel = document.createElement("p");
    const userKindOfWork = document.createElement("p");

    li.setAttribute("id", user.uuid);
    divUserStatus.classList.add("divUserStatus");
    divHandleUser.classList.add("divHandleUser");
    userEdit.classList.add("fa-solid");
    userEdit.classList.add("fa-pen");
    userEdit.classList.add("fa-lg");
    userDelete.classList.add("fa-solid");
    userDelete.classList.add("fa-trash");
    userDelete.classList.add("fa-lg");

    userName.innerText = user.username;
    userName.classList.add("font-title-2");
    userEmail.innerText = user.email;
    userEmail.classList.add("font-text-2");
    userLevel.innerText = user.professional_level;
    userLevel.classList.add("font-text-1");
    userKindOfWork.innerText = user.kind_of_work;
    userKindOfWork.classList.add("font-text-1");

    divUserData.append(userName, userLevel, userKindOfWork, userEmail);

    if (user.department_uuid == null) {
      userStatus.classList.add("fa-solid");
      userStatus.classList.add("fa-user-check");
      userStatus.classList.add("fa-2xl");
    } else {
      userStatus.classList.add("fa-solid");
      userStatus.classList.add("fa-user-tie");
      userStatus.classList.add("fa-2xl");
    }

    btnEditUser.appendChild(userEdit);
    btnDeleteUser.appendChild(userDelete);

    divHandleUser.append(btnEditUser, btnDeleteUser);

    divUserStatus.append(userStatus, divHandleUser);

    li.append(divUserData, divUserStatus);

    btnEditUser.addEventListener("click", (evt) => {
      evt.preventDefault();

      Users.editWorker(user.uuid);
    });

    btnDeleteUser.addEventListener("click", (evt) => {
      evt.preventDefault();

      Users.deleteWorker(user.uuid);
    });

    return li;
  }

  static renderDepartmentsOptions(department) {
    const option = document.createElement("option");

    option.innerText = department.name;
    option.name = department.name;
    option.id = department.uuid;

    return option;
  }

  static renderDepartmentCard(department) {
    const departmentLi = document.createElement("li");
    const departmentTitle = document.createElement("h2");
    const departmentDescription = document.createElement("p");

    departmentTitle.innerText = department.name;
    departmentTitle.classList.add("font-title-2");
    departmentDescription.innerText = department.description;
    departmentDescription.classList.add("font-text-1");

    departmentLi.append(departmentTitle, departmentDescription);

    return departmentLi;
  }

  static renderCompaniesOptions(companie) {
    const option = document.createElement("option");

    option.innerText = companie.name;
    option.name = companie.name;
    option.id = companie.uuid;

    return option;
  }

  static renderWorkersOptions(worker) {
    const option = document.createElement("option");

    option.innerText = worker.username;
    option.name = worker.username;
    option.id = worker.uuid;

    return option;
  }
}
