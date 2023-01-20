export class Modal {
  static handleModal() {
    const companiesModal = document.querySelector(".bg__modal");
    const btnCloseModal = document.querySelector(".close-modal");

    companiesModal.classList.remove("hidden");

    btnCloseModal.addEventListener("click", (evt) => {
      evt.preventDefault();

      companiesModal.classList.add("hidden");
    });
  }
}
