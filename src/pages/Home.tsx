import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../utlis/api';
import GenreLine from '../components/GenreLine';
import CardSkeleton from '../components/CardSkeleton';

const genres = [25, 28];

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
                {[...Array(5)].map((i) => (
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
                />
              );
            })}
        </>
      )}
    </>
  );
}

export default Home;
