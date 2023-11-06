const tmdbKey = config.MY_API_KEY;
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');


//API calls
const getGenres =  async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch)
    if(response.ok){
      const jsonResponse = await response.json()
      const genres = jsonResponse.genres
      return genres
    }
  }catch (e) {
    console.log(e)
  }
};

// Random movie
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie'
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}$page=${randomPage}`
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams

  try{
    const response = await fetch(urlToFetch)
    if(response.ok){
      const jsonResponse = await response.json()
      const movie = jsonResponse.results
      return movie
    }
  }catch (e) {
    console.log(e)
  }
};




const getMovieInfo = async () => {
    const movieId = movie.id
    const movieEndpoint = `/movie/${movieId}`
    const requestParams = `?api_key=${tmdbKey}`
    const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams 

    try {
      const response = await fetch(urlToFetch);
      if(response.ok){
        const movieInfo = await response.json()
        return movieInfo
      }

    }catch (e) {
      console.log(e)
    }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async (person) => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  let movies
  if (person.length !== 0){
    movies = await getMoviesWithActor(person)
  }else{
    movies = await getMovies()
  }
  let randomMovie = getRandomMovie(movies)
  const info = await getMovieInfo(randomMoive)
  display(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;