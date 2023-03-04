import axios from 'axios';

axios.defaults.baseURL = 'https://kinopoiskapiunofficial.tech/api';
axios.defaults.headers.common['X-API-KEY'] = import.meta.env.VITE_KINOPOISK_KEY;
axios.defaults.headers.post['Content-Type'] = 'application/json';

interface FilmResponse {
  filmId: number;
  nameRu?: string;
  nameEn?: string;
  year?: string;
  filmLength?: string;
  countries: [];
  genres: [];
  rating?: number;
  ratingVoteCount?: number;
  posterUrl: string;
  posterUrlPreview: string;
}

const getFilmById = (id: string | undefined) => {
  return axios.get<FilmResponse>(`/v2.2/films/${id}`).then((res) => res.data);
  /*
  return fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': import.meta.env.VITE_KINOPOISK_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
    */
};

interface TopFilmsResponse {
  pagesCount: number;
  films: FilmResponse[];
}

export type TopTypes = 'TOP_250_BEST_FILMS' | 'TOP_100_POPULAR_FILMS' | 'TOP_AWAIT_FILMS';

const getTopFilms = (type: TopTypes = 'TOP_250_BEST_FILMS', page: number = 1) => {
  return axios.get<TopFilmsResponse>(`/v2.2/films/top/?type=${type}&page=${page}`);
  /*
  return fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top/?type=${type}&page=${page}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': import.meta.env.VITE_KINOPOISK_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
  */
};

export const api = {
  getFilmById,
  getTopFilms,
  //getSimilarFilms,
  //getPremiers,
  //getFilters,
  //getFilms, // via filters like 'https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=0&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1' \
  //getPersons,
  //getStaff
  //getStaffById
  //getFilmsByKeyword
};
