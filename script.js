let show = true;
const menuContent = document.querySelector(".content");
const menuToggle = menuContent.querySelector(".menu-toggle");

menuToggle.addEventListener("click", () => {
  document.body.style.overflow = show ? "hidden" : "initial";

  menuContent.classList.toggle("on", show);
  show = !show;
});

// script para slider-container
const slides = document.querySelector(".slider");
const slideCount = slides.children.length;
let currentIndex = 0;

function updateSlide(position) {
  slides.style.transform = `translateX(${-position * 100}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slideCount;
  updateSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slideCount) % slideCount;
  updateSlide(currentIndex);
}
