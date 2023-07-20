import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';

import { searchedMoviesSelector } from 'redux/selectors/searchedMoviesSelector';
import { useSearchedMoviesMutation } from 'hooks/useSearchedMoviesMutation';
import { errorMessageSelector } from 'redux/selectors/errorMessageSelector';

import BaseLayout from 'components/Layouts/BaseLayout';
import CustomImage from 'components/CustomImage';
import Loading from 'components/Loading';

import classes from './Home.module.scss';

const Home: FC = () => {
  const navigate = useNavigate();
  const searchedMovies = useSelector(searchedMoviesSelector);
  const errorMessage = useSelector(errorMessageSelector);
  const { isLoading } = useSearchedMoviesMutation();

  if (isLoading) {
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

  return (
    <BaseLayout>
      {searchedMovies?.length <= 0 ? (
        <div className={classes.empty}>
          <SmileOutlined style={{ fontSize: '3rem' }} />
          Your searched movies will show up here...
        </div>
      ) : (
        <div>
          <div className={classes.results}>
            Results for <b>'batman'</b>
          </div>
          <div className={classes.cards}>
            {searchedMovies?.map(({ Poster, Title, Year, imdbID }) => (
              <Card
                key={imdbID}
                hoverable
                className={classes.cards__item}
                cover={<CustomImage alt={Title} src={Poster} height="35rem" />}
                onClick={() => navigate(`/movie-details/${imdbID}`)}
              >
                <Card.Meta title={Title} description={Year} />
              </Card>
            ))}
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default Home;
