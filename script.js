const bookTitle = document.querySelector("#title")
const bookAuthor = document.querySelector("#author")
const bookPages = document.querySelector("#pages")
const bookLanguage = document.querySelector("#language")
const yearPublished = document.querySelector("#year-published")
const readUnread = document.querySelector("#read-unread")
const clearBtn = document.querySelector(".clear-btn")
const addBtn = document.querySelector(".add-btn")
const books = document.querySelector(".books")
let booksWrapper = document.querySelector(".books-wrapper")
const paragraphOne = document.querySelector(".number-of-books")
const paragraphTwo = document.querySelector(".number-of-read-books")
const paragraphThree = document.querySelector(".number-of-unread-books")

myLibrary = []

function Book(title, author, pages, language, yearPublished, readUnread) {
    this.title = title
    this.author = author
    this.pages = pages
    this.language = language
    this.yearPublished = yearPublished
    this.readUnread = readUnread
}

Book.prototype.changeReadStatus = function() {
    this.readUnread = !this.readUnread
} 

function addBookToLibrary(title, author, pages, language, publishYear, readOrUnread) {
    title = bookTitle.value
    author = bookAuthor.value
    pages = bookPages.value
    language = bookLanguage.value
    publishYear = yearPublished.value
    readOrUnread = readUnread.checked

    let newBook = new Book(title, author, pages, language, publishYear, readOrUnread)
    myLibrary.push(newBook)
    bookTitle.value = ""
    bookAuthor.value = ""
    bookPages.value = ""
    bookLanguage.value = ""
    yearPublished.value = ""
    readUnread.checked = false

    displayBook()
}

function displayBook() {
    newCard = document.createElement("div")
    newCard.classList.toggle("card")
    newCard.setAttribute("data-index", myLibrary.length - 1)
    booksWrapper.appendChild(newCard)

    titleAndIcon = document.createElement("div")
    titleAndIcon.classList.toggle("title-and-icons")
    newCard.appendChild(titleAndIcon)

    displayedTitle = document.createElement("h3")
    displayedTitle.classList.toggle("book-title")
    displayedTitle.innerText = myLibrary[myLibrary.length - 1].title
    titleAndIcon.appendChild(displayedTitle)
    
    bookIcons = document.createElement("div")
    bookIcons.classList.toggle("book-icons")
    titleAndIcon.appendChild(bookIcons)

    viewButton = document.createElement("img")

    if (myLibrary[newCard.dataset.index].readUnread === true) {
        viewButton.setAttribute("src", "img/eye-outline.svg")
        viewButton.classList.toggle("read")
    }
    else {
        viewButton.setAttribute("src", "img/eye-closed.svg")
        viewButton.classList.toggle("not-read")
    }
    bookIcons.appendChild(viewButton)

    deleteButton = document.createElement("img")
    deleteButton.classList.toggle("delete")
    deleteButton.setAttribute("src", "img/trash-can-outline.svg")
    // deleteButton.setAttribute("data-index", myLibrary.length - 1)
    bookIcons.appendChild(deleteButton)

    newDiv = document.createElement("div")
    newCard.appendChild(newDiv)

    displayedAuthor = document.createElement("p")
    displayedAuthor.classList.toggle("author-class")
    displayedAuthor.innerText = `Author: ${myLibrary[myLibrary.length - 1].author}`

    displayedPages = document.createElement("p")
    displayedPages.classList.toggle("pages-class")
    displayedPages.innerText = `Pages: ${myLibrary[myLibrary.length - 1].pages}`
    
    displayedLanguage = document.createElement("p")
    displayedLanguage.classList.toggle("language-class")
    displayedLanguage.innerText = `Language: ${myLibrary[myLibrary.length - 1].language}`

    displayedYearPublished = document.createElement("p")
    displayedYearPublished.classList.toggle("year-published-class")
    displayedYearPublished.innerText = `Year Published: ${myLibrary[myLibrary.length - 1].yearPublished}`

    newDiv.appendChild(displayedAuthor)
    newDiv.appendChild(displayedPages)
    newDiv.appendChild(displayedLanguage)
    newDiv.appendChild(displayedYearPublished)

    numerical()
}

function removeBooks() {
    myLibrary = []
    booksWrapper.remove()
    booksWrapper = document.createElement("div")
    booksWrapper.classList.toggle("books-wrapper")
    books.appendChild(booksWrapper)
    numerical()
}

function numerical() {
    numberOfBooks = document.querySelectorAll(".card")
    numberOfReadBooks = document.querySelectorAll(".read")
    numberOfUnreadBooks = document.querySelectorAll(".not-read")
    paragraphOne.innerText = `Books: ${numberOfBooks.length}`
    paragraphTwo.innerText = `Read: ${numberOfReadBooks.length}`
    paragraphThree.innerText = `Unread: ${numberOfUnreadBooks.length}`
}

addBtn.addEventListener("click", addBookToLibrary)
clearBtn.addEventListener("click", removeBooks)
document.addEventListener("click", event => {
    target = event.target
    allCards = document.querySelectorAll(".card")
    if (target.matches(".delete")) {
        target.parentElement.parentElement.parentElement.remove()
        myLibrary.splice(target.dataset.index,1)
        allCards = document.querySelectorAll(".card")
        i = 0;
        allCards.forEach(element => {
            element.setAttribute("data-index", i)
            i++
        })
    }
    numerical()
})

document.addEventListener("click", event => {
    target = event.target
    if (target.matches(".read")) {
        target.setAttribute("src", "img/eye-closed.svg")
        target.classList.toggle("read")
        target.classList.toggle("not-read")
        myLibrary[target.parentElement.parentElement.parentElement.dataset.index].readUnread = false
    }
    else if (target.matches(".not-read")) {
        target.setAttribute("src", "img/eye-outline.svg")
        target.classList.toggle("not-read")
        target.classList.toggle("read")
        myLibrary[target.parentElement.parentElement.parentElement.dataset.index].readUnread = true
    }
    numerical()
})
