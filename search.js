const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-card-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.symptoms.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
});

fetch("./diseaseData.json")
  .then((res) => res.json())
  .then((data) => {
    users = data.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const name = card.querySelector("[data-name]");
      const symptoms = card.querySelector("[data-symptoms]");
      const url = card.querySelector("[data-url]");
      name.textContent = user.name;
      symptoms.textContent = user.symptoms;
      url.textContent = user.url;
      userCardContainer.append(card);
      return {
        name: user.name,
        symptoms: user.symptoms,
        url: user.url,
        element: card,
      };
    });
  });
