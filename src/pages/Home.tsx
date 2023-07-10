import { useQuery } from '@tanstack/react-query';
import { api } from '../utlis/api';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

function Home() {
  const {
    data: filmData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['film'],
    queryFn: () => api.getFilmById('160958'),
  });

  return (
    <>
      <Link to='/top/TOP_250_BEST_FILMS/1' className='top-link'>
        Топ 250 фильмов
      </Link>
      <Link to='/top/TOP_100_POPULAR_FILMS/1' className='top-link top-link_last'>
        Топ 100 популярных фильмов
      </Link>
      {isError ? (
        <p>error</p>
      ) : isLoading ? (
        <p>loading</p>
      ) : (
        <Card
          key={filmData.filmId}
          title={filmData.nameRu}
          imgUrl={filmData.posterUrlPreview}
          rating={filmData.rating}
          year={filmData.year}
          filmLength={filmData.filmLength}
          filmId={160958}
        />
      )}
    </>
  );
}

export default Home;
