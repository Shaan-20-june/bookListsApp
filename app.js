// Create Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// create UI constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");

  // create the table rows
  const row = document.createElement("tr");

  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class = "delete">X</a></td>
  `;

  list.appendChild(row);
};

// Show alert
UI.prototype.showAlert = function (msg, cls) {
  // Create div element
  const div = document.createElement("div");
  // add classes
  div.className = `alert ${cls}`;
  // add text node
  div.appendChild(document.createTextNode(msg));

  const container = document.querySelector(".container");
  form = document.querySelector("#book-form");

  container.insertBefore(div, form);

  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Clear the Input Fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};
// Delete Book Items
UI.prototype.deleteBook = function (target) {
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
  }
};

// Add event listener to the submit
document.getElementById("book-form").addEventListener("submit", function (e) {
  // get the UI variables
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  // Instantiate the BOOk constructor
  const book = new Book(title, author, isbn);

  // Instantiate the UI
  const ui = new UI();

  // Validate the fields
  if (title === "" || author === "" || isbn === "") {
    // Show error alert
    ui.showAlert("Please fill in the fields", "error");
  } else {
    // Add book to the list
    ui.addBookToList(book);
    // Show success alert
    ui.showAlert("Book added successfully", "success");
    // Clear the fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Delete book
document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();

  ui.deleteBook(e.target);

  ui.showAlert("Book deleted successfully!", "success");

  e.preventDefault();
});
