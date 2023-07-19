import { FC, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from 'routes/Home';

import MainLayout from 'components/Layouts/MainLayout';
import Loading from 'components/Loading';
import ErrorBoundary from 'components/ErrorBoundary';

import 'styles/_base.scss';
import { EPathsEnum } from 'enums/PathsEnum';

const fallback = <Loading />;

const App: FC = () => {
  const MovieDetail = lazy(() => import('routes/MovieDetail'));
  const FavoriteMovies = lazy(() => import('routes/FavoriteMovies'));

  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: EPathsEnum.HOME,
          element: (
            <Suspense fallback={fallback}>
              <Home />
            </Suspense>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: EPathsEnum.MOVIE_DETAILS,
          element: (
            <Suspense fallback={fallback}>
              <MovieDetail />
            </Suspense>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: EPathsEnum.FAVORITE_MOVIES,
          element: (
            <Suspense fallback={fallback}>
              <FavoriteMovies />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
