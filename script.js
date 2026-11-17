const usersContainer = document.getElementById("usersContainer")
const searchInput = document.getElementById("searchInput")
const status = document.getElementById("status")

let users = []

async function getUsers() {
  try {
    status.textContent = "Loading users..."

    const response = await fetch("https://jsonplaceholder.typicode.com/users")

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    users = await response.json()

    displayUsers(users)

    status.textContent = `${users.length} users loaded`
  } catch (error) {
    status.textContent = error.message
  }
}

function displayUsers(data) {
  usersContainer.innerHTML = data
    .map(
      (user) => `
    <article class="user-card">
      <h2>${user.name}</h2>
      <p>${user.email}</p>
      <p>${user.address.city}</p>
    </article>
  `,
    )
    .join("")
}

searchInput.addEventListener("input", (event) => {
  const searchValue = event.target.value.toLowerCase()

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchValue),
  )

  displayUsers(filteredUsers)
})

getUsers()
