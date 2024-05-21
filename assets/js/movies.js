import { createStyle, createMarkup, addMovieToList, triggerMode, inputSearch, clearMoviesMarkup, moviesList } from './dom.js';

let siteURL = `https://www.omdbapi.com`;
let searchLast = null;

const debounce = (() => {
  let timer = null;
  return (cb, ms) => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(cb, ms);
  }
})()

const getData = (url) => fetch(url)
  .then((res) => res.json())
  .then((json) => {
    if (!json || !json.Search) throw Error('Сервер вернул не правильный объект');
    return json.Search;
  })

const inputSearchHandler = (e) => {
  debounce(() => {
    const searchString = e.target.value.trim();

    if (searchString && searchString !== searchLast && searchString.length > 3) {
      if (!triggerMode) clearMoviesMarkup(moviesList);

      getData(`${siteURL}/?i=tt3896198&apikey=10745fd0&s=${searchString}`)
        .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
        .catch((err) => console.error(err));
    }
    searchLast = searchString;
  }, 2000);
}

export const appInit = (url) => {
  createStyle();
  createMarkup();
  siteURL = url || `https://www.omdbapi.com`;
  inputSearch.addEventListener('keyup', inputSearchHandler);
}