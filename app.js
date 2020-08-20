//BOOK CONSTRUCTOR

function Book (title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//UI CONSTRUCTOR

function UI (){}

//Remove Book
UI.prototype.removeBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove()
    }

}

//VALIDATION
UI.prototype.Validation = function(message,className){
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

//ADD BOOK 
UI.prototype.addBook = function(book){
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

//UI CLEARFIELD
UI.prototype.clearField = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}

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

ui.Validation('Your Book Is Removed' , 'success')



    

})