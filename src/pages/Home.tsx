import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../utlis/api';

import Card from '../components/Card';

function Home() {
  const query = useQuery({
    queryKey: ['top'],
    queryFn: () => api.getTopFilms('TOP_250_BEST_FILMS', 1),
  });

  const cards = query.data?.data.films;

  return (
    <>
      <h2>Top 250 films</h2>
      <div className='cards-container'>
        {cards?.map((cardInfo) => (
          <Card key={cardInfo.filmId} title={cardInfo.nameRu} imgUrl={cardInfo.posterUrl} />
        ))}
      </div>
    </>
  );
}

export default Home;
