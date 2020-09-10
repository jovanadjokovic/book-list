class Book
{
    constructor(author,title,isbn)
    {
        this.author=author;
        this.title=title;
        this.isbn=isbn;
    }
}

class UI
{
    addBookToList(book)
    {
        const list=document.querySelector('#book-list');
        const row=document.createElement('tr');
        row.innerHTML = 
        `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);
    }
    showAlert(message,className)
    {
        const div=document.createElement('div');
        div.className= `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(div,form);

        setTimeout(function()
        {
            document.querySelector('.alert').remove();
        },3000);

    }
    clearFields()
    {
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }
    deleteBook(target)
    {
        

            target.parentElement.parentElement.remove();
    
    }
}

class Store
{
    static getBooks()
    {
        let books;
        if (localStorage.getItem('books')===null)
            books=[];
        else
        {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }
    static displayBooks()
    {  
        const books=Store.getBooks();
        books.forEach
        (
            function(book)
            {
                const ui=new  UI;
                ui.addBookToList(book);
            }
        )

    }
    static addBook(book)
    {
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));

    }
    static removeBook(isbn)
    {
        const books=Store.getBooks();
        books.forEach
        (
            function(book, index)
            {
                if (isbn === book.isbn)
                books.splice(index,1);
            }
        )
        localStorage.setItem('books',JSON.stringify(books));

    }

}

document.querySelector('#book-form').addEventListener('submit', function(e){
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;
    const book= new Book(title,author, isbn);

    const ui=new UI();

    if (title==='' || author==='' || isbn==='')
    {
        ui.showAlert('Please fill in all the fields','error');
    }
    else
    {
        ui.addBookToList(book);

        Store.addBook(book);

        ui.showAlert('Book added','success')
        ui.clearFields();
    }
    
    e.preventDefault();
})

document.addEventListener('DOMContentLoaded',Store.displayBooks);

document.getElementById('book-list').addEventListener('click',function(e)
{
    const ui=new UI();
    if (e.target.className==='delete')
    {
        ui.deleteBook(e.target);
        ui.showAlert('Book removed','success');
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    }
    

    e.preventDefault();
});