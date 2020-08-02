class PosterImage extends HTMLElement {

	connectedCallback() {
		this.src = this.getAttribute("src") || null;
		this.alt = this.getAttribute("alt") || null;
		this.title = this.getAttribute("title") || null;
		this.target = this.getAttribute("data-target") || null;
		this.release = this.getAttribute("release") || null;
		this.rating = this.getAttribute("rating") || null;
		this.overview = this.getAttribute("overview") || null;

		this.innerHTML = `
        <div class="card text-white bg-dark ml-2 mr-2 mb-4 hvr-grow" style="width: 15rem;" data-toggle="modal" data-target="#${this.target}">
            <img class="card-img-top" src="${this.src}" alt="${this.alt}">
                <div class="card-body">
                <div class="wrapper" style="height: 4rem">
					<h6 class="card-text"> ${this.title} </h6>
                </div>
            </div>
        </div>
        <div class="modal fade" id="${this.target}" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="card text-white bg-dark pb-3 pt-3">
						<div class="d-flex flex-row">
							<div class="col-4 d-flex justify-content-end">
							    <div class="card text-white bg-dark">
								    <img class="card-img-top" src="${this.src}" alt="">
							    </div>
						    </div>
						    <div class="col-7">
								<h3 class="card-title movie-title"> ${this.title} </h3>
									<div class="d-flex flex-row mb-3">
										<p class="d-flex text-small justify-content-start mr-2 release"> ${this.release} </p> &#x2022;
										<p class="d-flex text-small justify-content-center mr-2 ml-2 rating"> ${this.rating} </p> &#x2022;
										<p class="d-flex text-small justify-content-end ml-2 duration"> </p>
									</div>
                                <button type="button" class="btn btn-light"> Play Trailer </button>
                                <p class="tagline"> Tagline </p>
							<h6 class="text-mute mt-2 mb-2 pt-3 pb-3"></h6>
							<h5> Overview </h5>
							<p class="card-text"> ${this.overview}</p>
							</div>
						</div>
					</div>							
				</div>
			</div>
		</div>`;
	}
}

customElements.define("poster-image", PosterImage);