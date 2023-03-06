import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../utlis/api';

const FilmPage = () => {
  const { id } = useParams();

  const {
    data: filmData,
    isLoading: filmIsLoading,
    isError,
  } = useQuery({
    queryKey: ['film', { id }],
    queryFn: () => api.getFilmById(id),
  });

  useEffect(() => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//yohoho.cc/yo.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  });

  return filmIsLoading ? (
    <p>Loading...</p>
  ) : isError ? (
    <p>Error</p>
  ) : (
    <>
      <h2 className='film__name'>{filmData.nameRu}</h2>
      <div className='film__container'>
        <div id='yohoho' data-kinopoisk={`${id}`}></div>
      </div>
    </>
  );
};

export default FilmPage;
