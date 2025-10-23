// sempre começar com export default

export default class Slide {
	constructor(wrapper, slide) {
		this.wrapper = document.querySelector(wrapper)
		this.slide = document.querySelector(slide)
		this.dist = {
			finalDistance: 0,
			pageX: 0,
			movement: 0,
		} // objetos pra guardar valores úteis
	}

	moveSlide(distX) {
		this.dist.movePosition = distX
		this.slide.style.transform = `translate3d(-${distX}px, 0, 0)`
	}

	updatePosition(pageX) { 
		this.dist.movement = (this.dist.pageX - pageX) * 1.5
		return this.dist.finalDistance + this.dist.movement
	}

	onStart(event) {
		event.preventDefault()
		this.slide.addEventListener('mousemove', this.onMove)
		this.slide.addEventListener('mouseup', this.onEnd)
		this.dist.pageX = event.pageX
	}

	onMove(event) {
		const finalPosition = this.updatePosition(event.pageX)
		this.moveSlide(finalPosition)
	}

	onEnd() {
		this.slide.removeEventListener('mousemove', this.onMove)
		this.dist.finalDistance = this.dist.movePosition
	}

	addSlideEvents() {
		this.slide.addEventListener('mousedown', this.onStart)
	}

	bind() {
		this.onStart = this.onStart.bind(this)
		this.onMove = this.onMove.bind(this)
		this.onEnd = this.onEnd.bind(this)
	}

	init() {
		this.bind()
		this.addSlideEvents()
	}

}