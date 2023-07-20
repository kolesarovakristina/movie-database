import { FC, useRef, MutableRefObject } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Space } from 'antd';
import { HeartFilled } from '@ant-design/icons';

import { COLORS } from 'constants/colors';
import { EPathsEnum } from 'enums/PathsEnum';
import { useMediaQuery } from 'hooks/useMediaQuery';

import {
  setPagination,
  setResultsAndTerm,
} from 'redux/reducers/currentSearchedResultsSlice';

import classes from './Header.module.scss';

type TInputInstance = {
  input: {
    value: string;
  };
};

const Header: FC = () => {
  const movieTitle = useRef<TInputInstance | null>(null);
  const [form] = Form.useForm();
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDesktopResolution = useMediaQuery('(min-width: 736px)');
  const isFavoriteMoviesPath = location.pathname.includes(
    EPathsEnum.FAVORITE_MOVIES
  );

  const getSearchedMovies = () => {
    if (EPathsEnum.MOVIE_DETAILS || EPathsEnum.FAVORITE_MOVIES) {
      navigate(EPathsEnum.HOME);
    }

    dispatch(
      setResultsAndTerm({
        searchedTerm: movieTitle.current!.input.value,
      })
    );

    dispatch(setPagination(1));

    form.resetFields();
  };

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.wrapper__logo}
        onClick={() => navigate(EPathsEnum.HOME)}
      >
        MOVIE DATABASE
      </div>

      <Form
        className={classes.form}
        form={form}
        initialValues={{ remember: true }}
        onFinish={getSearchedMovies}
      >
        <Form.Item
          name="movieName"
          rules={[{ required: true, message: 'Please enter movie name!' }]}
        >
          <Space.Compact className={classes.form__fields}>
            <Input
              placeholder="Search movie"
              ref={movieTitle as MutableRefObject<null>}
            />
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Space.Compact>
        </Form.Item>
      </Form>

      {!isFavoriteMoviesPath && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Header;
