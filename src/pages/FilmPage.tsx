import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../utlis/api';
import Rating from '../components/Rating';

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

  const convertWatchingTime = (minutes: number) => {
    let hours = 0;
    while (minutes > 60) {
      minutes -= 60;
      hours++;
    }

    return `${hours} ч. ${minutes} мин.`;
  };

  console.log(filmData);

  return filmIsLoading ? (
    <p>Loading...</p>
  ) : isError ? (
    <p>Error</p>
  ) : (
    <>
      <h2 className='film__name'>{filmData.nameRu}</h2>
      <div className='film__content'>
        <div className='film__container'>
          <div id='yohoho' data-kinopoisk={`${id}`}></div>
        </div>
        <ul className='film__info'>
          <p className='film__info-title'>Информация о фильме:</p>

          {filmData.nameOriginal && (
            <li className='film__info-item'>
              <p className='film__info-name film__info-name_lang_en'>
                Оригинальное название: {filmData.nameOriginal || filmData.nameEn}
              </p>
            </li>
          )}

          {filmData.year && filmData.type === 'FILM' && (
            <li className='film__info-item'>
              <p className='film__info-year'>Год выпуска: {filmData.year}</p>
            </li>
          )}

          {filmData.type === 'TV_SERIES' && (
            <li className='film__info-item'>
              <p className='film__info-year'>
                Год выпуска: {filmData.startYear} - {filmData.endYear ? filmData.endYear : '...'}
              </p>
            </li>
          )}

          {filmData.countries && (
            <li className='film__info-item'>
              <p className='film__info-countries'>
                Страны: <span>{filmData.countries.map((e) => e.country).join(', ')}</span>
              </p>
            </li>
          )}

          {filmData.genres && (
            <li className='film__info-item'>
              <p className='film__info-genres'>
                Жанры: <span>{filmData.genres.map((e) => e.genre).join(', ')}</span>
              </p>
            </li>
          )}

          {filmData.type === 'FILM' && (
            <li className='film__info-item'>
              <p className='film__info-time'>
                Время просмотра: {convertWatchingTime(parseInt(filmData.filmLength || '0'))}
              </p>
            </li>
          )}

          {(filmData.ratingKinopoisk || filmData.ratingImdb) && (
            <li className='film__info-item'>
              <div className='film__ratings-container'>
                {filmData.ratingKinopoisk && (
                  <div className='film__rating-item'>
                    <p className='film__rating-count'>
                      {<Rating rating={filmData.ratingKinopoisk} place='filmPage' />}
                    </p>

                    <p className='film__rating-source'>Рейтинг Кинопоиск</p>
                  </div>
                )}

                {filmData.ratingImdb && (
                  <div className='film__rating-item'>
                    <p className='film__rating-count'>
                      {<Rating rating={filmData.ratingImdb} place='filmPage' />}
                    </p>

                    <p className='film__rating-source'>Рейтинг Imdb</p>
                  </div>
                )}
              </div>
            </li>
          )}
        </ul>
        <div className='film__rating'></div>
      </div>
      <p className='film__description-title'>Описание:</p>
      <p className='film__description'>{filmData.description}</p>
    </>
  );
};

export default FilmPage;
