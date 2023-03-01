import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api, TopTypes } from '../utlis/api';
import Card from '../components/Card';

const TopList = () => {
  const { type, page } = useParams();

  const { data: filmsData, isLoading: filmsLoading } = useQuery({
    queryKey: ['top', { type, page }],
    queryFn: () => api.getTopFilms(type as TopTypes, parseInt(page || '1')).then((res) => res.data),
  });

  return (
    <>
      <div className='cards-container'>
        {filmsLoading ? (
          <p>loading</p>
        ) : (
          filmsData?.films.map((filmInfo) => (
            <Card
              key={filmInfo.filmId}
              title={filmInfo.nameRu}
              imgUrl={filmInfo.posterUrlPreview}
              rating={filmInfo.rating}
              year={filmInfo.year}
              filmLength={filmInfo.filmLength}
            />
          ))
        )}
      </div>
    </>
  );
};

export default TopList;
