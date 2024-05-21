export let moviesList = null;
export let triggerMode = false;
export let inputSearch = null;

const createElement = ({ type, attrs, container = null, position = 'append', evt = null, handler = null }) => {
  const el = document.createElement(type);

  Object.keys(attrs).forEach((key) => {
    if (key !== 'innerHTML') el.setAttribute(key, attrs[key])
    else el.innerHTML = attrs[key];
  });

  if (container && position === 'append') container.append(el);
  if (container && position === 'prepend') container.prepend(el);
  if (evt && handler && typeof handler === 'function') el.addEventListener(evt, handler);

  return el;
}

export const createStyle = () => {
  createElement({
    type: 'style',
    attrs: {
      innerHTML: `
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    .container {
      padding: 20px;
      max-width: 1280px;
      margin: 0 auto;
    }
    .container__header{
      font-size: 5rem;
      color: white;
      text-align: center;
      text-transform: uppercase;
      text-shadow: 0 0 3px lightslategray;
    }
    .movies {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px
    }
    .movie {
      display: flex;
      align-content: center;
      justify-content: center;
    }
    .movie__image {
      width: 100%;
      object-fit: cover;
    }
    .search {
      display: flex;
      flex-direction: column;
      max-width: 900px;
      margin: 0 auto 30px;
    }
    .search__group--input{
      width: 100%;
      align-self: center;
    }
    .search__group--checkbox{
      width: 100%;
      color: rgb(40, 40, 40);
    }
    .search__input{
      display: block;
      width: 100%;
      padding: 10px 15px;
      margin-bottom: 10px;
      border-radius: 4px;
      border: 1px solid lightblue;
    }
    label {
      font-size: 12px;
      display: inline-block;
      transform: translate(7px, -2px);
    }
    .bg {
      position: fixed;
      inset: 0;
      background-color: gray;
      background-image: url(https://st.depositphotos.com/1653909/1228/i/600/depositphotos_12283193-stock-photo-movie-clapper-and-film-reels.jpg);
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: cover;
      z-index: -1;
      opacity: 0.45;
    }
    @media (max-width: 992px) {
      .container__header{
        font-size: 3rem;
      }
      .search{
        max-width: 500px;
      }
    }
    @media (max-width: 576px) {
      .container__header{
        font-size: 2rem;
      }
      .search{
        max-width: 300px;
      }
      label {
        font-size: 10px;
      }
    }`
    },
    container: document.head
  });
}

export const createMarkup = () => {
  const container = createElement({
    type: 'div',
    attrs: { class: 'container' },
    container: document.body,
    position: 'prepend'
  });

  createElement({
    type: 'div',
    attrs: { class: 'bg' },
    container: document.body,
    position: 'prepend'
  });

  createElement({
    type: 'h1',
    attrs: {
      innerHTML: 'Search films',
      class: 'container__header'
    },
    container
  });

  const searchBox = createElement({
    type: 'div',
    attrs: { class: 'search' },
    container
  });

  const inputBox = createElement({
    type: 'div',
    attrs: { class: 'search__group search__group--input' },
    container: searchBox
  });

  const checkBox = createElement({
    type: 'div',
    attrs: { class: 'search__group search__group--checkbox' },
    container: searchBox
  });

  inputSearch = createElement({
    type: 'input',
    attrs: {
      id: 'search',
      type: 'text',
      placeholder: 'Input text...',
      class: 'search__input'
    },
    container: inputBox
  });

  createElement({
    type: 'input',
    attrs: {
      id: 'checkbox',
      type: 'checkbox',
      class: 'search__checkbox'
    },
    container: checkBox,
    evt: 'click',
    handler: () => triggerMode = !triggerMode
  });

  createElement({
    type: 'label',
    attrs: {
      for: 'checkbox',
      innerHTML: 'Add movies to an existing list',
      class: 'search__label-checkbox'
    },
    container: checkBox
  });

  moviesList = createElement({
    type: 'div',
    attrs: { class: 'movies' },
    container
  });
}

export const addMovieToList = (movie) => {
  console.log(movie)
  const item = createElement({
    type: 'div',
    attrs: {
      class: 'movie'
    },
    container: moviesList
  });

  createElement({
    type: 'img',
    attrs: {
      class: 'movie__image',
      src: /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'assets/img/noimage.jpg',
      alt: movie.Title,
      title: movie.Title
    },
    container: item
  });
};

export const clearMoviesMarkup = (el) => el && (el.innerHTML = '');