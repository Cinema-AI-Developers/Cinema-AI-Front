import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../utlis/api';

const FilmPage = () => {
  const { id } = useParams();

  const {
    data: filmData,
    isLoading: filmIsLoading,
    isError,
  } = useQuery({
    queryKey: ['film', { id }],
    queryFn: () => api.getFilmById(id),
  });

  return filmIsLoading ? <p>Loading...</p> : isError ? <p>Error</p> : <p>{filmData.nameRu}</p>;
};

export default FilmPage;
