document.getElementById('searchForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
  
    try {
      const response = await fetch(`/search?q=${query}`);
      const data = await response.json();
      console.log(data); // Display search results in console
  
      // Code to display the search results on the page
      const resultsContainer = document.createElement('div');
      resultsContainer.classList.add('search-results');
      
      if (data.length > 0) {
        data.forEach(book => {
          const bookCard = document.createElement('div');
          bookCard.classList.add('book-card');
          bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
          `;
          resultsContainer.appendChild(bookCard);
        });
      } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
      }
  
      // Assuming there is a container to display search results
      const mainContent = document.querySelector('main');
      mainContent.innerHTML = ''; // Clear previous content
      mainContent.appendChild(resultsContainer);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  });