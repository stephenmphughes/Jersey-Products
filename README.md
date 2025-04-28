# README

# Jersey Products - Local Setup Instructions

This document outlines how to install and run the **Jersey Products** app locally.

---

## Prerequisites
- Ruby 3.x
- Rails 7.x
- PostgreSQL installed and running
- Node.js (version 18+)
- Yarn package manager

---

## Steps to Set Up Locally

1. **Clone the Repository**
   - Run:
     ```bash
     git clone https://github.com/stephenmphughes/Jersey-Products.git
     cd Jersey-Products
     ```

2. **Install Ruby Gems**
   - Run:
     ```bash
     bundle install
     ```

3. **Install Node.js Dependencies**
   - Run:
     ```bash
     yarn install
     ```
   - Note: `node_modules` are **not included** in the GitHub repository. You must run `yarn install` manually.

4. **Set up the Database**
   - Create and migrate the PostgreSQL database:
     ```bash
     rails db:create
     rails db:migrate
     rails db:seed   # Optional if seed data is present
     ```

5. **Start the Backend Server**
   - In your first terminal:
     ```bash
     bin/rails server
     ```
   - This will start the Rails server at `http://localhost:3000`.

6. **Start the Webpacker Dev Server**
   - In a second terminal:
     ```bash
     ./bin/webpack-dev-server
     ```
   - This serves the React frontend assets.

7. **Running Frontend (React) Tests**
   - In a third terminal:
     ```bash
     yarn test
     ```

---

## Access the Application

- **React Frontend:** `http://localhost:3000`
- **HTML Frontend:** `http://localhost:3000/html-client.html`

---

## Important Notes
- Active Storage is configured for local storage of images.
- PostgreSQL is used as the database.
- Webpacker is used for JavaScript management.
- All tests (backend and frontend) are included.
- No `node_modules` folder is included — must install manually.
