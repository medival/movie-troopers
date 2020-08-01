class PosterImage extends HTMLElement {

    connectedCallback() {
        this.src = this.getAttribute("src") || null;
        this.alt = this.getAttribute("alt") || null;
        this.title = this.getAttribute("title") || null;
        this.target = this.getAttribute("data-target") || null;

        this.innerHTML = `
        <div class="card text-white bg-dark ml-2 mr-2 mb-4 " style="width: 15rem;" data-toggle="modal" data-target="${this.target}">
            <img class="card-img-top" src="${this.src}" alt="${this.alt}">
                <div class="card-body">
                <div class="wrapper" style="height: 3rem">
                    <h6 class="card-text"> ${this.title} </h6>
                </div>
            </div>
        </div>`;
    }
}

customElements.define("poster-image", PosterImage);