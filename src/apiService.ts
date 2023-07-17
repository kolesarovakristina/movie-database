import axios from 'axios';

const API_KEY = 'a2862a93';
const URL = `http://omdbapi.com/?apikey=${API_KEY}`;

const getSearchedMovies = async (movieTitle: string) => {
  try {
    const data = await axios.get(`${URL}&s=${movieTitle}`).then(({ data }) => {
      return data;
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const ApiService = {
  getSearchedMovies,
};

export default ApiService;
