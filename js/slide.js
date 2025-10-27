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
    this.slide.addEventListener("mouseup", this.onEnd);
    this.slide.addEventListener("touchend", this.onEnd);
  }
  onMove(event) {
    const pointerPosition = (event.type === "mousemove" ? event.pageX : event.changedTouches[0].pageX);
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }
  onEnd(event) {
    const movetype = (event.type === 'mouseup' ? 'mousemove' : 'touchmove')
    this.slide.removeEventListener(movetype, this.onMove);
    this.dist.finalDistance = this.dist.movePosition;
  }
  addSlideEvents() {
    this.slide.addEventListener("mousedown", this.onStart);
    this.slide.addEventListener("touchstart", this.onStart);
    document.addEventListener('mouseup', this.onEnd)
  }
  bind() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
  init() {
    this.bind();
    this.addSlideEvents();
  }
}

// criar nova branch
