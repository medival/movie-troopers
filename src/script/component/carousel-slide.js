import $ from "jquery";
import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


import "./../../styles/style.css";
import DataSource from "../data/data-source";

class CarouselSlide extends HTMLElement {
    connectedCallback() {
        this.genereteCarousel();
    }

    async getData() {
        try {
            const carousel = await DataSource.getTopRated();
            return carousel;
        } catch (err) {
            alert(err);
        }
    }

    async genereteCarousel() {
        const slides = await this.getData();
        const imageBaseUrl = `https://image.tmdb.org/t/p/original/`;
        let html = `<div class="bd-example">
                        <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner">`;
        slides.slice(0, 1).forEach((slide) => {
            html += `<div class="carousel-item active">
                        <img src="${imageBaseUrl}${slide.backdrop_path}" class="d-block" alt="Poster ${slide.original_title}">
                        <div class="carousel-caption d-none d-md-block d-lg-block">
                            <h4 class="literata-title primary-color"> ${slide.original_title} </h4>
                            <p class="literata-paragraph primary-color"> ${slide.overview}</p>
                        </div>
                    </div>`
        })
        slides.slice(2, 5).forEach(slide => {
            html += `<div class="carousel-item">
                        <img src="${imageBaseUrl}${slide.backdrop_path}" class="d-block" alt="Poster ${slide.original_title}">
                        <div class="carousel-caption d-none d-md-block d-lg-block">
                            <h4 class="literata-title primary-color"> ${slide.original_title} </h4>
                            <p class="literata-paragraph primary-color"> "${slide.overview}" </p>
                        </div>
                    </div>`
        })
        html += `</div>
                    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                    </div>
                 </div>`;
        this.innerHTML = html;
    }
}

customElements.define("carousel-slide", CarouselSlide)