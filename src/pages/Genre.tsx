import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { api } from '../utlis/api';

const Genre = () => {
  const params = useParams();
  const id = params.id;

  const query = useQuery({
    queryKey: ['genre', { id }],
    queryFn: () => api.getGenresById(),
  });

  console.log(query.data);

  return <>Got:</>;
};

export default Genre;
