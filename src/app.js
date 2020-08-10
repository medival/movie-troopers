import "regenerator-runtime";

import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import AOS from "aos";
import "aos/dist/aos.esm";

import "./styles/style.css";
import "./script/component/poster-image";
import "./script/component/carousel-slide";
import "./script/data/data-source";
import main from "./script/view/main";

document.addEventListener("DOMContentLoaded", main);