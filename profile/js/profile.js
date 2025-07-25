function showSection(sectionId) {
  // مخفی کردن همه بخش‌ها
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });

  // نمایش بخش انتخاب شده
  document.getElementById(sectionId).classList.add("active");

  // آپدیت کردن دکمه‌های منو
  document.querySelectorAll(".menu-items button").forEach((button) => {
    button.classList.remove("active");
  });
  event.target.classList.add("active");
}
// Replace existing mobile menu code with this:
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  const icon = mobileMenuButton.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

// Close mobile menu on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    mobileMenu.classList.remove("active");
    const icon = mobileMenuButton.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
  }
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
    mobileMenu.classList.remove("active");
    const icon = mobileMenuButton.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
  }
});
