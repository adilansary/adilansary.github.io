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
