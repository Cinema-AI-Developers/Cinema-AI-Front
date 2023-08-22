import { useQuery } from '@tanstack/react-query';
import { api } from '../utlis/api';
import Card from '../components/Card';
import CardSkeleton from './CardSkeleton';
import { useState, useEffect } from 'react';

interface GenreLineProps {
  genreId: number;
  genreName: string;
  cardsCount: number;
}

export default function GenreLine({ genreId, genreName, cardsCount }: GenreLineProps) {
  const {
    data: films,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['filminfo', genreId],
    queryFn: () => api.getFilmsByFilter(genreId),
  });

  return isLoading || isError ? (
    <section className='genre-line'>
      <h3 className='genre-line__title'>{genreName}</h3>

      <div className='genre-line__container'>
        {[...Array(cardsCount)].map((i) => {
          return <CardSkeleton key={i} />;
        })}
      </div>
    </section>
  ) : (
    films && (
      <section className='genre-line'>
        <h3 className='genre-line__title'>{genreName}</h3>

        <div className='genre-line__container'>
          {films.items
            .filter((filmInfo) => filmInfo.nameRu)
            .map((filmInfo) => {
              return (
                <Card
                  key={filmInfo.kinopoiskId}
                  title={filmInfo.nameRu}
                  imgUrl={filmInfo.posterUrlPreview}
                  rating={filmInfo.ratingKinopoisk}
                  year={filmInfo.year}
                  filmLength={filmInfo.filmLength}
                  filmId={filmInfo.kinopoiskId}
                />
              );
            })
            .slice(0, cardsCount)}
        </div>
      </section>
    )
  );
}
