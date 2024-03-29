import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api, TopTypes } from '../utlis/api';
import Card from '../components/Card';
import PageNavigation from '../components/PageNavigation';
import CardSkeleton from '../components/CardSkeleton';

const TopList = () => {
  let { type, page } = useParams();

  const {
    data: filmsData,
    isLoading: filmsLoading,
    isError,
  } = useQuery({
    queryKey: ['top', { type, page }],
    queryFn: () => api.getTopFilms(type as TopTypes, parseInt(page || '1')).then((res) => res.data),
  });

  const pageInt = parseInt(page || '1');
  //обрез 15ти страниц в случае с топ 100 тк кол-во страниц не соотв действительности
  const pagesCount = type === 'TOP_100_POPULAR_FILMS' ? 20 : filmsData?.pagesCount;

  return filmsLoading ? (
    <div className='cards-container cards-container_place_top'>
      {[...Array(20)].map((i) => {
        return <CardSkeleton key={i} />;
      })}
    </div>
  ) : isError ? (
    <p>Error</p>
  ) : (
    filmsData && (
      <>
        <div className='cards-container cards-container_place_top'>
          {filmsData.films.map((filmInfo) => (
            <Card
              key={filmInfo.filmId}
              title={filmInfo.nameRu}
              imgUrl={filmInfo.posterUrlPreview}
              rating={filmInfo.rating}
              year={filmInfo.year}
              filmLength={filmInfo.filmLength}
              filmId={filmInfo.filmId}
            />
          ))}
        </div>

        {pagesCount && <PageNavigation pagesCount={pagesCount} page={pageInt} type={type} />}
      </>
    )
  );
};

export default TopList;
