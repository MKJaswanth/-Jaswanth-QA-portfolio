const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".case-card");
const progress = document.querySelector(".scroll-progress span");
const revealItems = document.querySelectorAll(".section-heading, .case-card, .security-showcase, .method-map article, .automation-proof-grid article, .experience-timeline article, .metric, .cred-grid article, .roadmap-grid article");
const themeToggle = document.querySelector(".theme-toggle");
const contactForm = document.querySelector("#contactForm");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  document.documentElement.dataset.theme = "dark";
}

const syncThemeToggle = () => {
  if (!themeToggle) return;
  const isDark = document.documentElement.dataset.theme === "dark";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.setAttribute("aria-pressed", String(isDark));
};

syncThemeToggle();

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    filters.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));

    cards.forEach((card) => {
      const visible = filter === "all" || card.dataset.status === filter;
      card.hidden = !visible;
    });
  });
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme === "dark" ? "dark" : "";
  localStorage.setItem("portfolio-theme", nextTheme);
  syncThemeToggle();
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`QA enquiry from ${data.get("name") || "portfolio visitor"}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nNeed: ${data.get("need")}\n\nMessage:\n${data.get("message")}`
  );
  window.location.href = `mailto:jaswanth.mk63@gmail.com?subject=${subject}&body=${body}`;
});

const updateProgress = () => {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
};

updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  revealItems.forEach((item) => item.classList.add("reveal"));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
}
