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
            for (const country of countries) {
                appendInfoMarkup(country);
            }
        }
}


function appendInfoMarkup(country) {

    console.log('1 страна', country);
    const { name: { official }, flags: { svg }, capital, population, languages } = country;
    const language = Object.values(languages).join(", ");

    const infoMarkup = `
    <h1><span>${flags.svg}</span>${name.official}</h1>
        <p>Capital: ${capital}</p>
        <p>Population:  ${population}</p>
        <p>Languages:  ${language}</p>`;

    infoRef.innerHTML = infoMarkup;
}


function appendlistMarkup(countries) {
    countries.map((country) =>{
    const { name: { official }, flags: { svg }} = country;

    const listMarkup = `
    <li class="country-list__item">
        <h1><span>${flags.svg}</span>${name.official}</h1>
      </li>
`;
     listRef.innerHTML = listMarkup;


}).join('');
}
    
