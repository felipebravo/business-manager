export class Render {
  static allPartnersHomePage(companie) {
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

  static renderCompanieCard(companie) {
    const li = document.createElement("li");
    const companieName = document.createElement("h3");
    const companieDescription = document.createElement("p");
    const divSector = document.createElement("div");
    const companieSector = document.createElement("span");
    const companieIcon = document.createElement("i");
    const companieOpen = document.createElement("span");

    companieName.innerText = companie.name;
    companieName.classList.add("font-title-2");
    companieDescription.innerText = companie.description;
    companieDescription.classList.add("font-text-2");
    companieSector.innerText = companie.sectors.description;
    companieSector.classList.add("font-text-1");
    companieOpen.innerText = companie.opening_hours;
    companieOpen.classList.add("font-text-2");

    switch (companie.sectors.description) {
      case "Alimenticio":
        companieIcon.classList.add("fa-solid");
        companieIcon.classList.add("fa-utensils");
        companieIcon.classList.add("fa-xl");
        break;
      case "Varejo":
        companieIcon.classList.add("fa-solid");
        companieIcon.classList.add("fa-cart-shopping");
        companieIcon.classList.add("fa-xl");
        break;
      case "Textil":
        companieIcon.classList.add("fa-solid");
        companieIcon.classList.add("fa-scroll");
        companieIcon.classList.add("fa-xl");
        break;
      case "Manufatura":
        companieIcon.classList.add("fa-solid");
        companieIcon.classList.add("fa-industry");
        companieIcon.classList.add("fa-xl");
        break;
      case "Aeroespacial":
        companieIcon.classList.add("fa-solid");
        companieIcon.classList.add("fa-rocket");
        companieIcon.classList.add("fa-xl");
        break;
      case "Automotiva":
        companieIcon.classList.add("fa-solid");
        companieIcon.classList.add("fa-car");
        companieIcon.classList.add("fa-xl");
        break;
      case "TI":
        companieIcon.classList.add("fa-solid");
        companieIcon.classList.add("fa-computer");
        companieIcon.classList.add("fa-xl");
        break;
      case "Atacado":
        companieIcon.classList.add("fa-solid");
        companieIcon.classList.add("fa-tags");
        companieIcon.classList.add("fa-xl");
        break;
    }

    divSector.append(companieIcon, companieSector);
    li.append(companieName, companieDescription, divSector, companieOpen);

    return li;
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

  static renderDepartmentCardDescription(department) {
    const departmentLi = document.createElement("li");
    const divTitle = document.createElement("div");
    const departmentTitle = document.createElement("h2");
    const btnEditDepartment = document.createElement("button");
    const iconEditDepartment = document.createElement("i");
    const departmentDescription = document.createElement("p");

    departmentTitle.innerText = department.name;
    departmentTitle.classList.add("font-title-2");
    btnEditDepartment.classList.add("button-icon");
    btnEditDepartment.classList.add("btnEditDepartment");
    btnEditDepartment.setAttribute("id", department.uuid);
    iconEditDepartment.classList.add("fa-solid");
    iconEditDepartment.classList.add("fa-pen");
    iconEditDepartment.classList.add("fa-xl");
    departmentDescription.innerText = department.description;
    departmentDescription.classList.add("font-text-1");

    btnEditDepartment.appendChild(iconEditDepartment);
    divTitle.append(departmentTitle, btnEditDepartment);
    departmentLi.append(divTitle, departmentDescription);

    return departmentLi;
  }

  static renderDepartmentCard(department) {
    const departmentLi = document.createElement("li");
    const departmentTitle = document.createElement("h2");
    const departmentDescription = document.createElement("p");

    departmentLi.classList.add("department-card");

    departmentTitle.innerText = department.name;
    departmentTitle.classList.add("font-title-2");

    departmentDescription.innerText = department.description;
    departmentDescription.classList.add("font-text-1");

    departmentLi.append(departmentTitle, departmentDescription);

    return departmentLi;
  }

  static renderSectorsOptions(uuid, description) {
    const option = document.createElement("option");

    option.innerText = description;
    option.name = description;
    option.id = uuid;

    return option;
  }

  static renderCompaniesOptions(companie) {
    const option = document.createElement("option");

    option.innerText = companie.name;
    option.name = companie.name;
    option.id = companie.uuid;

    return option;
  }

  static renderDepartmentsOptions(department) {
    const option = document.createElement("option");

    option.innerText = department.name;
    option.name = department.name;
    option.id = department.uuid;

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
