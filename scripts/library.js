let testBooks = [{
    title: 'Deep Work',
    author: 'Cal Newport', 
    pages: 395, 
    read: true,
    rating: 5,
},
{
    title: 'A Mind For Numbers',
    author: 'Barbara Oakley', 
    pages: 666, 
    read: true,
    rating: 4,
},
{
    title: 'How to Take Smart Notes',
    author: 'Sonke Ahrens', 
    pages: 9999, 
    read: false,
    rating: 9,
}]

let myLibrary = [];

(function initializeTestBooks(books) {
    for (let i = 0; i < books.length; i++) {
        addBookToLibrary(books[i].title, books[i].author, books[i].pages, books[i].read, books[i].rating)
    }
})(testBooks)

console.log(myLibrary)

function Book(title, author, pages, read, rating) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.rating = rating
}

(function displayTestBooks (books) {
    let container = document.querySelector('.book-container')
    books.forEach((book) => {
        let temp = document.createElement('div')
        temp.classList.add('book-component')
        temp.innerHTML = `<img src='https://s2.svgbox.net/hero-outline.svg?ic=x' class='exit'><h3>${book.title}</h3><h4>${book.author}</h4><h5>${book.pages}</h5><h5>${book.read}</h5><h5>${book.rating}</h5>`
        container.appendChild(temp)
    })
})(myLibrary)

Book.prototype.info = function() {
    return (
        `${this.title}, written by ${this.author}, ${this.pages}, ${this.read}, ${this.rating}`
    )
}

console.log(myLibrary[2].info())

function addBookToLibrary(title, author, pages, read, rating) {
    let temp = new Book(title, author, pages, read, rating)
    myLibrary.push(temp)
}

function formDataPasser(e) {
    e.preventDefault()

    let data = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        pages: document.getElementById('pages').value,
        read: document.getElementById('read').value,
        rating: document.getElementById('rating').value,
    }

    console.log(data)
    addBookToLibrary(data.title, data.author, data.pages, data.read, data.rating)
    clearDisplay()
    displayBook(myLibrary)
}

function clearDisplay() {
    let container = document.querySelector('.book-container')
    let books = document.querySelectorAll('.book-component')
    for (let i = 0; i < books.length; i++) {
        container.removeChild(books[i])
    }
}

function displayBook (books) {
    let container = document.querySelector('.book-container')
    books.forEach((book) => {   
        let temp = document.createElement('div')
        temp.classList.add('book-component')
        temp.innerHTML = `<img src='https://s2.svgbox.net/hero-outline.svg?ic=x' class='exit'><h3>${book.title}</h3><h4>${book.author}</h4><h5>${book.pages}</h5><h5>${book.read}</h5><h5>${book.rating}</h5>`
        container.appendChild(temp)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sub-btn').addEventListener('click', formDataPasser)
})

function deleteBookData (key) {
    delete myLibrary[key]
    clearDisplay()
    displayBook(myLibrary)
}

function deleteBookGetter() {
    let nodes = document.querySelectorAll('.exit')
    // nodes.forEach((node) => {
    //     node.addEventListener('click', () => {
    //         console.log('exit')
    //     })
    // })

    for (let i = 0; i < nodes.length; i++) {
        nodes[i].addEventListener('click', () => {
            console.log(i)
            deleteBookData(i)
            
        })
    }
}

deleteBookGetter()
