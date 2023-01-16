export const API_KEY = "0c43a956df331b1b45b4d08c58e16383";
export const BASE_PATH = "https://api.themoviedb.org/3/";

export interface IBox {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
}

export interface ISlideProps {
  data?: IGetDataResult;
  slidIndex: number;
}

export interface ISlideDirection {
  back: boolean;
}

export interface IGetDataResult {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IBox[];
  total_pages: number;
  total_results: number;
}

export interface IGenres {
  id: number;
  name: string;
}

export interface IDetailMovie {
  genres: IGenres[];
  vote_average: number;
  release_date: string;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  runtime: number;
}

export interface IVideoKey {
  id: number;
  results: [
    {
      key: string;
    }
  ];
}

export interface ICast {
  name: string;
  profile_path: string;
}

export interface ICrew {
  name: string;
  profile_path: string;
  job: string;
  known_for_department?: string;
}

export interface ICredit {
  id: number;
  cast: ICast[];
  crew: ICrew[];
}

export function getNowMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getUpComingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getPopularMovies() {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getTopRatedMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getDetailMovie(movieId: number) {
  return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getVideoMovieKey(banerId?: number) {
  return fetch(`${BASE_PATH}/movie/${banerId}/videos?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getCreditMovie(movieId: number) {
  return fetch(`${BASE_PATH}/movie/${movieId}/credits?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getAiringTodayTv() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getOnAirTv() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getPopularTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}
export function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getCreditTv(tvId: number) {
  return fetch(`${BASE_PATH}/tv/${tvId}/credits?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getSearchMovie(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}
export function getSearchTv(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}
