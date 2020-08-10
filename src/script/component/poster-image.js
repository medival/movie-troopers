import $ from "jquery";
import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "hover.css";

import "./../../styles/style.css";
import DataSource from "../data/data-source";

class PosterImage extends HTMLElement {
	connectedCallback() {
		this.generatePoster();
	}

	async getData() {
		try {
			const movies = await DataSource.getDiscover();
			return movies;
		} catch (error) {
			alert(error);
		}
	}

	async getDetail() {
		try {
			const movies = await this.getData();
			console.log(movies);
		} catch (error) {
			alert(error);
		}
	}

	async generatePoster() {
		const movies = await this.getData();
		// console.log(movies);
		const imageBaseUrl = "https://image.tmdb.org/t/p/original/";
		let html = `<div class="row ml-5">`;
		movies.forEach((movie) => {
			let year = movie.release_date.substr(0, 4);
			let day = movie.release_date.substr(8, 2);
			let month = movie.release_date.substr(5, 2);
			html += `<div class="card text-white bg-dark ml-2 mr-2 mb-4" style="width: 15rem;" data-toggle="modal" data-target="#M${movie.id}">
				<h6 class="rating "> ${movie.vote_average} </h6>
      			<img class="card-img-top hvr-grow" src="${imageBaseUrl}${movie.poster_path}" alt="${movie.original_title}">
      				<div class="card-body">
					  <div class="wrapper" style="height: 4rem">
					  <h6 class="card-text literata-title white"> ${movie.original_title} (${year})</h6>
      					</div>
      				</div>
				</div>
      		<div class="modal fade" id="M${movie.id}" tabindex="-1" role="dialog" aria-hidden="true">
      			<div class="modal-dialog modal-lg" role="document">
      				<div class="modal-content">
      					<div class="card text-white bg-dark pb-3 pt-3">
							  <div class="d-flex flex-row">
      							<div class="col-3 d-flex justify-content-end">
      								<div class="card text-white bg-dark">
      									<img class="card-img-top" src="${imageBaseUrl}${movie.poster_path}" alt="${movie.original_title}">
      								</div>
      							</div>
      							<div class="col-9">
      								<h3 class="card-title movie-title literata-title white"> ${movie.original_title} (${year}) </h3>
      									<div class="d-flex flex-column mb-3">
      										<p class="d-flex text-small justify-content-start release"> Release Date ${month}-${day}-${year} </p> 
      										<p class="d-flex text-small justify-content-centerrating"> Rating ${movie.vote_average} (${movie.vote_count} votes)</p>
      									</div>
      							<h5 class="text-mute"> Overview </h5>
      							<p class="card-text literata-paragraph white"> "${movie.overview}" </p>
      							</div>
      						</div>
      					</div>							
      				</div>
      			</div>
      		</div>`;
		});
		html += `</div>`;
		this.innerHTML = html;
	}
}

customElements.define("poster-image", PosterImage);