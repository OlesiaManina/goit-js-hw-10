import './css/styles.css';
import fetchCountries from "./fetchCountries";

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('input#search-box');
const listRef = document.querySelector('.country-list');
const infoRef = document.querySelector('.country-info');

const searchQuery = '';


inputRef.addEventListener('input', debounce(inputFetch, DEBOUNCE_DELAY));

function inputFetch(searchQuery) {
    console.log(inputRef.value);
    searchQuery = inputRef.value.trim();
    fetchCountries(searchQuery).then(countries => renderMarkup(countries)).catch(console.error('Error inputFetch'));

}

function renderMarkup(countries) {
    console.log('страны', countries);
    if (countries.length === 0) {
            listRef.innerHTML = "";
            infoRef.innerHTML = "" 
     } else if(countries.length > 2 && countries.length < 10) {
            appendlistMarkup(countries);
        } else {
            appendInfoMarkup(countries);
        }
}


function appendInfoMarkup(countries) {

    const infoMarkup = countries.map(({ name: { official }, flags: { svg }, capital, population, languages }) => { 
        const language = Object.values(languages).join(", ");
        `
    <h1><img src="${svg}"/><span>${official}</span></h1>
        <p>Capital: ${capital}</p>
        <p>Population:  ${population}</p>
        <p>Languages:  ${language}</p>`; }).join('');

        for (const country of countries) {
            listRef.innerHTML = infoMarkup;
        }
}


function appendlistMarkup(countries) {

    const listMarkup = countries.map(({ name: { official }, flags: { svg }}) => { `
    <li class="country-list__item">
        <img src="${svg}"/><span>${official}</span>
      </li>`; }).join('');

     listRef.innerHTML = listMarkup;

}
    
