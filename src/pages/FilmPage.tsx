import React from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../utlis/api';
import ReactDOM from 'react-dom';

const FilmPage = () => {
  const { id } = useParams();

  const {
    data: filmData,
    isLoading: filmIsLoading,
    isError,
  } = useQuery({
    queryKey: ['film', { id }],
    queryFn: async () => await api.getFilmById(id),
  });

  const container = React.useRef(null);

  useEffect(() => {
    console.log(container.current);
    const film = <div id='yohoho' data-kinopoisk={`${filmData?.filmId}`}></div>;
    //let film = document.createElement('div');
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://yohoho.cc/yo.js';
    //ReactDOM.render(film, container);
  }, []);

  return filmIsLoading ? (
    <p>Loading...</p>
  ) : isError ? (
    <p>Error</p>
  ) : (
    <>
      <h2 className='film__name'>{filmData.nameRu}</h2>
      <div className='film__container' ref={container}></div>
    </>
  );
};

export default FilmPage;
