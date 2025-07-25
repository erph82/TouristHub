function updateTotal() {
  const basePrice = 1000000;
  let extraPrice = 0;

  if (document.getElementById("breakfast").checked) {
    extraPrice += 50000;
  }
  if (document.getElementById("parking").checked) {
    extraPrice += 30000;
  }

  document.getElementById("extraPrice").textContent =
    extraPrice.toLocaleString();
  document.getElementById("totalPrice").textContent = (
    basePrice + extraPrice
  ).toLocaleString();
}

function confirmReservation() {
  const paymentMethod = document.getElementById("paymentMethod").value;
  if (confirm("آیا از تأیید رزرو مطمئن هستید؟")) {
    alert("در حال انتقال به درگاه پرداخت...");
  }
}

// تنظیم تاریخ‌های نمایشی
document.getElementById("checkInDate").value = "۱۴۰۲/۱۲/۲۵";
document.getElementById("checkOutDate").value = "۱۴۰۲/۱۲/۲۷";
