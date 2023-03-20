import './css/styles.css';
import fetchCountries from "./fetchCountries";
import Notiflix from 'notiflix';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('input#search-box');
const listRef = document.querySelector('.country-list');
const infoRef = document.querySelector('.country-info');

let searchQuery = '';


inputRef.addEventListener('input', debounce(inputFetch, DEBOUNCE_DELAY));

function inputFetch(searchQuery) {
    searchQuery = inputRef.value.trim();

    if (searchQuery) {
        fetchCountries(searchQuery)
    .then((countries) => renderMarkup(countries))
    .catch(error => { 
        console.error(error);
        Notiflix.Notify.failure("Oops, there is no country with that name");
        listRef.innerHTML = "";
        infoRef.innerHTML = "";
    });
    }
}

function renderMarkup(countries) {
  
    if (countries.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }
    listRef.innerHTML = "";
    infoRef.innerHTML = "";

    if (countries.length < 1) {
            listRef.innerHTML = "";
            infoRef.innerHTML = "";
     } else if(countries.length > 1 && countries.length < 10) {
            appendlistMarkup(countries);
        } else if(countries.length === 1){
            appendInfoMarkup(countries);
        }
}


function appendInfoMarkup(countries) {

        for (const country of countries) {
            const { name: { official }, flags: { svg }, capital, population, languages } = country;
            const language = Object.values(languages).join(", ");

            const infoMarkup = `
                <h1 class="country-info__item"><img src="${svg}" width="50" height="30"/><span>${official}</span></h1>
                    <p>Capital: ${capital}</p>
                    <p>Population:  ${population}</p>
                    <p>Languages:  ${language}</p>`; 
            infoRef.innerHTML = infoMarkup;
        }
}


function appendlistMarkup(countries) {

    const listMarkup = countries.map((country) => { 
        const { name: { official }, flags: { svg }} = country;
        return ` <li class="country-list__item">
        <img src="${svg}" width="30" height="18"/><span>${official}</span>
      </li>`; }).join('');

     listRef.innerHTML = listMarkup;

}


