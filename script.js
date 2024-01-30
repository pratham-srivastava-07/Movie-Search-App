var API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
var BASE_URL = "https://api.themoviedb.org/3";
var API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
var IMG_URL = "https://image.tmdb.org/t/p/w500";
var searchURL = BASE_URL + "/search/movie?" + API_KEY;
var recommendationsHeader = document.getElementById("recommendations-header");
var movieId = "";
var recommendationsURL = "";
var main = document.getElementById("main");
var recommendations = document.getElementById("recommendations");
var form = document.getElementById("form");
var search = document.getElementById("search");
getMovies(API_URL);
function getMovies(url) {
    fetch(url)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        showMovies(data.results);
    });
}
function getRecommendations(url) {
    fetch(url)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        movieId = data.results[0].id;
        recommendationsURL =
            BASE_URL +
                "/movie/".concat(movieId, "/recommendations?") +
                API_KEY +
                "&language=en-US&page=1";
        fetch(recommendationsURL)
            .then(function (res) { return res.json(); })
            .then(function (data) {
            showRecommendations(data.results);
        });
    });
}
function showMovies(data) {
    if (main) {
        main.innerHTML = "";
        data.forEach(function (movie) {
            var title = movie.title, poster_path = movie.poster_path, vote_average = movie.vote_average, overview = movie.overview;
            var movieEl = document.createElement("div");
            movieEl.classList.add("movie");
            movieEl.innerHTML = "\n        <img src=\"".concat(IMG_URL + poster_path, "\" alt=\"").concat(title, "\">\n        <div class=\"movie-info\">\n          <h3>").concat(title, "</h3>\n          <span class=\"").concat(getColor(vote_average), "\">").concat(Math.round(vote_average * 10) / 10, "</span>\n        </div>\n        <div class=\"overview\">\n          <h3>Overview</h3>\n          ").concat(overview, "\n        </div>\n      ");
            if (main) {
                main.appendChild(movieEl);
            }
        });
    }
}
function showRecommendations(data) {
    if (recommendations) {
        recommendations.innerHTML = "";
        data.forEach(function (movie) {
            var title = movie.title, poster_path = movie.poster_path, vote_average = movie.vote_average, overview = movie.overview;
            var movieEl = document.createElement("div");
            movieEl.classList.add("movie");
            movieEl.innerHTML = "\n        <img src=\"".concat(IMG_URL + poster_path, "\" alt=\"").concat(title, "\">\n        <div class=\"movie-info\">\n          <h3>").concat(title, "</h3>\n          <span class=\"").concat(getColor(vote_average), "\">").concat(Math.round(vote_average * 10) / 10, "</span>\n        </div>\n        <div class=\"overview\">\n          <h3>Overview</h3>\n          ").concat(overview, "\n        </div>\n      ");
            if (recommendations) {
                recommendations.appendChild(movieEl);
            }
        });
    }
}
function getColor(vote) {
    if (vote >= 8) {
        return "green";
    }
    else if (vote >= 5) {
        return "orange";
    }
    else {
        return "red";
    }
}
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var searchTerm = search === null || search === void 0 ? void 0 : search.value;
        if (searchTerm) {
            getMovies(searchURL + "&query=" + searchTerm);
            getRecommendations(searchURL + "&query=" + searchTerm);
            if (recommendationsHeader) {
                recommendationsHeader.hidden = false;
            }
        }
        else {
            getMovies(API_URL);
        }
    });
}
