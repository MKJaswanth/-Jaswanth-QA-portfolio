const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".case-card");

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
