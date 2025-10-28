export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
    this.dist = {
      finalDistance: 0,
      pageX: 0,
      movement: 0,
    };
  }
  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(-${distX}px, 0, 0)`;
  }

  transition(active) {
    this.slide.style.transition = active ? "transform .3s" : "";
  }

  updatePosition(pageX) {
    this.dist.movement = (this.dist.pageX - pageX) * 1.5;
    return this.dist.finalDistance + this.dist.movement;
  }
  onStart(event) {
    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault();
      movetype = "mousemove";
      this.dist.pageX = event.pageX;
    } else {
      movetype = "touchmove";
      this.dist.pageX = event.changedTouches[0].pageX;
    }
    this.slide.addEventListener(movetype, this.onMove);
    this.slide.addEventListener("touchend", this.onEnd);
    this.transition(false);
  }
  onMove(event) {
    const pointerPosition =
      event.type === "mousemove" ? event.pageX : event.changedTouches[0].pageX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }
  onEnd(event) {
    const movetype = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.slide.removeEventListener(movetype, this.onMove);
    this.dist.finalDistance = this.dist.movePosition;
    this.transition(true);
    this.changeSlideOnEnd();
  }

  changeSlideOnEnd() {
    if (this.dist.movement > 120 && this.index.next !== undefined) {
      this.activeNextSlide();
    } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
      this.activePrevSlide();
    } else {
      this.changeSlide(this.index.current);
    }
  }

  addSlideEvents() {
    this.slide.addEventListener("mousedown", this.onStart);
    this.slide.addEventListener("touchstart", this.onStart);
    this.slide.addEventListener("mouseup", this.onEnd);
  }
  bind() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  // Slides Config.

  slidesIndexNav(i) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: i > 0 ? i - 1 : undefined,
      current: i,
      next: i === last ? undefined : i + 1,
    };
  }

  slidePosition(element) {
    const margin = (this.wrapper.offsetWidth - element.offsetWidth) / 2;
    return element.offsetLeft - margin;
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const positionElement = this.slidePosition(element);
      return { positionElement, element };
    });
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.positionElement);
    this.slidesIndexNav(index);
    this.dist.finalDistance = activeSlide.positionElement;
    console.log("Slide atual:", this.index);
  }

  activePrevSlide() {
    if (this.index.prev !== undefined) this.changeSlide(this.index.prev);
  }
  activeNextSlide() {
    if (this.index.next !== undefined) this.changeSlide(this.index.next);
  }

  init() {
    this.bind();
    this.transition(true);
    this.addSlideEvents();
    this.slidesConfig();
    this.changeSlide(0);
  }
}
