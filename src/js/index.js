// import "font-awesome";
import "bootstrap";
import "../css/styles.css";

import "jquery";
import "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./poster-image";

$(document).ready(function () {
	// The base url for all API calls
	var apiBaseURL = "http://api.themoviedb.org/3/";

	// URL in Authentication. Base URL of image
	var imageBaseUrl = "https://image.tmdb.org/t/p/";

	const apiKey = "347b5a9b833c7d6e9204afe6d6ddc4a2";

	const discoverURL = apiBaseURL + "movie/now_playing?api_key=" + apiKey;

	const endPoint = apiBaseURL + "trending/movie/week?api_key=" + apiKey;
	let movies;
	console.log(endPoint);

	function fetchMovieData() {
		fetch(endPoint)
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

	fetchMovieData();
});