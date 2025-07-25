// js/main.js
document.addEventListener("DOMContentLoaded", function () {
  // تنظیمات اسلایدر جاذبه‌ها
  const attractionsSwiper = new Swiper(".attractionsSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // انیمیشن اسکرول
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("shadow-md");
    } else {
      header.classList.remove("shadow-md");
    }
  });

  // منوی موبایل
  const mobileMenuButton = document.querySelector(".md\\:hidden");
  const mobileMenu = document.querySelector(".md\\:flex");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
  // تنظیمات تقویم شمسی
  $("#dateInput").persianDatepicker({
    format: "YYYY/MM/DD",
    initialValue: false,
    autoClose: true,
    maxDate: new persianDate().add("year", 1).valueOf(),
    minDate: new persianDate().valueOf(),
    timePicker: {
      enabled: false,
    },
    toolbox: {
      enabled: true,
      calendarSwitch: {
        enabled: false,
      },
    },
    dayPicker: {
      onSelect: function (unix) {
        // وقتی تاریخ انتخاب شد
        console.log("تاریخ انتخاب شده:", unix);
      },
    },
    navigator: {
      scroll: {
        enabled: false,
      },
      text: {
        btnNextText: '<i class="fas fa-chevron-right"></i>',
        btnPrevText: '<i class="fas fa-chevron-left"></i>',
      },
    },
    observer: {
      observer: true,
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // تنظیمات تقویم شمسی
  $("#dateInput").persianDatepicker({
    format: "YYYY/MM/DD",
    initialValue: false,
    autoClose: true,
    maxDate: new persianDate().add("year", 1).valueOf(),
    minDate: new persianDate().valueOf(),
    timePicker: {
      enabled: false,
    },
    toolbox: {
      enabled: true,
      calendarSwitch: {
        enabled: false,
      },
    },
    dayPicker: {
      onSelect: function (unix) {
        console.log("تاریخ انتخاب شده:", unix);
      },
    },
    navigator: {
      scroll: {
        enabled: false,
      },
      text: {
        btnNextText: "بعدی",
        btnPrevText: "قبلی",
      },
    },
    observer: {
      observer: true,
    },
    responsive: true,
    calendar: {
      persian: {
        locale: "fa",
      },
    },
    onlySelectOnDate: true,
    calendarType: "persian",
    calendar: {
      persian: {
        showHint: true,
        locale: "fa",
      },
    },
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper
  const attractionsSwiper = new Swiper(".attractionsSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // Initialize Persian Date Picker
  $("#dateInput").persianDatepicker({
    format: "YYYY/MM/DD",
    autoClose: true,
  });

  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Search Overlay Toggle
  window.toggleSearch = function (show) {
    const searchOverlay = document.getElementById("searchOverlay");
    const searchBox = document.getElementById("searchBox");

    if (show) {
      searchOverlay.classList.add("active");
      searchBox.classList.add("active");
    } else {
      searchOverlay.classList.remove("active");
      searchBox.classList.remove("active");
    }
  };
});
