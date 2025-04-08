# Reading List App 

Simple Node.js application that helps people organize their reading with adding a book to the list, editing, deleting and also they can filter their reading by status (to read, reading and completed). The project has been start at 29.03.2025 and committed to the github at 05.04.2025. Tried to make as clean code as possible. After first commits, I tried to implement MongoDB Atlas in separate branch which we learned on teaching week 12, however due to lack of knowledge, I stayed with the old version. It is also important that all three books' details given in the web application are taken from ChatGPT, asked for random books and it generated.

## Features

- Add new books with title, author, genre, status, and optional notes
- View detailed information of a book
- Edit or delete books
- Filter books by reading status (`To Read`, `Reading`, `Completed`)
- Clean and responsive UI using PUG templates and Bootstrap

---

## Tech Stack

Backend: Node.js, Express.js
Templating Engine: Pug
Styling: Bootstrap 5
Validation: express-validator
Flash Messages: connect-flash
Session Management: express-session
Data Storage: In-memory

## Project Structure

Followed given structure in coursework instructions document.

## Routing Overview

`GET /`                      - for viewing all books                    
`GET /books/add`             - rendering add new book form        
`POST /books/add`            - submitting book form                
`GET /books/:id`             - getting bok details            
`GET /books/edit/:id`        - rendering edit book form          
`POST /books/edit/:id`       - submit changes               
`POST /books/delete/:id`     - deleting a book from a list                    
`GET /filter/:status`        - filtering by status    

## Controllers Overview

`getAllBooks(req, res)` – fetches and renders all books.
`getBookById(req, res)` – displays a specific book’s details.
`addBook(req, res)` – validates and adds a new book.
`getEditBookForm(req, res)` – loads the edit form with existing book data.
`updateBook(req, res)` – validates and updates an existing book.
`deleteBook(req, res)` – deletes a book by ID.
`filterBooksByStatus(req, res)` – filters books based on their status.

## Services Overview

Defined in `services/index.js`:

`getAllBooks()` – Returns the full book list.
`getBookById(id)` – Returns a book matching the provided ID.
`addBook(title, author, genre, status, notes)` – Adds a new book with timestamp-based ID.
`updateBook(id, title, author, genre, status, notes)` – Updates book info by ID.
`deleteBook(id)` – Deletes a book by ID.
`filterBooksByStatus(status)` – Filters by reading status or returns all.

Note: because data is stored in memory, page resets after after closing

## Validation

Title: Required, max 200 characters
Author: Required, max 100 characters
Genre: Required
Status: Must be one of `'To Read'`, `'Reading'`, or `'Completed'`

## Installation

1. Clone the repository:
git clone https://github.com/00017589/Reading_List_App-.git cd project

2. Install dependencies:
npm install

3. Run the app:
npm start

4. Open in browser:
http://localhost:3000

## Deployment

I used render.com to deploy the app. Anyone can access the app through the link: https://organizereading.onrender.com