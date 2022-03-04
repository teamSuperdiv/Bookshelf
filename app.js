let library = document.querySelector('.main-lib ul');
let wrapper = document.querySelector('.modal-wrapper');
let addButton = document.querySelector('#addBooktoLib');
let inputValues = Array.from(document.querySelectorAll('input'));

let myLibrary = [];
let bookID = 0;

// Overview over Books
/* 
* total
* total read
* total unread
*/
function updateOverview() {
    document.querySelector('.booksTotal span').innerText = myLibrary.length;
    let booksRead = myLibrary.filter((book) => {
        return book.read == true;
    })
    let booksUnread = myLibrary.filter((book) => {
        return book.read == false;
    })
    document.querySelector('.booksRead span').innerText = booksRead.length;
    document.querySelector('.booksUnread span').innerText = booksUnread.length;
}

// Book Object Constructor
function Book(title, author, numberOfPages, read) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
    this.hasBeenread = function() {
        if (read) {
            return 'read';
        } else return 'not read';
    };
}

Book.prototype.changeReadStatus = function () {
    if (!read) {
        read = true;
    } else read = false;
}

function validateForm() {
    let inputs = Array.from(document.querySelectorAll('input:not([type="checkbox"])'));
    return inputs.every((input) => {
        return input.value !== '';
    })
}

function addBooktoLibrary() {
    if (validateForm()) {
        myLibrary.push(new Book(inputValues[0].value, inputValues[1].value, inputValues[2].value, inputValues[3].checked));
        bookID++;
        displayBooks();
        updateOverview();
        wrapper.style.visibility = 'hidden';
    } else {
        document.querySelector('#error').hidden = false;
    }
}

function clearModal() {
    
}

// Render the book cards to the DOM
function displayBooks() {
    library.innerHTML = '';
    myLibrary.forEach((book) => {
        let li = document.createElement('li');
        li.classList.add('book');
        li.dataset['id'] = bookID;
        let bookInfo = document.createElement('div');
        let title = document.createElement('b');
        let restOfInfo = document.createElement('p');    
        let buttonContainer = document.createElement('div');
        let readUnread = document.createElement('button');
        readUnread.classList.add('button');
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('button');
        deleteBtn.classList.add('delete');
        deleteBtn.innerText = 'delete';

        title.innerText = `${book.title}`;
        restOfInfo.innerText = `| ${book.author} | ${book.numberOfPages} pages`;
        readUnread.innerText = `${book.hasBeenread()}`;

        bookInfo.appendChild(title);
        bookInfo.appendChild(restOfInfo);
        buttonContainer.appendChild(readUnread);
        buttonContainer.appendChild(deleteBtn);
        li.appendChild(bookInfo);
        li.appendChild(buttonContainer);
        library.insertAdjacentElement('beforeend',li);
    })  
}

// delete book Items
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        let idToDelete = e.target.dataset['id'];
        myLibrary.splice(idToDelete, 1);
        displayBooks();
        updateOverview();
    }
})

// Toggle Modal Visibility
document.addEventListener('click', function(e) {
    if (e.target.closest('.button.add')) {
        wrapper.style.visibility = 'visible';
    } else if (e.target.closest('.modal')) {
        return;
    } else {
        wrapper.style.visibility = 'hidden';
    } 
})

