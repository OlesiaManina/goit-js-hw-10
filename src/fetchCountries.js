
export default function fetchCountries(searchQuery) {
    const queryParams = '?fields=name,capital,population,flags,languages'
    return fetch(`https://restcountries.com/v3.1/name/${searchQuery}${queryParams}`)
    .then((response) => { if (!response.ok) {
        Notiflix.Notify.failure("Oops, there is no country with that name");
      }
      return response.json()}).catch((error) => console.error(error));

    }
