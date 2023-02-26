import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { api } from '../utlis/api';

const Film = () => {
  const params = useParams();
  const id = params.id;

  const query = useQuery({
    queryKey: ['film', { id }],
    queryFn: (id) => api.getFilm(id),
  });

  return <>Got: {query.data}</>;
};

export default Film;
