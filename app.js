let myLibrary = [];

const table = document.querySelector("table");
const form = document.querySelector("form");
let deleteRows;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const deleteTable = () => {
  const table = document.querySelector("table");

  table.innerHTML = `
  <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Pages</th>
          <th>Read</th>
          <th>Toggle Read</th>
          <th>Delete</th>
        </tr>
  `;
};

function addBookToTable(title, author, pages, read, index) {
  const row = document.createElement("tr");

  if (read === true) {
    read = "Read";
  } else {
    read = "Not read";
  }

  row.innerHTML = `
  <td>${title}</td>
  <td>${author}</td>
  <td>${pages}</td>
  <td>${read}</td>
  <td class="toggle" data-arr-pos = ${index}>Toggle</td>
  <td class="delete" data-arr-pos = ${index}>Trash</td>
  `;
  table.appendChild(row);
}

function addLibrarytoTable(arr) {
  deleteTable();
  for (let book of arr) {
    let { title, author, pages, read } = book;
    const index = myLibrary.indexOf(book);
    addBookToTable(title, author, pages, read, index);
  }
  makeDeleteReady();
  makeToggleReady();
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  const index = myLibrary.indexOf(book);
  addLibrarytoTable(myLibrary);
}

function makeDeleteReady() {
  const deleteButtonList = document.querySelectorAll(".delete");

  deleteButtonList.forEach((element) => {
    element.addEventListener("click", function (event) {
      let arrayPosition = event.target.dataset.arrPos;

      myLibrary.splice(arrayPosition, 1);

      addLibrarytoTable(myLibrary);
    });
  });
}

function makeToggleReady() {
  const toggleButtonList = document.querySelectorAll(".toggle");

  toggleButtonList.forEach((element) => {
    element.addEventListener("click", function (event) {
      let arrayPosition = event.target.dataset.arrPos;
      toggleRead(arrayPosition);
    });
  });
}

function toggleRead(arrPos) {
  readStatus = myLibrary[arrPos].read;
  console.log(readStatus);
  if (readStatus) {
    myLibrary[arrPos].read = false;
  } else {
    myLibrary[arrPos].read = true;
  }
  addLibrarytoTable(myLibrary);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleValue = title.value;
  const authorValue = author.value;
  const pagesValue = pages.value;
  const readValue = read.checked;
  addBookToLibrary(titleValue, authorValue, pagesValue, readValue);
});

addBookToLibrary("Lord of the Rings", "J R R Tolkien", 1735, true);
addBookToLibrary("Lord of the Flies", "Willam Gibson", 435, false);
