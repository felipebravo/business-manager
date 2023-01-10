export class Modal {
  static showCompaniesModal() {
    const companiesModal = document.querySelector(".bg__modal");
    const btnCloseModal = document.querySelector(".button-close");

    companiesModal.classList.remove("hidden");

    btnCloseModal.addEventListener("click", (evt) => {
      evt.preventDefault();

      companiesModal.classList.add("hidden");
    });
  }
}
