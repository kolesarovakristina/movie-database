import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Pagination } from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';

import { useSearchedMoviesQuery } from 'hooks/useSearchedMoviesQuery';
import { useGetFetchedQuery } from 'hooks/useGetFetchedQuery';
import { QueryKeys } from 'constants/queryKeys';
import { TData } from 'types/MovieDataType';
import { EApiActionsEnum } from 'enums/ApiActionsEnum';

import { errorMessageSelector } from 'redux/selectors/errorMessageSelector';
import { currentSearchedResultsSelector } from 'redux/selectors/currentSearchedResultsSelector';
import { setPagination } from 'redux/reducers/currentSearchedResultsSlice';

import BaseLayout from 'components/Layouts/BaseLayout';
import CustomImage from 'components/CustomImage';
import Loading from 'components/Loading';

import classes from './Home.module.scss';

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errorMessage = useSelector(errorMessageSelector);
  const { searchedTerm, pagination, totalResults } = useSelector(
    currentSearchedResultsSelector
  );

  const {
    data: searchedMovies,
    isLoading,
    fetchStatus,
  } = useSearchedMoviesQuery(searchedTerm, pagination);

  const data = useGetFetchedQuery(
    QueryKeys.GET_MOVIES(searchedTerm, pagination)
  ) as unknown as TData;

  if (!process.env.REACT_APP_API_KEY) {
    throw new Error('Missing api key, please provide new api key.');
  }

  if (isLoading && fetchStatus === EApiActionsEnum.FETCHING) {
    return <Loading />;
  }

  if (errorMessage !== null) {
    return (
      <BaseLayout>
        <div className={classes['no-data']}>
          <FrownOutlined style={{ fontSize: '3rem' }} />
          {errorMessage}
        </div>
      </BaseLayout>
    );
  }

  const searchedMoviesData = searchedMovies ? data : ([] as unknown as TData);

  return (
    <BaseLayout>
      {!searchedMovies ? (
        <div className={classes.empty}>
          <SmileOutlined style={{ fontSize: '3rem' }} />
          Your searched movies will show up here...
        </div>
      ) : (
        <div>
          <div className={classes.results}>
            Results for <b>{`"${searchedTerm}"`}</b>
          </div>
          <div className={classes.cards}>
            {searchedMoviesData?.Search?.map(
              ({ Poster, Title, Year, imdbID }) => (
                <Card
                  key={imdbID}
                  hoverable
                  className={classes.cards__item}
                  cover={
                    <CustomImage alt={Title} src={Poster} height="35rem" />
                  }
                  onClick={() => navigate(`/movie-details/${imdbID}`)}
                >
                  <Card.Meta title={Title} description={Year} />
                </Card>
              )
            )}
          </div>
          {searchedMovies ? (
            <Pagination
              responsive
              current={pagination}
              className={classes.pagination}
              defaultCurrent={pagination}
              total={
                Number(searchedMoviesData?.totalResults) ?? Number(totalResults)
              }
              onChange={page => dispatch(setPagination(page))}
            />
          ) : null}
        </div>
      )}
    </BaseLayout>
  );
};

export default Home;
