import { FC, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from 'routes/Home';

import MainLayout from 'components/Layouts/MainLayout';
import Loading from 'components/Loading';
import ErrorBoundary from 'components/ErrorBoundary';

import 'styles/_base.scss';

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
          path: '/',
          element: (
            <Suspense fallback={fallback}>
              <Home />
            </Suspense>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: 'movie-detail',
          element: (
            <Suspense fallback={fallback}>
              <MovieDetail />
            </Suspense>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: 'favorite-movies',
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
