import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utlis/api';

function Home() {
  const query = useQuery({
    queryKey: ['top'],
    queryFn: () => {
      api.getTopFilms();
    },
  });

  console.log(query.data);

  return (
    <>
      <div className='App'>Home</div>
      <Link to={'/film/123'}>open</Link>
    </>
  );
}

export default Home;
