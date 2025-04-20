// // Fetching the list of books
// fetch('http://localhost:3000/books')
//   .then(response => response.json())
//   .then(books => {
//     const booksList = document.getElementById('books-list');
//     books.forEach(book => {
//       const bookCard = document.createElement('div');
//       bookCard.className = 'book-card';
//       bookCard.innerHTML = `
//         <img src="book-placeholder.jpg" alt="${book.title}">
//         <h3>${book.title}</h3>
//         <p>${book.author}</p>
//       `;
//       booksList.appendChild(bookCard);
//     });
//   })
//   .catch(error => console.error('Error fetching books:', error));




// Function to fetch and display books
function loadBooks() {
  fetch('http://localhost:3000/books')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      return response.json();
    })
    .then(books => {

      console.log("✅ Frontend and backend are connected!");

      const booksList = document.getElementById('books-list');
      booksList.innerHTML = ''; // Clear existing content

      books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
          <img src="book-placeholder.jpg" alt="${book.title}" />
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Genre:</strong> ${book.genre}</p>
          <p><strong>Year:</strong> ${book.year}</p>
        `;
        booksList.appendChild(bookCard);
      });
    })
    .catch(error => {
      console.error('Error fetching books:', error);
      const booksList = document.getElementById('books-list');
      booksList.innerHTML = `<p style="color:red;">Failed to load books. Try again later.</p>`;
    });
}

// Load books on page load
window.addEventListener('DOMContentLoaded', loadBooks);
