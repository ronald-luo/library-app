// Add listener for the book submission button.
// Add Listener for the book button
(function addListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('sub-btn').addEventListener('click', formDataPasser)
    })
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('book-btn').addEventListener('click', viewAdder)
    })
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('exit-book-btn').addEventListener('click', hideAdder)
    })
})()

let data = {
    myLibrary: [],
    testBooks: [{
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
}],
}

// Convert testbooks to Book objects.
initializeTestBooks(data.testBooks)


// Takes regular objects from testBooks.
// Converts objects into Book objects and pushes them to myLibrary
function initializeTestBooks(books) {
    for (let i = 0; i < books.length; i++) {
        addBookToLibrary(books[i].title, books[i].author, books[i].pages, books[i].read, books[i].rating)
    }
}

// Book Constructor
function Book(title, author, pages, read, rating) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.rating = rating
}

// First pass display of test books.
displayBook(data.myLibrary)

// This is a test prototype :)
Book.prototype.info = function() {
    return (
        `${this.title}, written by ${this.author}, ${this.pages}, ${this.read}, ${this.rating}`
    )
}

// Takes data as props and creates a new book object.
// Then pushes the new book object to myLibrary. 
function addBookToLibrary(title, author, pages, read, rating) {
    let temp = new Book(title, author, pages, read, rating)
    data.myLibrary.push(temp)
}

// takes data from the form and pushes a new Book to the library.
// then resets the display
function formDataPasser(e) {
    e.preventDefault()

    let _data = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        pages: document.getElementById('pages').value,
        read: document.getElementById('read').checked,
        rating: document.getElementById('rating').value,
    }

    console.log(_data)
    addBookToLibrary(_data.title, _data.author, _data.pages, _data.read, _data.rating)
    clearDisplay()
    displayBook(data.myLibrary)
}

// Removes all elements (Books) in the book-container.
// Used when resetting the display: clear -> re-display
function clearDisplay() {
    let container = document.querySelector('.book-container')
    let books = document.querySelectorAll('.book-component')
    for (let i = 0; i < books.length; i++) {
        container.removeChild(books[i])
    }
}

// Takes myLibrary as input, an array of Book objects.
// Creates components that display the book data.
function displayBook (books) {
    let container = document.querySelector('.book-container')
    
    books.forEach((book) => { 
        let testId = titleStringer(book) // creates an id using book title and assigns it to exit button
        idPasser(testId, book)
        let temp = document.createElement('div')
        temp.classList.add('book-component')
        temp.setAttribute('style', `background-color: ${randomColor()}`)
        temp.innerHTML = `
                   <img src='https://s2.svgbox.net/hero-outline.svg?ic=x' class='exit' id=${testId}>
                    <h3>${book.title}</h3>
                    <h4>${book.author}</h4>
                    <div class='stats'>
                    <h5>${book.pages}</h5>
                    <h5>${book.read}</h5>
                    <h5>${book.rating}</h5>
                    <img src='https://s2.svgbox.net/hero-outline.svg?ic=book-open' class='h5'>
                    <img src='https://s2.svgbox.net/materialui.svg?ic=check_box' class='h5'>
                    <img src='https://s2.svgbox.net/hero-outline.svg?ic=star' class='h5'>
                    </div>
                    `
        container.appendChild(temp)
    })
    bookNums() // reset the display for the num books we curently have in the container
    deleteBookGetter() // When a book display occurs, reset their delete buttons
}

// Deletes all the data associated with a book
// Resets the entire display by clearing and redisplaying all books. 
function deleteBookData (key) {
    for (let i = 0; i < data.myLibrary.length; i++) {
        try {
            if (data.myLibrary[i].id === key) {
                delete data.myLibrary[i]
            }
        } 
        catch (e) {
            // console.log(e)
        }
    }
    clearDisplay()
    displayBook(data.myLibrary)
}

// Adds an event listener to the X button on cards
// When a card is clicked, deleteBookData is called with its corresponding book id
function deleteBookGetter() {
    let nodes = document.querySelectorAll('.exit')
    let copy = [...nodes]
    copy.forEach((node) => {
        node.addEventListener('click', () => {
            console.log(node.id)
            deleteBookData(node.id)
        })
    })
}

// takes a book title for input and makes it lowercase without spaces. 
// used to create a unique id for the exit button "A Mind For Numbers" => "amindfornumbers"
function titleStringer(book) {
    let title = book.title
    let lowercase = title.toLowerCase()
    let removedSpaces = lowercase.split(" ").join("")
    return removedSpaces
}

// takes a unique id as input (ie. amindfornumbers) and passes it back to the library
function idPasser(id, book) {
    book.id = id
}

// This is used to bring up and hide the box for adding new cards
function viewAdder () {
    let form = document.querySelector('form')
    let background = document.querySelector('.blur-background')
    background.classList.toggle('blur-on')
    form.classList.toggle('visible')
}

function hideAdder () {
    let form = document.querySelector('form')
    let background = document.querySelector('.blur-background')
    background.classList.toggle('blur-on')
    form.classList.toggle('visible')
}

// Keeps track of the number of books by getting the number of book-components
// Used when re-displaying books (ie. there is a change to the number of books)
function bookNums () {
    let bookNums = document.getElementById('book-nums')
    let nodes = document.querySelectorAll('.book-component')
    let num = [...nodes]
    bookNums.textContent = `${num.length} books`
}

// Generate a random color when called.
// Used to generate random card colors.
function randomColor() {
    let colors = [
        '#F8EFEE',
        '#EAEBF7',
        '#FBF8EE',
    ]

    randInt = Math.floor(Math.random() * colors.length)
    return colors[randInt]
}
