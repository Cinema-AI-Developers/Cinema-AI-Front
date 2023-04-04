import axios from 'axios';

axios.defaults.baseURL = 'https://kinopoiskapiunofficial.tech/api';
axios.defaults.headers.common['X-API-KEY'] = import.meta.env.VITE_KINOPOISK_API;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

interface Country {
  country: string;
}

interface Genre {
  genre: string;
}

export interface FilmResponse {
  filmId: number;
  nameRu?: string;
  nameEn?: string;
  year?: string;
  startYear: string;
  endYear: string;
  filmLength?: string;
  countries: Country[];
  genres: Genre[];
  rating?: number;
  ratingKinopoisk?: number;
  ratingImdb?: number;
  ratingVoteCount?: number;
  posterUrl: string;
  posterUrlPreview: string;
  nameOriginal?: string;
  description: string;
  type: string;
}

const getFilmById = (id: string | undefined) => {
  return axios.get<FilmResponse>(`/v2.2/films/${id}`).then((res) => res.data);
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
      'X-API-KEY': import.meta.env.VITE_KINOPOISK_API,
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
