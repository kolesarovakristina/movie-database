import axios from 'axios';

import { TData } from 'types/MovieDataType';

const API_KEY = process.env.REACT_APP_API_KEY || '';
const URL = `https://omdbapi.com/?apikey=${API_KEY}`;

const getSearchedMovies = async (params: {
  movieTitle: string;
  page: number;
}): Promise<TData | undefined> => {
  try {
    const data = await axios
      .get(`${URL}&s=${params.movieTitle}&page=${params.page}`)
      .then(({ data }) => {
        return data;
      });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const getMovieDetails = async (movieId: string) => {
  try {
    const data = await axios.get(`${URL}&i=${movieId}`).then(({ data }) => {
      return data;
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const ApiService = {
  getSearchedMovies,
  getMovieDetails,
};

export default ApiService;
