import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';

import { searchedMoviesSelector } from 'redux/selectors/searchedMoviesSelector';
import { useSearchedMoviesMutation } from 'hooks/useSearchedMoviesMutation';
import { errorMessageSelector } from 'redux/selectors/errorMessageSelector';

import BaseLayout from 'components/Layouts/BaseLayout';

import classes from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { EPathsEnum } from 'enums/PathsEnum';

const Home: FC = () => {
  const navigate = useNavigate();
  const searchedMovies = useSelector(searchedMoviesSelector);
  const errorMessage = useSelector(errorMessageSelector);
  const { isLoading } = useSearchedMoviesMutation();

  if (errorMessage !== null) {
    return <div>{errorMessage}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BaseLayout>
      {searchedMovies?.length <= 0 ? (
        <div>Movies will show up here...</div>
      ) : (
        <div className={classes.cards}>
          {searchedMovies?.map(({ Poster, Title, Year, imdbID }) => (
            <Card
              key={imdbID}
              hoverable
              className={classes.cards__item}
              cover={<img alt={Title} src={Poster} />}
              onClick={() => navigate(`${EPathsEnum.MOVIE_DETAILS}${imdbID}`)}
            >
              <Meta title={Title} description={Year} />
            </Card>
          ))}
        </div>
      )}
    </BaseLayout>
  );
};

export default Home;
