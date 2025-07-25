// راه‌اندازی AOS
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: true,
  });
});

// اضافه کردن اسکرول نرم
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// بهبود فیلتر کردن با انیمیشن
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    const cards = document.querySelectorAll(".attraction-card");

    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "scale(0.8)";

      setTimeout(() => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.display = "none";
        }
      }, 300);
    });
  });
});

// جستجو در جاذبه‌ها
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".attraction-card");

  cards.forEach((card) => {
    const content = card.textContent.toLowerCase();
    if (content.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
