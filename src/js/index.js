// import font-awesome
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import "popper.js";
import "bootstrap";

// import hover.css
import "hover.css";

// import animejs
import anime from "animejs/lib/anime.es.js";

// import custom syle
import "../css/styles.css";

// import custom element
import "./poster-image";

$(document).ready(function () {
	// The base url for all API calls
	var apiBaseURL = "http://api.themoviedb.org/3/";

	// URL in Authentication. Base URL of image
	var imageBaseUrl = "https://image.tmdb.org/t/p/";

	const apiKey = "347b5a9b833c7d6e9204afe6d6ddc4a2";
	const nowPlayingUrl = apiBaseURL + "movie/now_playing?api_key=" + apiKey;
	const trendingUrl = apiBaseURL + "trending/movie/week?api_key=" + apiKey;
	let movies;
	console.log(trendingUrl);

	const trendingTrigger = document.getElementById("trending");
	const now_playingTrigger = document.getElementById("now_playing");

	now_playingTrigger.onclick(fetchMovieData(nowPlayingUrl));

	if (now_playingTrigger.onclick) {
		fetchMovieData(nowPlayingUrl);
	} else {
		fetchMovieData(trendingUrl);
	}

	function fetchMovieData(trendingUrl) {
		fetch(trendingUrl)
			.then((response) => response.json())
			.then((results) => (movies = results.results))
			.then((movies) => {
				let html = ` <div class="row ml-5">`;
				movies.forEach(function (movie) {
					html += `<poster-image src="${imageBaseUrl}w300/${movie.poster_path}" alt="${movie.original_title}" title="${movie.original_title}" data-target="#${movie.id}" release="${movie.release_date}" rating="${movie.vote_average}" overview="${movie.overview}"> </poster-image>`;
				});
				html += `</div>`;
				document.getElementById("movie-list").innerHTML = html;
			});
	}
});
