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

      if (dots.length > 0 && dots[i]) {
        dots[i].classList.toggle("active", i === index);
      }
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
// ANIMASI ANGKA BERGERAK (COUNTER)
// ============================
function animateCounters() {
  const counters = document.querySelectorAll(".count");
  counters.forEach((counter) => {
    counter.innerText = "0";
    const target = +counter.getAttribute("data-target");
    const speed = 200;

    const update = () => {
      const current = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (current < target) {
        counter.innerText = Math.min(current + increment, target);
        setTimeout(update, 25);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
}

// ============================
// SCROLL KE BAGIAN SAAT MENU DIKLIK + ANIMASI ANGKA
// ============================
const menuLinks = document.querySelectorAll("nav ul li a");
let counterPlayed = false;

menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    // biar link eksternal tetap jalan
    if (targetId.startsWith("#")) {
      e.preventDefault();
    }

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: "smooth",
      });

      if (targetId === "#project") {
        setTimeout(() => {
          animateCounters();
          counterPlayed = true;
        }, 600);
      }
    }
  });
});

// ============================
// SCROLL REVEAL ANIMATION
// ============================
const sections = document.querySelectorAll("section");

function revealOnScroll() {
  const trigger = window.innerHeight / 1.15;
  sections.forEach((sec) => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) sec.classList.add("visible");
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

function revealElements() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    const revealPoint = 100;
    if (revealTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}
window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

// ============================
// ANIMASI ANGKA SAAT SCROLL KE PROJECT
// ============================
function checkProjectSection() {
  const projectSection = document.querySelector("#project");
  if (!projectSection) return;

  const sectionTop = projectSection.getBoundingClientRect().top;
  const sectionVisible = window.innerHeight - 100;

  if (sectionTop < sectionVisible && !counterPlayed) {
    animateCounters();
    counterPlayed = true;
  }
}
window.addEventListener("scroll", checkProjectSection);
window.addEventListener("load", checkProjectSection);

// ============================
// INISIALISASI MAP (LEAFLET)
// ============================
document.addEventListener("DOMContentLoaded", function () {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  const map = L.map("map").setView([-2.99, 104.761], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const geocoder = L.Control.geocoder({
    defaultMarkGeocode: true,
    geocoder: L.Control.Geocoder.photon(),
  })
    .on("markgeocode", function (e) {
      const center = e.geocode.center;
      map.setView(center, 15);

      L.marker(center)
        .addTo(map)
        .bindPopup(`<b>${e.geocode.name}</b>`)
        .openPopup();
    })
    .addTo(map);

  L.marker([-2.99, 104.761])
    .addTo(map)
    .bindPopup("Lokasi Kantor PT Asia Gasindo Energy")
    .openPopup();
});

// ============================
// HAMBURGER MENU (FIXED)
// ============================
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.querySelector("nav.navbar");

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");

    menuToggle.innerHTML = navbar.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
}

// ============================
// FUNGSI CADANGAN (JIKA DIPANGGIL HTML)
// ============================
function toggleMenu() {
  const navList = document.querySelector("nav ul");
  if (navList) navList.classList.toggle("active");
}

// ===== PRODUCT SLIDER =====
const slider = document.getElementById("productSlider");
const btnLeft = document.getElementById("slideLeft");
const btnRight = document.getElementById("slideRight");

btnLeft.addEventListener("click", () => {
  slider.scrollLeft -= 300;
});

btnRight.addEventListener("click", () => {
  slider.scrollLeft += 300;
});
