const API_KEY: string = "api_key=1cf50e6248dc270629e802686245c2c8";
const BASE_URL: string = "https://api.themoviedb.org/3";
const API_URL: string = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL: string = "https://image.tmdb.org/t/p/w500";
const searchURL: string = BASE_URL + "/search/movie?" + API_KEY;
const recommendationsHeader: HTMLElement | null = document.getElementById("recommendations-header");
let movieId: string = "";
let recommendationsURL: string = "";
const main: HTMLElement | null = document.getElementById("main");
const recommendations: HTMLElement | null = document.getElementById("recommendations");
const form: HTMLFormElement | null = document.getElementById("form") as HTMLFormElement;
const search: HTMLInputElement | null = document.getElementById("search") as HTMLInputElement;

getMovies(API_URL);

function getMovies(url: string): void {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

function getRecommendations(url: string): void {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      movieId = data.results[0].id;
      recommendationsURL =
        BASE_URL +
        `/movie/${movieId}/recommendations?` +
        API_KEY +
        "&language=en-US&page=1";
      fetch(recommendationsURL)
        .then((res) => res.json())
        .then((data) => {
          showRecommendations(data.results);
        });
    });
}

function showMovies(data: any[]): void {
  if (main) {
    main.innerHTML = "";
    data.forEach((movie) => {
      const { title, poster_path, vote_average, overview } = movie;
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${Math.round(vote_average * 10) / 10}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      `;
      if (main) {
        main.appendChild(movieEl);
      }
    });
  }
}

function showRecommendations(data: any[]): void {
  if (recommendations) {
    recommendations.innerHTML = "";
    data.forEach((movie) => {
      const { title, poster_path, vote_average, overview } = movie;
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${Math.round(vote_average * 10) / 10}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      `;
      if (recommendations) {
        recommendations.appendChild(movieEl);
      }
    });
  }
}

function getColor(vote: number): string {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search?.value;
    if (searchTerm) {
      getMovies(searchURL + "&query=" + searchTerm);
      getRecommendations(searchURL + "&query=" + searchTerm);
      if (recommendationsHeader) {
        recommendationsHeader.hidden = false;
      }
    } else {
      getMovies(API_URL);
    }
  });
}
