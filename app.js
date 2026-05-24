const menuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

const closeMobileMenu = () => {
  document.body.classList.remove("mobile-menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Открыть меню");
};

const openMobileMenu = () => {
  document.body.classList.add("mobile-menu-open");
  menuToggle?.setAttribute("aria-expanded", "true");
  menuToggle?.setAttribute("aria-label", "Закрыть меню");
};

menuToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = document.body.classList.contains("mobile-menu-open");
  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

mobileMenu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeMobileMenu();
  }
});

document.addEventListener("click", (event) => {
  const isOpen = document.body.classList.contains("mobile-menu-open");
  const target = event.target;
  if (!isOpen || !(target instanceof Node)) return;
  if (mobileMenu?.contains(target) || menuToggle?.contains(target)) return;
  closeMobileMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});
