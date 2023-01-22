import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const list = document.querySelector('.gallery');

export function createMarkup(listEvent) {
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

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 0.5,
    behavior: 'smooth',
  });
}

export function clearBody() {
  list.innerHTML = '';
}
