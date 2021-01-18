//Book constructor
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

//adds Book object to myLibrary array
function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

function getBook() {
  let title = document.querySelector('#bookName').value;
  let author = document.querySelector('#authorName').value;
  let pages = document.querySelector('#pageCount').value;
  let read = document.querySelector('#readStatus').checked;
  return new Book(title, author, pages, read);
}

//displays Books
function showBooks() {
  bookShelf.innerHTML = '';
  for (i=0; i<myLibrary.length; i++) {
    //create div give class, style class with css using flexbox
    let bookDiv = document.createElement('div');
    bookDiv.setAttribute('data-id',i);
    bookShelf.appendChild(bookDiv);
    let bookInfo = document.createElement('div');
    const clearButton = document.createElement('button');
    clearButton.textContent = 'x';
    clearButton.classList.add('clearButton');
    clearButton.addEventListener('click',function(){
      myLibrary.splice(clearButton.parentNode.getAttribute('data-id'), 1);
      clearButton.parentNode.parentNode.removeChild(clearButton.parentNode);
    });
    bookDiv.appendChild(clearButton);
    bookInfo.textContent = `\nTitle: ${myLibrary[i].title}\n\nAuthor:\ ${myLibrary[i].author}\n\nPages: ${myLibrary[i].pages}\n\nRead:`;
    bookDiv.appendChild(bookInfo);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    bookInfo.appendChild(checkbox);
    checkbox.setAttribute('style','position: relative; top: 1.5px;');
    if (myLibrary[i].read == true) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
    checkbox.addEventListener('change',function(){
      if (checkbox.checked == true) {
        myLibrary[checkbox.parentNode.parentNode.getAttribute('data-id')].read = true;
      } else {
        myLibrary[checkbox.parentNode.parentNode.getAttribute('data-id')].read = false;
      }
    });
    bookDiv.classList.add('bookCard');
  }
}

let myLibrary = [];
const bookShelf = document.querySelector('.container');

//Popup and overlay
const addBook = document.querySelector('.addBook');
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const form = document.querySelector('.popupForm');
addBook.addEventListener('click', function() {
  form.reset();
  popup.classList.add('popup--active');
  overlay.classList.add('overlay--active');
});

const cancel = document.querySelector('.cancel');
cancel.addEventListener('click', function() {
  popup.classList.remove('popup--active');
  overlay.classList.remove('overlay--active');
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  addBookToLibrary(getBook());
  popup.classList.remove('popup--active');
  overlay.classList.remove('overlay--active');
  showBooks();
});
