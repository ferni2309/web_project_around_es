export function abrirPopupImagen(imgElement) {
  const card = imgElement.closest(".cards");
  const title = card.querySelector(".group__text").textContent;

  const imagePopup = document.getElementById("image-popup");
  const imagePopupImg = document.getElementById("image-popup-img");
  const imagePopupCaption = document.getElementById("image-popup-caption");

  imagePopupImg.src = imgElement.src;
  imagePopupImg.alt = imgElement.alt;
  imagePopupCaption.textContent = title;

  imagePopup.style.display = "flex";

  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollBarWidth}px`;
}

export function cerrarPopupImagen() {
  const imagePopup = document.getElementById("image-popup");
  imagePopup.style.display = "none";

  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}
