import { useQuery } from '@tanstack/react-query';
import { api } from '../utlis/api';
import { Link } from 'react-router-dom';

import Card from '../components/Card';

function Home() {
  const { data: filmsData, isLoading: filmsLoading } = useQuery({
    queryKey: ['top'],
    queryFn: () => api.getTopFilms('TOP_250_BEST_FILMS', 1).then((res) => res.data),
  });

  return (
    <>
      <Link to='/top/TOP_250_BEST_FILMS/1'>Посмотреть топ 250 фильмов</Link>
    </>
  );
}

export default Home;
