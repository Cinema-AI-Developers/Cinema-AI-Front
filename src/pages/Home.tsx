import { useQuery } from '@tanstack/react-query';
import { api } from '../utlis/api';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Link to='/top/TOP_250_BEST_FILMS/1'>Топ 250 фильмов</Link>
      <Link to='/top/TOP_100_POPULAR_FILMS/1'>Топ 100 популярных фильмов</Link>
      <Link to='/top/TOP_AWAIT_FILMS/1'>Топ самых ожидаемых кинопремьер</Link>
    </>
  );
}

export default Home;
