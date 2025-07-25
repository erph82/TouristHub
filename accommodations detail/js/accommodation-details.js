$(document).ready(function () {
  const PRICE_PER_NIGHT = 2500000; // قیمت پایه هر شب

  // تنظیمات تقویم شمسی
  const datePickerOptions = {
    format: "YYYY/MM/DD",
    autoClose: true,
    initialValueType: "persian",
    persianDigit: true,
    observer: true,
    calendar: {
      persian: {
        locale: "fa",
      },
    },
    onSelect: function () {
      setTimeout(calculatePrice, 100); // تاخیر کوتاه برای اطمینان از ثبت مقدار
    },
  };

  // راه‌اندازی تقویم‌ها
  $("#checkIn").persianDatepicker(datePickerOptions);
  $("#checkOut").persianDatepicker(datePickerOptions);

  // محاسبه قیمت با تغییر تعداد نفرات
  $("#guestCount").on("change", calculatePrice);

  function calculatePrice() {
    const checkIn = $("#checkIn").val();
    const checkOut = $("#checkOut").val();
    const guestCount = parseInt($("#guestCount").val()) || 0;

    if (checkIn && checkOut && guestCount > 0) {
      // تبدیل تاریخ‌های شمسی به میلادی
      const checkInParts = checkIn.split("/");
      const checkOutParts = checkOut.split("/");

      const checkInDate = new persianDate([
        parseInt(checkInParts[0]),
        parseInt(checkInParts[1]),
        parseInt(checkInParts[2]),
      ]).toDate();

      const checkOutDate = new persianDate([
        parseInt(checkOutParts[0]),
        parseInt(checkOutParts[1]),
        parseInt(checkOutParts[2]),
      ]).toDate();

      const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );

      if (nights > 0) {
        const subtotal = nights * guestCount * PRICE_PER_NIGHT;
        const tax = Math.round(subtotal * 0.09);
        const total = subtotal + tax;

        // نمایش جزئیات قیمت
        $(".price-details .price-row:first-child").html(`
                    <span>${nights} شب × ${guestCount} نفر (${formatPrice(
          PRICE_PER_NIGHT
        )})</span>
                    <span>${formatPrice(subtotal)} تومان</span>
                `);

        $(".price-details .price-row:last-child").html(`
                    <span>مالیات و عوارض (9%)</span>
                    <span>${formatPrice(tax)} تومان</span>
                `);

        $(".total-price").html(`
                    <span>جمع کل</span>
                    <span>${formatPrice(total)} تومان</span>
                `);

        $(".price-summary").fadeIn();
      } else {
        $(".price-summary").fadeOut();
      }
    } else {
      $(".price-summary").fadeOut();
    }
  }

  function formatPrice(price) {
    return price.toLocaleString("fa-IR");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // راه‌اندازی تقویم شمسی

  // گالری تصاویر
  const morePhotosBtn = document.querySelector(".more-photos");
  if (morePhotosBtn) {
    morePhotosBtn.addEventListener("click", showGallery);
  }
  // نمایش گالری کامل تصاویر
  function showGallery() {
    // ساختار HTML گالری
    const galleryHTML = `
        <div class="gallery-overlay">
            <div class="gallery-container">
                <button class="close-gallery">&times;</button>
                <div class="gallery-content">
                    <button class="nav-btn prev-btn">&lt;</button>
                    <div class="main-image">
                        <img src="" alt="تصویر گالری">
                    </div>
                    <button class="nav-btn next-btn">&gt;</button>
                </div>
                <div class="thumbnails"></div>
            </div>
        </div>
    `;

    // افزودن گالری به DOM
    $("body").append(galleryHTML);

    // آرایه تصاویر
    const images = [
      {
        src: "path/to/image1.jpg",
        thumb: "path/to/thumb1.jpg",
        alt: "تصویر ۱",
      },
      {
        src: "path/to/image2.jpg",
        thumb: "path/to/thumb2.jpg",
        alt: "تصویر ۲",
      },
      {
        src: "path/to/image3.jpg",
        thumb: "path/to/thumb3.jpg",
        alt: "تصویر ۳",
      },
      // تصاویر بیشتر...
    ];

    let currentIndex = 0;

    // نمایش تصاویر کوچک
    const $thumbnails = $(".thumbnails");
    images.forEach((image, index) => {
      const thumb = $(
        `<img src="${image.thumb}" alt="${image.alt}" class="thumb">`
      );
      thumb.on("click", () => showImage(index));
      $thumbnails.append(thumb);
    });

    // نمایش تصویر اصلی
    function showImage(index) {
      currentIndex = index;
      const image = images[index];
      $(".main-image img").attr({
        src: image.src,
        alt: image.alt,
      });

      // آپدیت کلاس active برای تصویر کوچک
      $(".thumb").removeClass("active");
      $(".thumb").eq(index).addClass("active");
    }

    // نمایش اولین تصویر
    showImage(0);

    // دکمه‌های مرور
    $(".prev-btn").on("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });

    $(".next-btn").on("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });

    // بستن گالری
    $(".close-gallery").on("click", () => {
      $(".gallery-overlay").fadeOut(() => {
        $(".gallery-overlay").remove();
      });
    });

    // کلیدهای کیبورد
    $(document).on("keydown", function (e) {
      if ($(".gallery-overlay").is(":visible")) {
        switch (e.key) {
          case "ArrowLeft":
            $(".next-btn").click();
            break;
          case "ArrowRight":
            $(".prev-btn").click();
            break;
          case "Escape":
            $(".close-gallery").click();
            break;
        }
      }
    });
  }
});
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
