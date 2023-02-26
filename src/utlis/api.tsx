const getFilm = (id: string | number | undefined) => {
  fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': import.meta.env.VITE_KINOPOISK_KEY,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
};

export const api = {
  getFilm,
};
