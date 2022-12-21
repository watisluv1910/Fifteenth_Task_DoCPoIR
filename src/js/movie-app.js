const API_KEY = 'f2d79501-44a5-4dde-a0f1-bf1c974007eb',
    API_URL_POPULAR = 
        'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
    API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

async function getMovies(url) {

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        }
    });

    const responseData = await response.json();
    showMovies(responseData);
}

function getClassByRate(vote) {
    if (vote >= 7.5) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

function showMovies(data) {
    const movies = document.querySelector('.movies');

    movies.innerHTML = '';

    data.films.forEach((movie) => {

        // If movie.nameEn is empty, then use movie.nameRu
        var movieTitle = movie.nameEn || movie.nameRu;

        // If rating is in percentage, then convert it to 10 scale
        var movieRating = movie.rating;

        if (movieRating.toString().search(/%/) != -1) {
            movieRating = movieRating.replace('%', '');
            movieRating = (movieRating / 10).toFixed(1);
        }

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <div class="movie__cover-inner">
                <img src="${movie.posterUrlPreview}" 
                alt="${movieTitle}" 
                class="movie__cover"
                />
                <div class="movie__cover--darkened"></div>
            </div>
            <div class="movie__info">
                <div class="movie__title ff-subtitle-1">${movieTitle}</div>
                <div class="movie__category ff-body-2">${movie.genres.map(
                    (genre) => ` ${genre.genre}`
                )}</div>
                ${(movieRating != 'null') ?  // If movieRating is not empty, then show it
                    `<div class="movie__average movie__average-${getClassByRate(movieRating)} ff-body-2">
                        ${movieRating}
                    </div>`
                    : '' // If movieRating is empty, then don't show it
                }
            </div>
        `;

        movies.appendChild(movieElement);
    });
}

getMovies(API_URL_POPULAR);

const search = document.querySelector('.header__search'),
    form = document.querySelector('form');

form.addEventListener('keyup', (e) => {
    e.preventDefault();

    const apiSearchURL = `${API_URL_SEARCH}${search.value}`;

    if (search.value) {
        getMovies(apiSearchURL);
    } else {
        getMovies(API_URL_POPULAR);
    }
});