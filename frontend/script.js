// Fetching the list of books
fetch('http://localhost:3000/books')
  .then(response => response.json())
  .then(books => {
    const booksList = document.getElementById('books-list');
    books.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.className = 'book-card';
      bookCard.innerHTML = `
        <img src="book-placeholder.jpg" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
      `;
      booksList.appendChild(bookCard);
    });
  })
  .catch(error => console.error('Error fetching books:', error));
