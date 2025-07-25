// راه‌اندازی انیمیشن‌های AOS
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    offset: 100,
    once: true,
  });
});
// تنظیمات اولیه
document.addEventListener("DOMContentLoaded", function () {
  initializePriceSlider();
  initializeFilters();
  initializeRatingFilter();
});
// تنظیمات اسلایدر قیمت
function initializePriceSlider() {
  const priceSlider = document.getElementById("priceRange");
  const minPriceInput = document.getElementById("minPrice");
  const maxPriceInput = document.getElementById("maxPrice");

  if (!priceSlider) return;

  noUiSlider.create(priceSlider, {
    start: [500000, 5000000],
    connect: true,
    direction: "rtl",
    range: {
      min: 0,
      max: 10000000,
    },
    format: {
      to: (value) => Math.round(value).toLocaleString("fa-IR"),
      from: (value) => Number(value.replace(/,/g, "")),
    },
  });

  // به‌روزرسانی inputs
  priceSlider.noUiSlider.on("update", function (values, handle) {
    if (handle === 0) {
      minPriceInput.value = values[0];
    } else {
      maxPriceInput.value = values[1];
    }
    applyFilters();
  });

  // به‌روزرسانی اسلایدر با تغییر inputs
  // به‌روزرسانی اسلایدر از طریق inputs
  [minPriceInput, maxPriceInput].forEach((input, index) => {
    input.addEventListener("change", function () {
      let values = [null, null];
      values[index] = this.value;
      priceSlider.noUiSlider.set(values);
    });
  });
}

// مدیریت دکمه‌های علاقه‌مندی
document.querySelectorAll(".favorite-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const icon = this.querySelector("i");
    if (icon.classList.contains("far")) {
      icon.classList.remove("far");
      icon.classList.add("fas");
      this.style.color = "#ef4444";
    } else {
      icon.classList.remove("fas");
      icon.classList.add("far");
      this.style.color = "inherit";
    }
  });
});

// راه‌اندازی فیلترها
function initializeFilters() {
  const filterCheckboxes = document.querySelectorAll(".filter-checkbox");
  const clearFiltersBtn = document.getElementById("clearFilters");

  // رویداد تغییر چک‌باکس‌ها
  filterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", applyFilters);
  });

  // پاک کردن فیلترها
  clearFiltersBtn.addEventListener("click", function () {
    filterCheckboxes.forEach((checkbox) => (checkbox.checked = false));
    document.querySelectorAll(".rating-option").forEach((option) => {
      option.classList.remove("selected");
    });
    document.getElementById("priceRange").noUiSlider.reset();
    applyFilters();
  });
}

// راه‌اندازی فیلتر رتبه
function initializeRatingFilter() {
  const ratingOptions = document.querySelectorAll(".rating-option");

  ratingOptions.forEach((option) => {
    option.addEventListener("click", function () {
      ratingOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      applyFilters();
    });
  });
}

// اعمال فیلترها
function applyFilters() {
  const accommodations = document.querySelectorAll(".accommodation-card");
  const selectedTypes = getSelectedValues("type");
  const selectedAmenities = getSelectedValues("amenities");
  const selectedRating = getSelectedRating();
  const priceRange = getPriceRange();

  accommodations.forEach((acc) => {
    const price = extractPrice(acc);
    const rating = extractRating(acc);
    const type = acc.dataset.type;
    const amenities = acc.dataset.amenities?.split(",") || [];

    let visible = true;

    // فیلتر نوع
    if (selectedTypes.length > 0 && !selectedTypes.includes(type)) {
      visible = false;
    }

    // فیلتر امکانات
    if (
      selectedAmenities.length > 0 &&
      !selectedAmenities.every((a) => amenities.includes(a))
    ) {
      visible = false;
    }

    // فیلتر قیمت
    if (price < priceRange.min || price > priceRange.max) {
      visible = false;
    }

    // فیلتر رتبه
    if (selectedRating && rating < selectedRating) {
      visible = false;
    }

    acc.style.display = visible ? "block" : "none";
  });

  updateResults();
}

// توابع کمکی
function getSelectedValues(name) {
  return Array.from(
    document.querySelectorAll(`input[name="${name}"]:checked`)
  ).map((cb) => cb.value);
}

function getSelectedRating() {
  const selected = document.querySelector(".rating-option.selected");
  return selected ? Number(selected.dataset.rating) : 0;
}

function getPriceRange() {
  const slider = document.getElementById("priceRange");
  const values = slider.noUiSlider.get();
  return {
    min: Number(values[0].replace(/,/g, "")),
    max: Number(values[1].replace(/,/g, "")),
  };
}

function extractPrice(card) {
  const priceElement = card.querySelector(".price .amount");
  return Number(priceElement.textContent.replace(/[^\d]/g, ""));
}

function extractRating(card) {
  const ratingElement = card.querySelector(".rating span");
  return Number(ratingElement.textContent);
}

function updateResults() {
  const visibleCount = document.querySelectorAll(
    '.accommodation-card[style="display: block;"]'
  ).length;
  // اینجا می‌توانید تعداد نتایج را نمایش دهید
}

// تابع debounce برای بهینه‌سازی جستجو
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// مدیریت دکمه نمایش بیشتر
let page = 1;
const loadMoreBtn = document.getElementById("loadMoreBtn");
loadMoreBtn.addEventListener("click", function () {
  // اینجا می‌توانید درخواست AJAX برای دریافت موارد بیشتر ارسال کنید
  loadMore();
});

function loadMore() {
  page++;
  // شبیه‌سازی درخواست به سرور
  setTimeout(() => {
    // اضافه کردن کارت‌های جدید به گرید
    const grid = document.getElementById("accommodationsGrid");
    // اینجا کارت‌های جدید را اضافه کنید
  }, 1000);
}
// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    // md breakpoint
    mobileMenu.classList.add("hidden");
  }
});
document
  .getElementById("mobileMenuButton")
  .addEventListener("click", function () {
    document.getElementById("mobileMenu").classList.toggle("hidden");
  });
