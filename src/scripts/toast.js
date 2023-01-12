export class Toast {
  static create(content, color) {
    Toastify({
      text: content,
      duration: 2000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: color,
      },
    }).showToast();
  }
}
