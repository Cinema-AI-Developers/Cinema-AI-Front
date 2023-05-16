import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { api } from '../utlis/api';

function Home() {
  const {
    data: filmData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['film'],
    queryFn: () => api.getFilmById('361'),
  });
  const [inputKeyword, setInputKeyword] = useState<string>('');
  const navigate = useNavigate();

  return (
    <>
      <Link to='/top/TOP_250_BEST_FILMS/1' className='top-link'>
        Топ 250 фильмов
      </Link>
      <Link to='/top/TOP_100_POPULAR_FILMS/1' className='top-link top-link_last'>
        Топ 100 популярных фильмов
      </Link>

      <input
        placeholder='Название фильма'
        value={inputKeyword}
        onChange={(e) => setInputKeyword(e.target.value)}></input>
      <button onClick={() => navigate(`/search/${inputKeyword}/1`)} style={{ marginBottom: 20 }}>
        Поиск
      </button>

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
          filmId={361}
        />
      )}
    </>
  );
}

export default Home;
