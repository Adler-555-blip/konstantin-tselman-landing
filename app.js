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

const createEl = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const setToggleState = (button, target, isOpen) => {
  target.classList.toggle("is-open", isOpen);
  button.setAttribute("aria-expanded", String(isOpen));
  const label = button.querySelector(".toggle-label");
  if (label) label.textContent = isOpen ? "Свернуть" : "Подробнее";
};

const methodSummaries = [
  "Сначала фиксирую сценарий: жизнь, аренда, переезд или капитал.",
  "Проверяю не район на карте, а реальную повседневную логику.",
  "Смотрю качество дома, управление, сервис и расходы.",
  "Сравниваю с аналогами и оцениваю выход из объекта.",
  "Проверяю статус, историю, ограничения и юридические риски.",
  "Оставляю 5–7 вариантов, которые можно защищать логикой.",
];

document.querySelectorAll(".method-item").forEach((item, index) => {
  const number = item.querySelector("span")?.textContent.trim() || String(index + 1).padStart(2, "0");
  const title = item.querySelector("h3")?.textContent.trim() || "";
  const button = createEl("button", "mobile-accordion-toggle");
  button.type = "button";
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = `
    <span class="mobile-accordion-number">${number}</span>
    <span class="mobile-accordion-title">${title}</span>
    <span class="mobile-accordion-summary">${methodSummaries[index] || ""}</span>
    <span class="toggle-label">Подробнее</span>
  `;
  item.prepend(button);
  button.addEventListener("click", () => setToggleState(button, item, !item.classList.contains("is-open")));
});

[
  {
    selector: ".method-filter",
    summary: "До клиента не доходят варианты, которые красиво выглядят, но плохо проходят проверку.",
  },
  {
    selector: ".method-result",
    summary: "Клиент получает короткий shortlist, риски, аргументы и спокойное решение.",
  },
].forEach(({ selector, summary }) => {
  const item = document.querySelector(selector);
  if (!item) return;
  const title = item.querySelector("h3")?.textContent.trim() || "";
  const button = createEl("button", "mobile-insight-toggle");
  button.type = "button";
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = `
    <span>${title}</span>
    <small>${summary}</small>
    <span class="toggle-label">Подробнее</span>
  `;
  item.prepend(button);
  button.addEventListener("click", () => setToggleState(button, item, !item.classList.contains("is-open")));
});

const districtGrid = document.querySelector(".district-grid");
if (districtGrid) {
  const moreButton = createEl("button", "district-more-toggle", "Показать ещё районы");
  moreButton.type = "button";
  moreButton.setAttribute("aria-expanded", "false");
  districtGrid.after(moreButton);
  moreButton.addEventListener("click", () => {
    const isOpen = districtGrid.classList.toggle("districts-expanded");
    moreButton.textContent = isOpen ? "Скрыть районы" : "Показать ещё районы";
    moreButton.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".district-card").forEach((card) => {
  const button = createEl("button", "mobile-detail-toggle");
  button.type = "button";
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = '<span class="toggle-label">Подробнее</span>';
  card.append(button);
  button.addEventListener("click", () => setToggleState(button, card, !card.classList.contains("is-open")));
});

document.querySelectorAll(".case-item").forEach((card) => {
  const button = createEl("button", "mobile-detail-toggle");
  button.type = "button";
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = '<span class="toggle-label">Подробнее</span>';
  card.append(button);
  button.addEventListener("click", () => setToggleState(button, card, !card.classList.contains("is-open")));
});

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open || window.innerWidth > 768) return;
    document.querySelectorAll(".faq-list details[open]").forEach((opened) => {
      if (opened !== item) opened.removeAttribute("open");
    });
  });
});
