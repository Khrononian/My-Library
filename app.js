// Variables 
const removeBtn = document.querySelector(".remove");
const bookInfo = document.querySelector(".submit-btn");
const interface = document.querySelector(".new-book");
const studied = document.querySelectorAll(".read");
const deletion = document.querySelectorAll(".delete");
let title = document.querySelector(".title");
let author = document.querySelector(".author");
let pages = document.querySelector(".pages");
let read = document.querySelector(".read-check")
let myLibrary = [];

// Event Listeners
removeBtn.addEventListener("click", remove);
bookInfo.addEventListener("click", addBookToLibrary);
interface.addEventListener("click", addUI);
studied.forEach((btn) => {
    btn.addEventListener("click", isStudied);
});
deletion.forEach((btns) => {
    btns.addEventListener("click", deleteCard);
});
window.addEventListener("load", addSavedBooks)

// Constructor
class Book {
    constructor(title, author, pages, read) {
        this.bookTitle = title.value;
        this.bookAuthor = author.value;
        this.bookPages = pages.value;
        this.bookRead = read.checked;
    }
}

// Functions 
function addBookToLibrary(event) {
    event.preventDefault();
    let bookItems = new Book(title, author, pages, read); // Parameters for users input
    let bookSelect = document.querySelector(".book-contain")

    // Book items
    let div = document.createElement("div");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let btn1 = document.createElement("button");
    let btn2 = document.createElement("button");

    bookSelect.appendChild(div);
    div.className = "book";

    div.appendChild(p1);
    p1.innerText = `${bookItems.bookTitle}`;
    p1.className = "book-name cycle"
    div.appendChild(p2);
    p2.innerText = `By: ${bookItems.bookAuthor}`;
    p2.classname = "author-name cycle"
    div.appendChild(p3);
    p3.innerText = `${bookItems.bookPages} pages`;
    p3.className = "pages-num cycle"
    
    if (bookItems.bookRead == false) {
        div.appendChild(btn1);
        btn1.className = "read book-btn";
        btn1.classList.add("grey");
        btn1.innerText = "Not Read"
        btn1.addEventListener("click", isStudied);
    } else {
        div.appendChild(btn1);
        btn1.className = "read book-btn";
        btn1.classList.add("green")
        btn1.innerText = "Read"
        btn1.addEventListener("click", isStudied);
    }
    div.appendChild(btn2);
    btn2.className = "delete book-btn";
    btn2.innerText = "Delete"
    btn2.addEventListener("click", deleteCard)
    
    if (!(bookItems.bookTitle && bookItems.bookAuthor && bookItems.bookPages)) {
        let bookName = document.querySelectorAll(".book")
        for (let i=0; i<bookName.length; i++) {
            if (bookItems.bookTitle == bookName[i].querySelector(".book-name").innerText) {
                bookName[i].remove();
            }
        }
        return;
    }

    // Adds books to the library array
    myLibrary.push(bookItems); 

    //Storage
    storage();

    document.querySelector(".book-info").classList.toggle("appearance");
    document.querySelector("form").reset();
    document.querySelector(".contain-overlay").classList.toggle("overlay");
}
function storage() { // Stores items
    window.localStorage.setItem("book", JSON.stringify(myLibrary));
}
function addSavedBooks() { // Adds the saved books to the dom or page
    let savedBooks = JSON.parse(window.localStorage.getItem("book"));
    
    for (book in savedBooks) {
        bookAddition()
        myLibrary.push(savedBooks[book])
    }
}
function isStudied(e) {
    let readBook = new Book(title, author, pages, read);
    let findTitle = e.target.parentElement.querySelector(".book-name").innerText;
    let saveRead = JSON.parse(window.localStorage.getItem("book"))

    if (e.target.innerText == "Not Read") {
        e.target.classList.remove("grey");
        e.target.classList.toggle("green");
        e.target.innerText = "Read";
        readBook.bookRead = true;
        myLibrary.findIndex(item => {
            if (item.bookTitle == findTitle) {
                item.bookRead = true;
            }
        })
        saveRead.bookRead = true;
        window.localStorage.setItem("book", JSON.stringify(myLibrary))
    } else {
        myLibrary.findIndex(item => {
            if (item.bookTitle == findTitle) {
                item.bookRead = false;
            }
        })
        saveRead.bookRead = false;
        window.localStorage.setItem("book", JSON.stringify(myLibrary))
        e.target.classList.remove("green");
        e.target.classList.toggle("grey");
        e.target.innerText = "Not Read";
    }
}
function bookAddition() {
        let savedBooks = JSON.parse(window.localStorage.getItem("book"));
        let div = document.createElement("div");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let p3 = document.createElement("p");
        let btn1 = document.createElement("button");
        let btn2 = document.createElement("button");

        document.querySelector(".book-contain").appendChild(div);
        div.className = "book"
        div.appendChild(p1)
        p1.innerText = `${savedBooks[book].bookTitle}`
        p1.className = "book-name cycle"
        div.appendChild(p2)
        p2.innerText = `By: ${savedBooks[book].bookAuthor}`
        p2.className = "author-name cycle"
        div.appendChild(p3);
        p3.innerText = `${savedBooks[book].bookPages} pages`
        p3.className = "pages-num cycle"

        if (savedBooks[book].bookRead == false) {
            div.appendChild(btn1);
            btn1.className = "read book-btn";
            btn1.classList.add("grey");
            btn1.innerText = "Not Read"
            btn1.addEventListener("click", isStudied);
        } else {
            div.appendChild(btn1);
            btn1.className = "read book-btn";
            btn1.classList.add("green")
            btn1.innerText = "Read"
            btn1.addEventListener("click", isStudied);
        }
        div.appendChild(btn2);
        btn2.className = "delete book-btn";
        btn2.innerText = "Delete"
        btn2.addEventListener("click", deleteCard)
}
function deleteCard(item) {
    let titleSearch = item.target.parentElement.querySelector(".book-name").innerText
    let deleteBooks = JSON.parse(window.localStorage.getItem("book"));

    item.target.parentElement.remove()
    for (let i in myLibrary) {
        if (titleSearch == myLibrary[i].bookTitle) {
            myLibrary.splice(myLibrary.findIndex(e => e.bookTitle == titleSearch), 1)
            deleteBooks.splice(deleteBooks.findIndex(e => e.bookTitle === titleSearch), 1)
            window.localStorage.setItem("book", JSON.stringify(myLibrary))
        }
    }
}
function remove(e) {
    e.preventDefault();
    document.querySelector(".book-info").classList.toggle("appearance");
    document.querySelector(".contain-overlay").classList.remove("overlay");
    document.querySelector(".contain-overlay").classList.remove("appearance");
    document.querySelector("form").reset();
}
function addUI() {
    document.querySelector(".contain-overlay").classList.toggle("overlay")
    document.querySelector(".book-info").classList.toggle("appearance")
}
