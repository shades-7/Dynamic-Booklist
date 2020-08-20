class Book {
    constructor (title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}

class UI {
    addBook(book){
        const list = document.getElementById('book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = "#" class="delete">X</a></td>

    `
     list.appendChild(row)

    }

    clearField(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    Validation(message,className){
        
        const div = document.createElement('div')
    
        div.className =`alert ${className}`;
        div.appendChild(document.createTextNode(message))
    
        const container = document.querySelector('.container')
    
        const form = document.querySelector('#book-form')
    
        container.insertBefore(div , form) 
    
        setTimeout(function(){
            document.querySelector('.alert').remove()
        },3000)

}

    

    removeBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove()

    }
}

}


//METHODS OF LS
class Store {

    static getBooks(){
        let books ;
        if(localStorage.getItem('books') === null){
            books = [];

        }else{
            books = JSON.parse(localStorage.getItem('books'))
           
        }
        return books;

    }

    static displayBooks(){
        const books =Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            ui.addBook(book)
        })
    }

    static addBooks(book){
        const books = Store.getBooks();

        books.push(book)
         localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBooks(isbn){
        const books = Store.getBooks();

        books.forEach(function(book,index){
            if(book.isbn === isbn){
                books.splice(index,1)
            }
        })
        localStorage.setItem('books',JSON.stringify(books));
    }

}

//EVENT LISTNER FOR CALLING ADDBOOKS
document.addEventListener('DOMContentLoaded' ,Store.displayBooks);

//EVENT LISTNER FOR ADDING BOOK
document.getElementById('book-form').addEventListener('submit' , function(e){
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

        const book = new Book(title,author,isbn);

        const ui = new UI();

        if(title === '' || author ==='' || isbn === ''){

            ui.Validation('Please fill all the fields' , 'error');

        }else{

            ui.addBook(book)

            Store.addBooks(book)

            ui.Validation('Book Is Added' , 'success')

            ui.clearField();
    

        }

       
    e.preventDefault();
})

//EVENT LISTNER FOR DELETING BOOK
document.getElementById('book-list').addEventListener('click' , function(e){
   
// if(e.target.classList.contains('delete')){
// e.target.parentElement.parentElement.remove()

// e.preventDefault()

const ui = new UI;

ui.removeBook(e.target)

Store.removeBooks(e.target.parentElement.previousElementSibling.textContent)

ui.Validation('Your Book Is Removed' , 'success')



    

})