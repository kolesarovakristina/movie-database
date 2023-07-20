import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ApiService from 'apiService';

import { QueryKeys } from 'constants/queryKeys';

import { setTotalResults } from 'redux/reducers/currentSearchedResultsSlice';
import { setErrorMessage } from 'redux/reducers/errorMessageSlice';

import { EErrorMessageEnum } from 'enums/ErrorMessageEnum';
import { EApiActionsEnum } from 'enums/ApiActionsEnum';

export const useSearchedMoviesQuery = (movieTitle: string, page: number) => {
  const dispatch = useDispatch();

  return useQuery({
    enabled: Boolean(movieTitle),
    queryKey: QueryKeys.GET_MOVIES(movieTitle, page),
    queryFn: () => ApiService.getSearchedMovies({ movieTitle, page }),

    onSuccess: data => {
      if (data?.Response === `${EApiActionsEnum.NOT_FETCHED}`) {
        dispatch(setErrorMessage(EErrorMessageEnum.NOT_FOUND_MESSAGE));

        return;
      }

      dispatch(setErrorMessage(null));
      dispatch(setTotalResults(data!.totalResults));
    },

    onError: error => dispatch(setErrorMessage(error)),
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};
