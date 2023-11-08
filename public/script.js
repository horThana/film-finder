const tmdbKey = '782f080e5f598419b9c97efe79d7ea7f';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');
const form = document.getElementById('form');
const select = document.getElementById('genreSelect');


///Load like/dislike buttons
function loadLikeMovies(){
const myLikeMovies = loadLikeMovies();
console.log(myLikeMovies);

const myDislikeMovies = loadDislikeMovies();
console.log(myDislikeMovies);

if(myLikeMovies){
  myLikeMovies.forEach((movie) => createLikeMovie(movie));
}

if(myDislikeMovies){
  myDislikeMovies.forEach((movie) => createDislikeMovie(movie));
}
};

// Fetch a list of genres from the API
const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  } catch(error) {
    console.log(error);
  }
}

//SeacrchPerson
  const searchPerson = async () => {
    const personEndpoint = "/search/person";
    const castInput = getCastValue();
    const requestParams = `?api_key=${tmdbKey}&query=${castInput}`;
    const urlToFetch = tmdbBaseUrl + personEndpoint + requestParams;

    try{
      const response = await fetch(urlToFetch);
      if(response.ok){
        const jsonResponse = await response.json();
        const person = jesonResponse.results;
        return person;
      }

    }catch (error) {
      console.log(error);
    }
  }

  //getMoviewithCast

  const getMoviesWithActor = async () => {
    const selectedGenre = getSelectedGenre();
    const castChoice = getCastValue();
    const discoverMovieEndpoint = "/discover/movie";
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&with_cast=${castChoice}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

    try{
      const response = await fetch(urlToFetch);
      if(response.ok){
        const jsonResponse = await response.json();
        const movies = jsonResponse.results;
        return movies;

      }
    }catch(error){
      console.log(error);
    }
  }

// Get a random movie
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = "/discover/movie";
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
  } catch(error) {
    console.log(error);
  }
};

// Get movie info
const getMovieInfo = async movie => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams =`?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse;
      return movieInfo;
    }
  } catch(error) {
    console.log(error);
  }
};

//getCast
const getCast = async movie =>{
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}/credits`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const movieCast = await response.json();
      const actorsNames = movieCast.cast
        .map((actor) => actor.name.trim())
        .slice(0, 3)
        .join(',');
      return actorsNames;

    }
  }catch(error) {
    console.log(error);
  
  }
}
let person = '';

// Gets a list of movies and displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  let movies
  if(person.length !== 0){
    movies = await getMoviesWithActor(person);
  }else{
    movies = await getMovies();
  
  }

 
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  const cast = await getCast(randomMovie);
  displayMovie(info, cast);
};

getGenres().then(populateGenreDropdown);

// Event listener for the play button
playBtn.addEventListener('click', showRandomMovie);

form.addEventListener('submit', (event) => {
  event.preventDefault()
  searchPerson().then((person) => {
    console.log(person);
    showRandomMovie();
  })
});