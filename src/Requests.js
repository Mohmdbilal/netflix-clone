const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
  requestTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  requestTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  requestPopular: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`,
  requestUpcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`,
  requestHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
};

export default requests;
