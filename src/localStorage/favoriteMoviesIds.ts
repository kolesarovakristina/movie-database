const KEY = 'favoriteMoviesIds';

export const setFavoriteMoviesIds = (id: string) => {
  localStorage.setItem(KEY, id);
};

export const getFavoriteMoviesIds = () => {
  return window.localStorage.getItem(KEY);
};
