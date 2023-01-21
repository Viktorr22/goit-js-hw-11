import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// const axios = require('axios');
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32921151-b779d8ccd68aa0b72c6aa486f';
const form = document.querySelector('.search-form');
const list = document.querySelector('.gallery');
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
  page = 1;
  formValue = evt.currentTarget.elements.searchQuery.value.trim();
  if (!formValue) {
    return;
  }
  fetchPicture(formValue)
    .then(({ hits }) => {
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      createMarkup(hits);

      loadButton.style.display = 'block';
    })
    .catch(err => console.log(err));
}

async function fetchPicture(findValue) {
  try {
    const responce = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${findValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    console.log(responce.data);
    totalPages = Math.ceil(responce.data.total / responce.data.hits.length);
    // console.log(totalPages);
    return responce.data;
  } catch (error) {
    throw new Error(error);
  }
}

function clearBody() {
  list.innerHTML = '';
}

function createMarkup(listEvent) {
  listEvent.map(
    ({
      largeImageURL,
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      const markup = `<div class="photo-card">
                        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width = 100%/></a>                     
                      <div class="info">
                         <p class="info-item">
                            <b>Likes: ${likes}</b>
                         </p>
                         <p class="info-item">
                            <b>Views: ${views}</b>
                         </p>
                         <p class="info-item">
                            <b>Comments: ${comments}</b>
                         </p>
                         <p class="info-item">
                            <b>Downloads: ${downloads}</b>
                         </p>
                      </div>
                    </div>`;
      list.insertAdjacentHTML('beforeend', markup);
    }
  );

  var lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
  lightbox.refresh();
}

function onLoad() {
  page += 1;
  fetchPicture(formValue).then(data => {
    createMarkup(data.hits);
    console.log(data.hits);
    console.log(page);
    console.log(totalPages);
    if (page === totalPages) {
      loadButton.style.display = 'none';
    }
  });
}

// async function fetchPicture(findValue) {
//   const search = await axios.get(
//     `${BASE_URL}?key=${KEY}&q=${findValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
//   );
//   console.log(search);
//   if (search.status !== 200) {
//     throw new Error(search.statusText);
//   }

//   const response = await search.data;
//   console.log(response);
//   if (response.hits.length === 0) {
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//     return;
//   }
//   return response;
// }
