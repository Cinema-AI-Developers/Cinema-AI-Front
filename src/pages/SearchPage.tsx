import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import { api, FilmResponse } from '../utlis/api';

const SearchPage = () => {
  let { keyword, page } = useParams();
  const [inputKeyword, setInputKeyword] = useState<string>(keyword || '');

  const {
    data: searchData,
    isLoading: searchLoading,
    isError,
  } = useQuery({
    queryKey: ['search', { inputKeyword, page }],
    queryFn: () => api.searchFilm(inputKeyword, parseInt(page || '1')),
  });

  console.log(searchData);

  //   const pageInt = parseInt(page || '1');

  return searchLoading ? (
    <p>loading</p>
  ) : isError ? (
    <p>Error</p>
  ) : (
    searchData && (
      <>
        <h2 style={{ marginBottom: 40 }}>{'Ключевое слово: ' + inputKeyword}</h2>
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
