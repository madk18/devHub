# DevHub — User Dashboard

A small API-powered user directory built with HTML, CSS and vanilla JavaScript.

## Features
- Loads sample users from JSONPlaceholder with `fetch()`
- Uses `async/await` and checks `response.ok`
- Handles HTTP and network errors
- Shows loading, empty and error states
- Searches by name, email or city
- Creates cards with DOM methods and `textContent` instead of inserting API text through `innerHTML`
- Responsive layout and accessible status announcements

## Run locally
Open `index.html` in a browser. An internet connection is required to load the API data. VS Code Live Server is also supported.

## API
https://jsonplaceholder.typicode.com/users

JSONPlaceholder is a public demo API; the returned records are sample data.

## Technologies
HTML5 · CSS3 · Vanilla JavaScript · Fetch API
