document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('bookForm');
    const booksList = document.getElementById('booksList');

    // Function to fetch and display books
    function loadBooks() {
        fetch('/books')
            .then(response => response.json())
            .then(data => {
                // @ts-ignore
                booksList.innerHTML = ''; // Clear the list
                data.forEach(book => {
                    const li = document.createElement('li');
                    li.textContent = `${book.title} by ${book.author}`;
                    // @ts-ignore
                    booksList.appendChild(li);
                });
            });
    }

    // Load books on page load
    loadBooks();

    // Handle form submission
    // @ts-ignore
    bookForm.addEventListener('submit', event => {
        event.preventDefault();

        // @ts-ignore
        const title = document.getElementById('title').value;
        // @ts-ignore
        const author = document.getElementById('author').value;

        fetch('/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author }),
        })
            .then(response => response.json())
            .then(() => {
                // Clear the form
                // @ts-ignore
                bookForm.reset();
                // Reload the list of books
                loadBooks();
            });
    });
});
