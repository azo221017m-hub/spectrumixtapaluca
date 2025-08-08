// Animaciones al hacer scroll
const animElements = document.querySelectorAll("[data-animate]");

function checkScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  animElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", checkScroll);
checkScroll();
