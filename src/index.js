import { fetchPicture } from './api/api';
import { createMarkup, clearBody } from './markup/markup';
import Notiflix from 'notiflix';

const KEY = '32921151-b779d8ccd68aa0b72c6aa486f';
const form = document.querySelector('.search-form');
const loadButton = document.querySelector('.load-more');
loadButton.style.display = 'none';
let formValue = '';
let page = 1;
let totalPages = 0;

form.addEventListener('submit', onSubmit);
loadButton.addEventListener('click', onLoad);

function onSubmit(evt) {
  evt.preventDefault();
  clearBody();
  loadButton.style.display = 'none';
  page = 1;
  formValue = evt.currentTarget.elements.searchQuery.value.trim();
  if (!formValue) {
    return;
  }
  fetchPicture(
    `?key=${KEY}&q=${formValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=200&page=${page}`
  )
    .then(({ hits, total }) => {
      totalPages = Math.ceil(total / hits.length);
      createMarkup(hits);
      Notiflix.Notify.info(`Hooray! We found ${total} images.`);

      if (page === totalPages) {
        loadButton.style.display = 'none';
      } else {
        loadButton.style.display = 'block';
      }
    })
    .catch(err => console.log(err));
}

function onLoad() {
  page += 1;
  fetchPicture(
    `?key=${KEY}&q=${formValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=200&page=${page}`
  )
    .then(({ hits }) => {
      createMarkup(hits);
    })
    .catch(err => console.log(err));

  if (page === totalPages) {
    loadButton.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
