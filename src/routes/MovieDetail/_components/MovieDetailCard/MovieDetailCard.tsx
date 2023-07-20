import { FC } from 'react';
import { Badge, Descriptions } from 'antd';

import { TMovieDetailsProps } from 'types/MovieDetailsType';

import FavoriteIcon from 'components/FavoriteIcon';
import CustomImage from 'components/CustomImage';

import classes from './MovieDetailCard.module.scss';

enum EMovieDetailEnum {
  WRITERS = 'WRITERS',
  ACTORS = 'ACTORS',
  DIRECTORS = 'DIRECTOR',
}

type TMovieDetailCardProps = TMovieDetailsProps & {
  addToFavorites: () => void;
  removeFromFavorites: () => void;
  isMovieAddedToFavorite: boolean;
};

const getSplittedGenres = (genres: string) => genres?.split(', ');

const MovieDetailCard: FC<TMovieDetailCardProps> = ({
  genre,
  poster,
  title,
  imdbRating,
  year,
  runtime,
  plot,
  director,
  writer,
  actors,
  addToFavorites,
  removeFromFavorites,
  isMovieAddedToFavorite,
}) => {
  const genres = getSplittedGenres(genre);

  return (
    <div className={classes.wrapper}>
      <CustomImage alt={title} src={poster} height="40rem" />
      <div className={classes.items}>
        <div className={classes.header}>
          <div className={classes.header__title}>{title}</div>
          <div className={classes.header__rating}>
            <FavoriteIcon
              isMovieAddedToFavorite={isMovieAddedToFavorite}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
            />

            <div>
              <span className={classes['header__rating-number']}>
                {imdbRating}
              </span>
              /10
            </div>
          </div>
        </div>

        <div className={classes.items__badges}>
          {genres?.map((title: string) => (
            <Badge size="default" count={title} key={title}></Badge>
          ))}
        </div>

        <div className={classes.items__year}>
          {year}&nbsp;•&nbsp;{runtime}
        </div>
        <div className={classes.items__plot}>{plot} </div>

        <Descriptions column={1}>
          <Descriptions.Item label={EMovieDetailEnum.DIRECTORS}>
            {director}
          </Descriptions.Item>
          <Descriptions.Item label={EMovieDetailEnum.WRITERS}>
            {writer}
          </Descriptions.Item>
          <Descriptions.Item label={EMovieDetailEnum.ACTORS}>
            {actors}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default MovieDetailCard;
