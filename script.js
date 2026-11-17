const API_URL = "https://jsonplaceholder.typicode.com/users";

const usersContainer = document.querySelector("#usersContainer");
const searchInput = document.querySelector("#searchInput");
const status = document.querySelector("#status");

let users = [];

function createUserCard(user) {
  const card = document.createElement("article");
  card.className = "user-card";

  const name = document.createElement("h2");
  name.textContent = user.name;

  const email = document.createElement("p");
  email.textContent = user.email;

  const company = document.createElement("p");
  company.textContent = user.company?.name ?? "Company not provided";

  const city = document.createElement("span");
  city.className = "city";
  city.textContent = user.address?.city ?? "City not provided";

  card.append(name, email, company, city);
  return card;
}

function displayUsers(list) {
  usersContainer.replaceChildren();

  if (list.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No users match your search.";
    usersContainer.append(empty);
    return;
  }

  usersContainer.append(...list.map(createUserCard));
}

async function getUsers() {
  searchInput.disabled = true;
  status.textContent = "Loading users…";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`The server returned HTTP ${response.status}.`);
    }

    const data = await response.json();
    users = Array.isArray(data) ? data : [];

    displayUsers(users);
    searchInput.disabled = false;
    status.textContent = `${users.length} users loaded.`;
  } catch (error) {
    status.textContent = "Could not load users. Please try again.";
    const message = document.createElement("p");
    message.className = "error-state";
    message.textContent = error.message;
    usersContainer.replaceChildren(message);
  }
}

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();

  const filteredUsers = users.filter((user) => {
    const searchableText = [user.name, user.email, user.address?.city]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query);
  });

  displayUsers(filteredUsers);
  status.textContent = `${filteredUsers.length} of ${users.length} users shown.`;
});

getUsers();