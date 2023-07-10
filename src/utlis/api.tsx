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
  id: number;
}

export interface FilmResponse {
  filmId: number;
  kinopoiskId: number;
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

interface FilmSearchResponse {
  keyword: string;
  pagesCount: number;
  searchFilmsCountResult: number;
  films: FilmResponse[]; //не совсем, там вроде немного отличается
}

interface GenresResponce {
  genres: Genre[];
  countries: Country[];
}

interface FilterResponse {
  items: FilmResponse[];
  total: number;
  totalPages: number;
}

const getFilmById = (id: string | undefined) => {
  return axios.get<FilmResponse>(`/v2.2/films/${id}`).then((res) => res.data);
};

const searchFilm = (keyword: string, page: number = 1) => {
  return axios
    .get<FilmSearchResponse>(`/v2.1/films/search-by-keyword`, { params: { keyword, page } })
    .then((res) => res.data);
};

interface TopFilmsResponse {
  pagesCount: number;
  films: FilmResponse[];
}

export type TopTypes = 'TOP_250_BEST_FILMS' | 'TOP_100_POPULAR_FILMS' | 'TOP_AWAIT_FILMS';

const getTopFilms = (type: TopTypes = 'TOP_250_BEST_FILMS', page: number = 1) => {
  return axios.get<TopFilmsResponse>(`/v2.2/films/top/?type=${type}&page=${page}`);
};

const getFilters = () => {
  return axios.get<GenresResponce>('/v2.2/films/filters').then((res) => res.data);
};

const getFilmsByFilter = (genreId: number) => {
  return axios
    .get<FilterResponse>(
      `/v2.2/films?genres=${genreId}&order=RATING&type=ALL&ratingFrom=6&ratingTo=10&yearFrom=1000&yearTo=3000&page=1`
    )
    .then((res) => res.data);
};

export const api = {
  getFilmById,
  getTopFilms,
  searchFilm,
  //getSimilarFilms,
  //getPremiers,
  getFilters,
  //getFilms, // via filters like 'https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=0&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1' \
  getFilmsByFilter,
  //getPersons,
  //getStaff
  //getStaffById
  //getFilmsByKeyword
};
