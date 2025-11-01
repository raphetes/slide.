import {slideNav} from "./slide.js";

const slide = new slideNav(".wrapper", ".slide");
slide.init();

slide.addArrow('.prev', '.next')