let library = document.querySelector('.main-lib');
let wrapper = document.querySelector('.modal-wrapper');

let myLibrary = [];
function Book(title, author, numberOfPages, read) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
    this.hasBeenread = function() {
        if (read) {
            return 'read';
        } else return 'not read yet';
    };
}

Book.prototype.changeReadStatus = function () {
    if (!read) {
        read = true;
    } else read = false;
}

function addBooktoLibrary() {
}  

function displayBooks() {
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

