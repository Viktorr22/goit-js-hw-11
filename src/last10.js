// export function fetchCountries(name) {
//     const BASE_URL = 'https://restcountries.com/v3.1'
//     return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`)
//         .then(resp => {          
//             if (!resp.ok) {
//                 throw new Error(resp.status.text);
//             }
           
//             return resp.json();
//         });   
    
// }



// // https://restcountries.com/v3.1/name/
// import { fetchCountries } from './fetchCountries'
// import Notiflix from 'notiflix';
// import debounce from 'lodash.debounce';
// import './css/styles.css';
// const DEBOUNCE_DELAY = 300;


// const input = document.querySelector('#search-box');
// const list = document.querySelector('.country-list');

// input.addEventListener("input", debounce(onInputText, DEBOUNCE_DELAY)); 

// function onInputText(evt) {
//     const inputValue = evt.target.value.trim();
//     clearInput();
//     if (!inputValue) {
//         return;
//      }
//     fetchCountries(inputValue)
//         .then(data => createMarkup(data))
//         .catch(err => Notiflix.Notify.failure("Oops, there is no country with that name"));

// }

// function createMarkup(e) {
//     if (e.length > 10) {
//          Notiflix.Notify.info("Too many matches found. Please enter a more specific name."); 
//          return;
//     }
//     else if (e.length === 1) {
//         createMarkupFullBox(e);        
//     }
   
//     else if (e.length > 2) {
//         createMarkupList(e);      
       
//     }   
 
    
// }


// function clearInput() {    
//     list.innerHTML = '';      
// }


// function createMarkupList(listEvent) {
//     clearInput();    
//     listEvent.map((listEvt) => {
//         const markup = ` <li class = "list-item-js">
//                             <img src="${listEvt.flags.svg}" alt="flag" width = 20 height = 20 />
//                             <h2 class = "title-list">${listEvt.name.official}</h2>
//                          </li>`;
//         list.insertAdjacentHTML("beforeend", markup);
               
//     });   
// }


// function createMarkupFullBox(event) {   
//     event.map((evtBox) => {
//         const markupList = ` <li class = "list-item-js">
//                                   <img src="${evtBox.flags.svg}" alt="flag" width = 20 height = 20 />
//                                    <h2 class = "title">${evtBox.name.official}</h2>
//                             </li>`;
//         list.innerHTML = markupList;

//         const langValue = Object.values(evtBox.languages).join(', ');
//         const markupBox = `<p class="country-info-text">Capital:<span class="country-info-value"> ${evtBox.capital.join('')}</span></p>
//                            <p class="country-info-text">Population:<span class="country-info-value"> ${evtBox.population}</span></p>
//                            <p class="country-info-text">Language:<span class="country-info-value"> ${langValue}</span></p>`
//         list.insertAdjacentHTML("beforeend", markupBox);
//     });
// }
