(function () {
  const root = document.documentElement;
  const toggleButton = document.querySelector(".theme-toggle");
  const storageKey = "portfolio-theme";

  const getStoredTheme = () => localStorage.getItem(storageKey);

  const getPreferredTheme = () => {
    const stored = getStoredTheme();
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  };

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    if (toggleButton) {
      toggleButton.setAttribute("aria-pressed", theme === "dark");
      toggleButton.innerHTML =
        theme === "dark"
          ? '<i class="fas fa-moon"></i><span>Dark</span>'
          : '<i class="fas fa-sun"></i><span>Light</span>';
    }
  };

  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const nextTheme =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      localStorage.setItem(storageKey, nextTheme);
    });
  }
})();

// ===== Navigation Bar Functionality =====
(function () {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const icon = navToggle.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });
  }

  // Smooth scroll with offset and close mobile menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight - 10;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
      
      navMenu.classList.remove("active");
      const icon = navToggle?.querySelector("i");
      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    });
  });

  // Add scrolled class to navbar on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active section highlighting
  const sections = document.querySelectorAll("section[id], header[id]");
  
  function setActiveNavLink() {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Check if we're near the bottom of the page
    const isBottom = viewportHeight + scrollPosition >= document.documentElement.scrollHeight - 50;
    
    if (isBottom) {
      // If at bottom, activate the last section (contact)
      navLinks.forEach((link) => link.classList.remove("active"));
      const contactLink = document.querySelector('.nav-link[href="#contact"]');
      if (contactLink) contactLink.classList.add("active");
      return;
    }

    let currentSection = null;
    let maxVisibleArea = 0;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 80; // Account for navbar height
      const sectionBottom = sectionTop + section.offsetHeight;
      const viewportTop = scrollPosition;
      const viewportBottom = scrollPosition + viewportHeight;

      // Calculate visible area of section
      const visibleTop = Math.max(sectionTop, viewportTop);
      const visibleBottom = Math.min(sectionBottom, viewportBottom);
      const visibleArea = Math.max(0, visibleBottom - visibleTop);

      // Track section with most visible area
      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea;
        currentSection = section.getAttribute("id");
      }
    });

    // Update active link
    if (currentSection) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    }
  }

  window.addEventListener("scroll", setActiveNavLink);
  setActiveNavLink(); // Set active on load
})();
