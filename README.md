# Express & Sequelize Assignment - Authors & Books API (i didnt have an idea so i chose the one the professor suggested)

A RESTful CRUD API built with **Node.js**, **Express**, and **Sequelize** (MySQL), demonstrating models, one-to-many relationships, migrations, and organized routes/controllers.

---

## Project Description

This project implements a simple library management backend with two models:

- **Author** — stores author information (name, bio, nationality)
- **Book** — stores book information (title, genre, published year) and belongs to an Author

**Relationship:** One Author → Many Books (one-to-many)

---

## Tech Stack

| Layer       | Technology              |
|-------------|-------------------------|
| Runtime     | Node.js                 |
| Framework   | Express 4               |
| ORM         | Sequelize 6             |
| Database    | MySQL (via mysql2)      |
| CLI         | sequelize-cli           |
| Dev tool    | nodemon                 |

## Setup Instructions

### Prerequisites

- Node.js v18+ installed
- npm v9+ installed
- MySQL server running locally (e.g. MySQL Workbench)

### 1. Clone the repository

```bash
git clone https://github.com/SilverReaperDS/Express-Assignment.git
cd Express-Assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the root with your MySQL credentials:

```
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=your_password
DB_NAME=express_assignment
```

### 4. Create the database

Open MySQL Workbench and run:

```sql
CREATE DATABASE express_assignment;
```

### 5. Run database migrations

```bash
npx sequelize-cli db:migrate
```

## How to Run

### Development (with auto-reload)

```bash
npm run dev
```

### Production

```bash
npm start
```

The server starts on **http://localhost:3000** by default.

> **Note:** `sequelize.sync({ alter: true })` is called on startup, so the database tables are automatically created/updated even without running migrations manually.

---

## API Endpoints

Base URL: `http://localhost:3000/api`

---

### Authors

#### `GET /api/authors`
Returns all authors with their associated books.

**Response 200:**
```json
[
  {
    "id": 1,
    "name": "George Orwell",
    "bio": "English novelist and essayist.",
    "nationality": "British",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "books": [
      { "id": 1, "title": "1984", "genre": "Dystopian", "publishedYear": 1949, "authorId": 1 }
    ]
  }
]
```

---

#### `GET /api/authors/:id`
Returns a single author by ID, including their books.

**Response 200:**
```json
{
  "id": 1,
  "name": "George Orwell",
  "bio": "English novelist and essayist.",
  "nationality": "British",
  "books": [ ... ]
}
```

**Response 404:**
```json
{ "error": "Author not found" }
```

---

#### `POST /api/authors`
Creates a new author.

**Request Body:**
```json
{
  "name": "Fyodor Dostoevsky",
  "bio": "Russian novelist.",
  "nationality": "Russian"
}
```

**Required fields:** `name`

**Response 201:**
```json
{
  "id": 3,
  "name": "Fyodor Dostoevsky",
  "bio": "Russian novelist.",
  "nationality": "Russian",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

#### `PUT /api/authors/:id`
Updates an existing author.

**Request Body (any subset of fields):**
```json
{
  "bio": "Russian novelist, short story writer, and journalist."
}
```

**Response 200:** Updated author object.

**Response 404:**
```json
{ "error": "Author not found" }
```

---

#### `DELETE /api/authors/:id`
Deletes an author and all their associated books (CASCADE).

**Response 200:**
```json
{ "message": "Author deleted successfully" }
```

**Response 404:**
```json
{ "error": "Author not found" }
```

---

### Books

#### `GET /api/books`
Returns all books with their associated author.

**Response 200:**
```json
[
  {
    "id": 1,
    "title": "1984",
    "genre": "Dystopian",
    "publishedYear": 1949,
    "authorId": 1,
    "author": {
      "id": 1,
      "name": "George Orwell"
    }
  }
]
```

---

#### `GET /api/books/:id`
Returns a single book by ID, including its author.

**Response 200:** Book object with nested author.

**Response 404:**
```json
{ "error": "Book not found" }
```

---

#### `POST /api/books`
Creates a new book.

**Request Body:**
```json
{
  "title": "Crime and Punishment",
  "genre": "Psychological Fiction",
  "publishedYear": 1866,
  "authorId": 3
}
```

**Required fields:** `title`, `authorId`

**Response 201:** Created book object.

**Response 404 (if authorId doesn't exist):**
```json
{ "error": "Author not found" }
```

---

#### `PUT /api/books/:id`
Updates an existing book.

**Request Body (any subset of fields):**
```json
{
  "genre": "Crime Fiction",
  "publishedYear": 1866
}
```

**Response 200:** Updated book object.

**Response 404:**
```json
{ "error": "Book not found" }
```

---

#### `DELETE /api/books/:id`
Deletes a book by ID.

**Response 200:**
```json
{ "message": "Book deleted successfully" }
```

**Response 404:**
```json
{ "error": "Book not found" }
```

---

## Project Structure

```
Express-Assignment/
├── src/
│   ├── app.js                  # Express app entry point
│   ├── config/
│   │   └── database.js         # Sequelize DB config
│   ├── models/
│   │   ├── index.js            # Model loader & associations
│   │   ├── author.js           # Author model
│   │   └── book.js             # Book model
│   ├── migrations/
│   │   ├── 20240101000001-create-authors.js
│   │   └── 20240101000002-create-books.js
│   ├── seeders/
│   │   └── 20240101000001-demo-authors-books.js
│   ├── controllers/
│   │   ├── authorController.js
│   │   └── bookController.js
│   └── routes/
│       ├── authorRoutes.js
│       └── bookRoutes.js
├── .env
├── .gitignore
├── .sequelizerc
├── package.json
└── README.md
```

---

## Database Schema

### Authors Table

| Column      | Type    | Constraints        |
|-------------|---------|--------------------|
| id          | INTEGER | PK, Auto Increment |
| name        | STRING  | NOT NULL           |
| bio         | TEXT    | nullable           |
| nationality | STRING  | nullable           |
| createdAt   | DATE    | NOT NULL           |
| updatedAt   | DATE    | NOT NULL           |

### Books Table

| Column        | Type    | Constraints               |
|---------------|---------|---------------------------|
| id            | INTEGER | PK, Auto Increment        |
| title         | STRING  | NOT NULL                  |
| genre         | STRING  | nullable                  |
| publishedYear | INTEGER | nullable                  |
| authorId      | INTEGER | FK → Authors.id, NOT NULL |
| createdAt     | DATE    | NOT NULL                  |
| updatedAt     | DATE    | NOT NULL                  |

---

## GitHub Submission

```bash
git init
git add .
git commit -m "Initial commit: Express + Sequelize Authors & Books API"
git remote add origin <your-repo-url>
git push -u origin main
```
