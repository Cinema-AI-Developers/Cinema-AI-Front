import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import { api, FilmResponse } from '../utlis/api';
import CardSkeleton from '../components/CardSkeleton';

const SearchPage = () => {
  let { keyword, page } = useParams();
  const [inputKeyword, setInputKeyword] = useState<string>(keyword || '');

  useEffect(() => {
    setInputKeyword(keyword || '');
  }, [keyword, page]);

  const {
    data: searchData,
    isLoading: searchLoading,
    isError,
  } = useQuery({
    queryKey: ['search', { inputKeyword, page }],
    queryFn: () => api.searchFilm(inputKeyword, parseInt(page || '1')),
  });

  return searchLoading ? (
    <>
      <h2 style={{ marginBottom: 40 }}>{'Ключевое слово: ' + inputKeyword}</h2>
      <div className='cards-container'>
        {[...Array(20)].map((i) => {
          return <CardSkeleton key={i} />;
        })}
      </div>
    </>
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
