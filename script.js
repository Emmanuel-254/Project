function searchMovie() {
    const query = document.getElementById('search').value.toLowerCase();
  
    fetch('db.json')
      .then(response => response.json())
      .then(data => {
        const movie = data.movies.find(m => m.title.toLowerCase() === query);
        if (movie) {
          displayMovieDetails(movie);
        } else {
          document.getElementById('movie-details').innerHTML = 'Movie not found!';
        }
      });
  }
  
  function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movie-details');
    
    // Check if the container exists
    if (!movieDetailsContainer) {
      console.error("Movie details container not found.");
      return;
    }
  
    movieDetailsContainer.innerHTML = `
      <h2>${movie.title}</h2>
      <p>Year: ${movie.year}</p>
      <p>Genre: ${movie.genre}</p>
      <p>Rating: ${movie.rating}</p>
      <p>Description: ${movie.description}</p>
      
      <!-- Buttons for downloading and adding to favorites -->
       <button id="download-movie-btn">Download  </button>
      <button id="add-favorite-btn">Add to Favorites</button>
    `;
  
    // Attach download event listener
    const downloadBtn = document.getElementById('download-movie-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', function() {
        downloadMovie(movie);
      });
    } else {
      console.error("Download button not found.");
    }
  
    // Attach add to favorites event listener
    const addToFavoritesBtn = document.getElementById('add-favorite-btn');
    if (addToFavoritesBtn) {
      addToFavoritesBtn.addEventListener('click', function() {
        addToFavorites(movie);
      });
    } else {
      console.error("Add to Favorites button not found.");
    }
  }

  function resetSearch() {
    document.getElementById('search').value = '';
    document.getElementById('movie-details').innerHTML = '';
  }
  
  let Favorites = [];
  // Function to add movie to favorites
const favorites = [];

function addToFavorites(movie) {
  if (favorites.some(fav => fav.id === movie.id)) {
    alert("This movie is already in your favorites!");
  } else {
    favorites.push(movie);
    alert(`${movie.title} has been added to your favorites!`);
    displayFavorites();
  }
}

// Function to download movie 
function downloadMovie(movie) {
  const movieData = `
    Title: ${movie.title}
    Year: ${movie.year}
    Genre: ${movie.genre}
    Rating: ${movie.rating}
    Description: ${movie.description}
  `;

  const blob = new Blob([movieData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${movie.title}-info.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // Alert to notify the user
  alert(`${movie.title} has been downloaded!`);
}


  function displayFavorites() {
    const favoriteContainer = document.getElementById('favorite-movies');
    
    // If no favorites, display a message
    if (favorites.length === 0) {
      favoriteContainer.innerHTML = '<p>No favorite movies yet.</p>';
      return;
    }
    
    // Loop through the favorites array and create HTML for each movie
    favoriteContainer.innerHTML = favorites.map(movie => `
      <div>
        <strong>${movie.title}</strong> (${movie.year})
        <button onclick="removeFromFavorites(${movie.id})">Remove</button>
      </div>
    `).join('');  // Join the array into a single string of HTML
    }  
  
function removeFromFavorites(movieId) {
  // Filter out the movie with the matching ID
  favorites = favorites.filter(fav => fav.id !== movieId);
  //update the displayed favourites
  displayFavorites();  
}
let movieData = {};

// Fetch data from db.json 
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    movieData = data;
  })
  .catch(error => console.log('Error:', error));

  