import { FC, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UseQueryResult, useQueries } from '@tanstack/react-query';
import { Card, Tooltip } from 'antd';
import { StarFilled, ProfileFilled } from '@ant-design/icons';

import ApiService from 'apiService';

import { QueryKeys } from 'constants/queryKeys';
import { COLORS } from 'constants/colors';
import { TMovieDataType } from 'types/MovieDataType';
import { ETooltipEnum } from 'enums/TooltipEnum';

import { favoriteMoviesIdsSelector } from 'redux/selectors/favoriteMoviesIdsSelector';
import { removeFromFavorites } from 'redux/reducers/favoriteMoviesIdsSlice';

import BaseLayout from 'components/Layouts/BaseLayout';
import LoadingSkeleton from 'components/Loading/LoadingSkeleton';
import CustomImage from 'components/CustomImage';

import classes from './FavoriteMovies.module.scss';

type TMovieQueryResult = UseQueryResult<TMovieDataType, unknown>;

const FavoriteMovies: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favoriteMoviesIds = useSelector(favoriteMoviesIdsSelector);

  const favoriteMoviesQuery = useQueries({
    queries: favoriteMoviesIds.map((id: string) => ({
      queryKey: QueryKeys.MOVIE_DETAILS(id),
      queryFn: () => ApiService.getMovieDetails(id),
      cacheTime: Infinity,
      staleTime: Infinity,
    })),
  }) as TMovieQueryResult[];

  return (
    <BaseLayout>
      <div className={classes.wrapper}>
        {favoriteMoviesQuery?.map(({ data, isLoading }, index) => (
          <Fragment key={data?.imdbID ?? index}>
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <Card
                onClick={() => navigate(`/movie-details/${data?.imdbID}`)}
                hoverable
                className={classes.wrapper__card}
                cover={
                  <CustomImage
                    alt={data?.Title}
                    src={data?.Poster}
                    height="35rem"
                  />
                }
                actions={[
                  <Tooltip title={ETooltipEnum.REMOVE_FAVORITES_TOOLTIP}>
                    <StarFilled
                      onClick={event => {
                        event.stopPropagation();
                        dispatch(removeFromFavorites(data?.imdbID));
                      }}
                      style={{ fontSize: '2rem', color: COLORS.YELLOW }}
                    />
                  </Tooltip>,
                  <Tooltip title={ETooltipEnum.VIEW_DETAILS_TOOLTIP}>
                    <ProfileFilled
                      onClick={() => navigate(`/movie-details/${data?.imdbID}`)}
                    />
                  </Tooltip>,
                ]}
              >
                <Card.Meta title={data?.Title} description={data?.Year} />
              </Card>
            )}
          </Fragment>
        ))}
      </div>
    </BaseLayout>
  );
};

export default FavoriteMovies;
