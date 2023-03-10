import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { api } from '../utlis/api';

const Film = () => {
  const params = useParams();
  const id = params.id;

  const query = useQuery({
    queryKey: ['film', { id }],
    queryFn: () => api.getFilmById(id),
  });

  console.log(query.data);

  return <>Got:</>;
};

export default Film;
