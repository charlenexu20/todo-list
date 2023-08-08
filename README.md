# todo-list
This project is a simple TodoList application developed to practice and demonstrate the use of MongoDB.

<img width="1278" alt="Screen Shot 2023-08-08 at 1 01 45 PM" src="https://github.com/charlenexu20/todo-list/assets/113628879/9cdf868f-8e65-4872-b5e4-fbd3b7fa1a62">

## Usage
* __Home Page (http://localhost:3000):__ This serves as the default page displaying the "Today" list. To add new items to the list, enter the item in the input field and click the "+" button.

* __Custom Lists:__ Easily create personalized lists by appending a custom name to the URL (e.g., http://localhost:3000/travel). This enables you to populate and access lists with specific names.

* __Item Deletion:__ To remove an item, simply check the checkbox next to it. This will mark the item as completed and subsequently remove it from the list automatically.

## Project Structure
Here's a breakdown of the project structure:

* `app.js:` This serves as the application's central entry point. It's responsible for configuring the server, defining routes, and establishing a connection to the database.

* `public:` This directory contains static files such as CSS stylesheets.
   * `styles.css:` This file contains the CSS stylesheets for the application.

* `views:` Within this folder, you'll locate EJS templates used to generate HTML pages.

   * `about.ejs:` The template for the about page.
   * `header.ejs:` An included template for the header, utilized across multiple EJS files.
   * `footer.ejs:` Another included template, this time for the footer.
   * `list.ejs:` The template used to create the to-do list page.
