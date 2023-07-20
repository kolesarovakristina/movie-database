import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useMovieDetailsQuery } from 'hooks/useMovieDetailsQuery';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from 'redux/reducers/favoriteMoviesIdsSlice';
import { favoriteMoviesIdsSelector } from 'redux/selectors/favoriteMoviesIdsSelector';

import BaseLayout from 'components/Layouts/BaseLayout';
import LoadingSkeleton from 'components/Loading/LoadingSkeleton';

import MovieDetailCard from './_components/MovieDetailCard';

import classes from './MovieDetail.module.scss';

const MovieDetail: FC = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { isLoading, data } = useMovieDetailsQuery(params.movieId!);
  const favoriteMoviesIds = useSelector(favoriteMoviesIdsSelector);

  const isMovieAddedToFavorite = favoriteMoviesIds.includes(data?.imdbID);

  if (isLoading) {
    return (
      <BaseLayout>
        <div className={classes.holder}>
          <LoadingSkeleton />
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className={classes.holder}>
        <MovieDetailCard
          genre={data?.Genre}
          poster={data?.Poster}
          title={data?.Title}
          imdbRating={data?.imdbRating}
          year={data?.Year}
          runtime={data?.Runtime}
          plot={data?.Plot}
          director={data?.Director}
          writer={data?.Writer}
          actors={data?.Actors}
          addToFavorites={() => dispatch(addToFavorites(data?.imdbID))}
          removeFromFavorites={() =>
            dispatch(removeFromFavorites(data?.imdbID))
          }
          isMovieAddedToFavorite={isMovieAddedToFavorite}
        />
      </div>
    </BaseLayout>
  );
};

export default MovieDetail;
