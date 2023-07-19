import { FC, useRef, MutableRefObject } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';
import { HeartFilled } from '@ant-design/icons';

import { COLORS } from 'constants/colors';
import { EPathsEnum } from 'enums/PathsEnum';

import { useSearchedMoviesMutation } from 'hooks/useSearchedMoviesMutation';
import { useMediaQuery } from 'hooks/useMediaQuery';

import { setSearchedMovies } from 'redux/reducers/searchedMoviesSlice';
import { setErrorMessage } from 'redux/reducers/errorMessageSlice';

import classes from './Header.module.scss';

enum EErrorMessageEnum {
  ERROR = 'False',
  NOT_FOUND_MESSAGE = "Oops! We can't seem to find the movie you're looking for.",
}

type TInputInstance = {
  input: {
    value: string;
  };
};

const Header: FC = () => {
  const movieTitle = useRef<TInputInstance | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate } = useSearchedMoviesMutation();
  const isDesktopResolution = useMediaQuery('(min-width: 736px)');

  const getSearchedMovies = () => {
    if (EPathsEnum.MOVIE_DETAILS || EPathsEnum.FAVORITE_MOVIES) {
      navigate(EPathsEnum.HOME);
    }

    mutate(movieTitle.current?.input.value as string, {
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
      <div
        className={classes.wrapper__logo}
        onClick={() => navigate(EPathsEnum.HOME)}
      >
        MOVIE DATABASE
      </div>

      <Input.Search
        placeholder="Search movie"
        allowClear
        enterButton="Search"
        size="middle"
        onSearch={getSearchedMovies}
        ref={movieTitle as MutableRefObject<null>}
      />

      {isDesktopResolution ? (
        <Button
          type="link"
          className={classes.wrapper__button}
          onClick={() => navigate(EPathsEnum.FAVORITE_MOVIES)}
        >
          Favorite Movies
        </Button>
      ) : (
        <HeartFilled
          onClick={() => navigate(EPathsEnum.FAVORITE_MOVIES)}
          style={{ fontSize: '3rem', color: COLORS.RED }}
        />
      )}
    </div>
  );
};

export default Header;
