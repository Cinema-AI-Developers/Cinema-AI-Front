import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../utlis/api';
import GenreLine from '../components/GenreLine';
import CardSkeleton from '../components/CardSkeleton';
import { useResize } from '../hooks/useResize';
import { useEffect, useState } from 'react';

const genres = [16, 25, 28];

function Home() {
  const {
    data: filters,
    isLoading: filterLoading,
    isError: filterLoadingError,
  } = useQuery({
    queryKey: ['filter'],
    queryFn: () => api.getFilters(),
  });
  console.log(filters);

  const size = useResize();
  const [cardsCount, setCardsCount] = useState(0);

  useEffect(() => {
    if (size) {
      if (size.width < 1020) {
        setCardsCount(6);
      } else {
        setCardsCount(Math.floor(size?.width / 300));
      }
    }
  }, []);

  useEffect(() => {
    if (size) {
      if (size.width < 1020) {
        setCardsCount(6);
      } else {
        setCardsCount(Math.floor(size?.width / 300));
      }
    }
  }, [size]);

  return (
    <>
      <div className='top-link__block'>
        <Link to='/top/TOP_250_BEST_FILMS/1' className='top-link'>
          Топ 250 фильмов
        </Link>
        <Link to='/top/TOP_100_POPULAR_FILMS/1' className='top-link top-link_last'>
          Топ 100 популярных фильмов
        </Link>
      </div>

      {filterLoading || filterLoadingError ? (
        <>
          {[...Array(31)].map((i) => (
            <section className='genre-line' key={i}>
              <div className='genre-line__title-skeleton'></div>

              <div className='genre-line__container'>
                {[...Array(cardsCount)].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </section>
          ))}
        </>
      ) : (
        <>
          {filters?.genres
            .filter((genre) => !genres.includes(genre.id))
            .map((genre) => {
              return (
                <GenreLine
                  key={genre.id}
                  genreId={genre.id}
                  genreName={genre.genre.slice(0, 1).toUpperCase() + genre.genre.slice(1)}
                  cardsCount={cardsCount}
                />
              );
            })}
        </>
      )}
    </>
  );
}

export default Home;
