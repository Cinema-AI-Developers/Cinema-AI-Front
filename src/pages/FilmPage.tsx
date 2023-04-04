import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Rating from '../components/Rating';
import { api } from '../utlis/api';
import { GPTapi, Role } from '../utlis/GPTapi';

const convertWatchingTime = (minutes: number) => {
  let hours = 0;
  while (minutes > 60) {
    minutes -= 60;
    hours++;
  }

  return `${hours} ч. ${minutes} мин.`;
};

const FilmPage = () => {
  const { id } = useParams();

  const {
    data: filmData,
    isLoading: filmIsLoading,
    isError,
  } = useQuery({
    queryKey: ['film', { id }],
    queryFn: () => api.getFilmById(id),
    onSuccess: (data) => getFilmDescription(data.description || ''),
  });

  const { data: filmDescription, mutate: getFilmDescription } = useMutation({
    mutationFn: (originalDescription: string) =>
      GPTapi.sendMessageChatGPT(
        `Фильм: ${filmData?.nameRu}; Описание: ${originalDescription}`,
        Role.ILYADESCRIPTION
      ), //GPTapi.sendTextGPT3(originalDescription),
    onSuccess: (data) => {
      console.log(data, 'ss');
    },
  });

  useEffect(() => {});

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
    <p>Загрузка...</p>
  ) : isError ? (
    <p>Ошибка :(</p>
  ) : (
    <>
      <h2 className='film__name'>{filmData.nameRu}</h2>
      <div className='film__content'>
        <section className='film__main-container'>
          <div className='film__container'>
            <div id='yohoho' data-kinopoisk={`${id}`}></div>
          </div>

          <div className='film__description-container'>
            <p className='film__description-title'>Описание:</p>
            <p className='film__description'>{filmDescription || filmData.description}</p>
          </div>
        </section>

        <aside className='film__aside-container'>
          <ul className='film__info'>
            <p className='film__info-title'>
              Информация о {filmData.type === 'TV_SERIES' ? 'сериале' : 'фильме'}:
            </p>

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

          <div className='film__user-rating-container'>
            <p>Оценки</p>
          </div>
        </aside>
      </div>
    </>
  );
};

export default FilmPage;
