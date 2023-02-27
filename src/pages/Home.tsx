import { useQuery } from '@tanstack/react-query';
import { api } from '../utlis/api';

import Card from '../components/Card';

function Home() {
  const { data: filmsData, isLoading: filmsLoading } = useQuery({
    queryKey: ['top'],
    queryFn: () => api.getTopFilms('TOP_250_BEST_FILMS', 1).then((res) => res.data),
  });

  return (
    <>
      <div className='cards-container'>
        {filmsLoading ? (
          <p>loading</p>
        ) : (
          filmsData?.films?.map((filmInfo) => (
            <Card
              key={filmInfo.filmId}
              title={filmInfo.nameRu}
              imgUrl={filmInfo.posterUrl}
              rating={filmInfo.rating}
              year={filmInfo.year}
              filmLength={filmInfo.filmLength}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Home;
