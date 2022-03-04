let library = document.querySelector('.main-lib ul');
let wrapper = document.querySelector('.modal-wrapper');
let addButton = document.querySelector('#addBooktoLib');
let inputValues = Array.from(document.querySelectorAll('input'));

let myLibrary = [];
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

function addBooktoLibrary() {
    myLibrary.push(new Book(inputValues[0].value, inputValues[1].value, inputValues[2].value, inputValues[3].checked));
    displayBooks();
    wrapper.style.visibility = 'hidden';
}  

function displayBooks() {
    let li = document.createElement('li');
    li.classList.add('book');
    let bookInfo = document.createElement('div');
    let title = document.createElement('b');
    let restOfInfo = document.createElement('p');    
    let buttonContainer = document.createElement('div');
    let readUnread = document.createElement('button');
    readUnread.classList.add('button');
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('button');
    deleteBtn.innerText = 'delete';

    
    myLibrary.forEach((book) => {
        title.innerText = `${book.title}`;
        restOfInfo.innerText = `| ${book.author} | ${book.numberOfPages}`;
        readUnread.innerText = `${book.hasBeenread()}`;
    })
    
    bookInfo.appendChild(title);
    bookInfo.appendChild(restOfInfo);
    buttonContainer.appendChild(readUnread);
    buttonContainer.appendChild(deleteBtn);
    li.appendChild(bookInfo);
    li.appendChild(buttonContainer);
    library.appendChild(li);
}

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

