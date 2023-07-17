import { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'antd';

import { useSearchedMoviesMutation } from 'hooks/useSearchedMoviesMutation';
import { setSearchedMovies } from 'redux/reducers/searchedMoviesSlice';
import { setErrorMessage } from 'redux/reducers/errorMessageSlice';

import classes from './Header.module.scss';

enum EErrorMessageEnum {
  ERROR = 'False',
  NOT_FOUND_MESSAGE = 'Movie not found!',
}

const Header: FC = () => {
  const movieTitle = useRef(null);
  const dispatch = useDispatch();
  const { mutate } = useSearchedMoviesMutation();

  const getSearchedMovies = () => {
    mutate(movieTitle.current.input.value as string, {
      onSuccess: data => {
        if (data.Response === EErrorMessageEnum.ERROR) {
          dispatch(setErrorMessage(EErrorMessageEnum.NOT_FOUND_MESSAGE));
        } else {
          dispatch(setErrorMessage(null));
          dispatch(setSearchedMovies(data?.Search));
        }
      },
    });
  };

  return (
    <div className={classes.wrapper}>
      <Input.Search
        placeholder="Search movie"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={getSearchedMovies}
        ref={movieTitle}
      />
    </div>
  );
};

export default Header;
