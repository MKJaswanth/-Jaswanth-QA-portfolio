const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".case-card");
const progress = document.querySelector(".scroll-progress span");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    cards.forEach((card) => {
      const visible = filter === "all" || card.dataset.status === filter;
      card.hidden = !visible;
    });
  });
});

const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
};

updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });
