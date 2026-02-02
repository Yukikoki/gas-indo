// ============================
// SLIDER OTOMATIS + MANUAL
// ============================
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let current = 0;

if (slides.length > 0) {
  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
  }

  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (nextBtn && prevBtn) {
    nextBtn.onclick = () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    };

    prevBtn.onclick = () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    };
  }

  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 6000);
}

// ============================
// SCROLL REVEAL ANIMATION — FIXED PERMANENT
// ============================
document.addEventListener("DOMContentLoaded", () => {
  // Cek apakah JS ini benar-benar aktif
  console.log("Business script loaded ✅");

  const reveals = document.querySelectorAll(".reveal");

  // Fungsi untuk menampilkan semua elemen .reveal
  function showAll() {
    reveals.forEach((el) => el.classList.add("active"));
  }

  // Tampilkan semuanya langsung tanpa nunggu scroll
  showAll();
});
