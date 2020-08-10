import "../component/poster-image"
import "../component/carousel-slide"
import "../component/adv-wrapper"


import DataSource from "../data/data-source";

const main = async () => {

  const posterImages = document.querySelector("poster-image");
  const carouselSlide = document.querySelector("carousel-slide");
  const advWrapper = document.querySelector("adv-wrapper");
  const renderPoster = results => {
    posterImages.generatePoster = results;
  }
  const renderCarousel = results => {
    carouselSlide.genereteCarousel = results;
  }

  const renderAdvWrapper = () => {
    advWrapper.generateAdv;
  }

  try {
    const results = await DataSource.getDiscover();
    renderPoster(results);
  } catch (message) {
    alert(message);
  }

  // Masih Error
  try {
    const results = await DataSource.informationDetail();
    console.log(results);
  } catch (message) {
    alert(message);
  }

  try {
    const results = await DataSource.getTopRated();
    renderCarousel(results);
  } catch (message) {
    alert(message);
  }
  // getDetail();
  renderAdvWrapper();
}

export default main;