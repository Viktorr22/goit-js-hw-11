import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// const axios = require('axios');
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32921151-b779d8ccd68aa0b72c6aa486f'
const form = document.querySelector('.search-form');
const list = document.querySelector('.gallery');
const loadButton = document.querySelector('.load-more');
let formValue = '';
let page = 1;

form.addEventListener('submit', onSubmit);
loadButton.addEventListener('click', onLoad);

function onSubmit(evt) {
    evt.preventDefault();
    page = 1;
    formValue = evt.currentTarget.elements.searchQuery.value;
    fetchPicture(formValue)
        .then(data => {
            createMarkup(data.hits);
            loadButton.hidden = false;
        })
        .catch(err => console.log(err));
    
    
   
}

async function fetchPicture(findValue) {
    const search = await axios.get(`${BASE_URL}?key=${KEY}&q=${findValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
       console.log(search); 
    if (search.status !== 200) {
        throw new Error(search.statusText);
        }   
        
      
    const response = await search.data;
        console.log(response);
        if (response.hits.length === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
    return response;   

}



function clearBody() {    
    list.innerHTML = '';      
}

function createMarkup(listEvent) {
    clearBody();
    listEvent.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
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
                    </div>`
        list.insertAdjacentHTML("beforeend", markup);               
    }); 
    
    var lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
     });
    lightbox.refresh();
    
}

function onLoad() {
    page += 1;
    fetchPicture(formValue);
    console.log(formValue);
}



// async function fetchPicture(findValue) {
    
//     const search = await fetch(`https://pixabay.com/api/?key=32921151-b779d8ccd68aa0b72c6aa486f&q=${findValue}&image_type=photo&orientation=horizontal&safesearch=true`);
//        console.log(search); 
//        if (!search.ok) {
//         throw new Error(search.statusText);
//         }   
        
      
//     const response = await search.json();
//         console.log(response);
//         if (response.hits.length === 0) {
//         Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//         }
//     return response; 
   

// }




































