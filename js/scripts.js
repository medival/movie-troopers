$(document).ready(function () {
	// The base url for all API calls
	var apiBaseURL = 'http://api.themoviedb.org/3/';

	// URL in Authentication. Base URL of image
	var imageBaseUrl = 'https://image.tmdb.org/t/p/';

	const apiKey = '347b5a9b833c7d6e9204afe6d6ddc4a2';

	const discoverURL = apiBaseURL + 'movie/now_playing?api_key=' + apiKey;

	const endPoint = apiBaseURL + 'trending/movie/week?api_key=' + apiKey;

	console.log(endPoint);

	function fetchMovieData() {
		fetch(endPoint)
			.then(response => response.json())
			.then(results => movies = results.results)
			.then(movies => {
				let poster = `<div class="row ml-5">`;
				movies.forEach(function (movie) {
					let movieUrl = `${apiBaseURL}movie/${movie.id}?api_key=${apiKey}&language=en-US`;
					poster += `
						<div class="card text-white bg-dark ml-2 mr-2 mb-4 posterMovie" style="width: 15rem;" data-toggle="modal" data-target="#M${movie.id}" data-id="${movie.id}">
							<img class="card-img-top" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="Card image cap">
							<div class="card-body">
							<div class="wrapper" style="height: 3rem">
								<h6 class="card-text movie-title">  ${movie.original_title}  </h6>
							</div>
							</div>
						</div>`;
					poster += `<div class="modal fade" id="M${movie.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog modal-lg" role="document">
							<div class="modal-content">
							<div class="card text-white bg-dark pb-3 pt-3">
							<div class="d-flex flex-row">
							<div class="col-4 d-flex justify-content-end">
							<div class="card text-white bg-dark"  data-toggle="modal" data-target="#${movie.id}">
								<img class="card-img-top" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="Card image cap">
							</div>
							</div>
							<div class="col-8">
								<h3 class="card-title movie-title"> ${movie.original_title} </h3>
									<div class="d-flex flex-row mb-3">
										<p class="d-flex text-small justify-content-start mr-2 release_date"> ${movie.release_date} </p> &#x2022;
										<p class="d-flex text-small justify-content-center mr-2 ml-2 rate"> ${movie.vote_average} </p> &#x2022;
										<p class="d-flex text-small justify-content-end ml-2 duration"> </p>
									</div>

								<button type="button" class="btn btn-light"> <i class="fas fa-play"></i> Play Trailer </button>

								<h6 class="text-mute mt-2 mb-2 pt-3 pb-3"></h6>

								<h5> Overview </h5>
								<p class="card-text"> ${movie.overview} </p>
								</div>
							</div>
							</div>							
							</div>
						</div>
					</div>`;
				});
				poster += '</div>'
				document.getElementById("movie-list").innerHTML = poster;
			})
	}

	fetchMovieData();
});