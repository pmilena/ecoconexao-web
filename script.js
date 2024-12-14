document.addEventListener("DOMContentLoaded", function () {
  // Seletor do menu
  const menuContent = document.querySelector(".content");
  const menuToggle = menuContent
    ? menuContent.querySelector(".menu-toggle")
    : null;

  // Verificar se o menuToggle existe antes de adicionar o event listener
  if (menuToggle) {
    let show = true;

    menuToggle.addEventListener("click", () => {
      document.body.style.overflow = show ? "hidden" : "initial";
      menuContent.classList.toggle("on", show);
      show = !show;
    });
  } else {
    console.error("Elemento '.menu-toggle' não encontrado.");
  }

  // Script para o slider
  const slides = document.querySelector(".slider");
  const slideCount = slides ? slides.children.length : 0;
  let currentIndex = 0;

  function updateSlide(position) {
    if (slides) {
      slides.style.transform = `translateX(${-position * 100}%)`;
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlide(currentIndex);
  }

  // Adicionando os event listeners para as setas
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  if (leftArrow) {
    leftArrow.addEventListener("click", prevSlide);
  } else {
    console.error("Elemento '.left-arrow' não encontrado.");
  }

  if (rightArrow) {
    rightArrow.addEventListener("click", nextSlide);
  } else {
    console.error("Elemento '.right-arrow' não encontrado.");
  }

  //form cadastro
  document
    .getElementById("registrationForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Coleta os dados do formulário
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        tipoConteudo: document.getElementById("tipoConteudo").value, // Novo campo adicionado
      };

      // Envia os dados para a API do backend usando fetch
      fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.text()) // vou obter resposta como texto
        .then((text) => {
          try {
            const data = JSON.parse(text);
            document.getElementById("responseMessage").innerText =
              data.message || "Usuário registrado com sucesso!";
          } catch (e) {
            document.getElementById("responseMessage").innerText = text;
          }
        })
        .catch((error) => {
          document.getElementById("responseMessage").innerText =
            "Erro ao registrar usuário: " + error.message;
        });
    });
});
