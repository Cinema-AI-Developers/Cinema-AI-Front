import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import { api, FilmResponse } from '../utlis/api';

const SearchPage = () => {
  let { keyword, page } = useParams();

  const {
    data: searchData,
    isLoading: searchLoading,
    isError,
  } = useQuery({
    queryKey: ['search', { keyword, page }],
    queryFn: () => api.searchFilm(keyword || '', parseInt(page || '1')),
  });

  console.log(searchData);

  const pageInt = parseInt(page || '1');

  return searchLoading ? (
    <p>loading</p>
  ) : isError ? (
    <p>Error</p>
  ) : (
    searchData && (
      <>
        <div className='cards-container'>
          {searchData.films.map((filmInfo: FilmResponse) => (
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

        {/* {pagesCount && <PageNavigation pagesCount={pagesCount} page={pageInt} type={type} />} */}
      </>
    )
  );
};

export default SearchPage;
