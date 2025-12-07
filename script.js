document.addEventListener("DOMContentLoaded", () => {
  initializeLoading();
  initializeNavigation();
  initializeScrollAnimations();
  initializePortfolioFilter();
  initializeContactForm();
  initializeSmoothScroll();
  throttledScrollHandler();
});

function initializeLoading() {
  const loadingScreen = document.getElementById("loading-screen");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("fade-out");
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 1000);
  });
}

function initializeNavigation() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
}

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const rate = scrolled * -0.5;

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

function throttle(func, wait) {
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

const throttledScrollHandler = throttle(() => {}, 16);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );

  focusableElements.forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.outline = "2px solid #007BFF";
      this.style.outlineOffset = "2px";
    });

    element.addEventListener("blur", function () {
      this.style.outline = "";
      this.style.outlineOffset = "";
    });
  });
});

const cards = document.querySelectorAll(".hobby-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 15;
    const rotateY = (x / rect.width - 0.5) * -15;

    card.style.transform = `
        perspective(600px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.03)
      `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
        perspective(600px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("#matkul table");
  if (!table) return;

  const headers = [...table.querySelectorAll("thead th")].map((th) =>
    th.innerText.trim()
  );

  table.querySelectorAll("tbody tr").forEach((row) => {
    const cells = row.querySelectorAll("td");

    cells.forEach((td, index) => {
      if (td.classList.contains("center")) return;

      if (!td.hasAttribute("data-label")) {
        td.setAttribute("data-label", headers[index] || "");
      }
    });
  });
});
