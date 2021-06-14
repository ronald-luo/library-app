let testBooks = [{
    title: 'Deep Work',
    author: 'Cal Newport', 
    pages: 395, 
    read: true,
},
{
    title: 'A Mind For Numbers',
    author: 'Barbara Oakley', 
    pages: 666, 
    read: true,
},
{
    title: 'How to Take Smart Notes',
    author: 'Sonke Ahrens', 
    pages: 9999, 
    read: false,
}]

let myLibrary = [];

(function addTestBooks(books) {
    for (let i = 0; i < books.length; i++) {
        addBookToLibrary(books[i].title, books[i].author, books[i].pages, books[i].read)
    }
})(testBooks)

console.log(myLibrary)

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function() {
    return (
        `${this.title}, written by ${this.author}, ${this.pages}, ${this.read}`
    )
}

console.log(myLibrary[2].info())

function addBookToLibrary(title, author, pages, read) {
    let temp = new Book(title, author, pages, read)
    myLibrary.push(temp)
}

function formDataPasser(e) {
    e.preventDefault()

    let data = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        pages: document.getElementById('pages').value,
        read: document.getElementById('read').value,
    }

    console.log(data)
    addBookToLibrary(data.title, data.author, data.pages, data.read)
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sub-btn').addEventListener('click', formDataPasser)
})

function displayBook (books) {
    let container = document.querySelector('.library')
    books.forEach((book) => {
        let temp = document.createElement('h2')
        temp.textContent = book.title
        container.appendChild(temp)
    })
}

displayBook(myLibrary)