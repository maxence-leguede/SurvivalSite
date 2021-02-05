/**
 * Used to create a scene object. It will set the fade effects, manage the background and the scroll.
 *
 * @since 1.0.0
 * @access public
 *
 * @property {String} id Id of the current HTML element
 */
class Scene {
	constructor(id) {
		this.id = "scene-" + (id + 1);
	}

	/**
	 * Scrolls to the current scene
	 */
	scrollTo() {
		const currentId = this.id;
		setTimeout(function () {
			window.scrollTo(0, $(`#${currentId}`).offset().top);
		}, 200);
	}

	/**
	 * Fade out current scene texts
	 */
	fadeOutText() {
		const text = $(`#${this.id} div`);
		text.removeClass("transition-in").addClass("transition-out");
	}

	/**
	 * Fade in current scene texts
	 */
	fadeInText() {
		const text = $(`#${this.id} div`);
		text.removeClass("transition-out").addClass("transition-in");
	}

	/**
	 * Hide or show the background image of the scene.
	 * @param {Boolean} hide If true, the background will be hidden, else it will be shown
	 */
	hideImg(hide) {
		if (hide) {
			$(`#${this.id} img`).css("opacity", "0");
		} else {
			$(`#${this.id} img`).css("opacity", "1");
		}
	}

	transition(fnc) {
		return fnc(this.id);
	}
}
