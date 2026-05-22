const districtData = {
  center: {
    title: "Центр Сочи",
    text:
      "Подходит тем, кому важны городская инфраструктура, статусная аренда, рестораны, прогулки и понятная ликвидность.",
    bullets: ["Сильный спрос круглый год", "Высокий порог входа", "Требует точной проверки дома"],
  },
  sirius: {
    title: "Сириус",
    text:
      "Хорош для семей, инвесторов и тех, кто смотрит на развитие территории, спортивную инфраструктуру и близость к морю.",
    bullets: ["Новая инфраструктура", "Спрос на аренду", "Важно проверять статус объекта"],
  },
  polyana: {
    title: "Красная Поляна",
    text:
      "Сценарий для сезонной жизни, горного отдыха и доходной аренды, где решают управляющая компания и формат комплекса.",
    bullets: ["Зимний и летний спрос", "Сильная роль сервиса", "Не каждый объект ликвиден"],
  },
  adler: {
    title: "Адлер",
    text:
      "Практичный выбор для жизни, аренды и бюджета ниже центра, если правильно выбрать микрорайон и транспортную связность.",
    bullets: ["Шире выбор бюджета", "Близость аэропорта", "Нужно учитывать шум и сезонность"],
  },
};

const card = document.querySelector("#districtCard");
const pins = document.querySelectorAll(".district-pin");

pins.forEach((pin) => {
  pin.addEventListener("click", () => {
    const data = districtData[pin.dataset.district];
    if (!data) return;

    pins.forEach((item) => item.classList.remove("active"));
    pin.classList.add("active");

    card.innerHTML = `
      <p class="eyebrow">Текущий фокус</p>
      <h3>${data.title}</h3>
      <p>${data.text}</p>
      <ul>${data.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
    `;
  });
});

document.querySelector("#filterButton")?.addEventListener("click", () => {
  document.querySelector("#method")?.scrollIntoView({ behavior: "smooth", block: "start" });
});
