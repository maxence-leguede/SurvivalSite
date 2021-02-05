const scenes = [];
let inAnim = false;
let inScroll = false;
let init = true;
let currentScene = 0;

/**
 * Loads each scenes and scroll to the top of the page when all the elements are loaded
 */
$(document).ready(() => {
	for (let id = 0; id < Config.scenesLength; id++) {
		const scene = new Scene(id);
		scenes.push(scene);
	}
	$("html,body").animate({ scrollTop: 0 }, "fast");
});

/**
 * Renders a transition and scrolls to the next scene
 * @param {Number} afterId Next scene id to scroll to.
 * @param {Boolean} reverse True if the user is scrolling back. Used to play the transition video in reverse.
 */
const renderTransition = (afterId, reverse) => {
	inAnim = true;
	scenes[currentScene].fadeOutText();
	// Timeout to let the text fade
	setTimeout(() => {
		const transitionId = reverse ? currentScene - 1 : currentScene;
		const currentTransition = Config.transitions[transitionId];
		const source = reverse
			? `${currentTransition.source}_reverse`
			: currentTransition.source;
		const after = scenes[afterId];

		// Apply the transition
		videoTransition(source, false).then(() => {
			currentScene = afterId;

			const videoTransitionId = reverse ? transitionId - 1 : transitionId;

			if (
				Config.transitions[videoTransitionId] &&
				Config.transitions[videoTransitionId].playVideo
			) {
				// Hide the image to let the video on top. Timeout of 10ms to let the video load.
				setTimeout(() => {
					scenes[currentScene].hideImg(true);
				}, 10);
				// Apply the introduction
				videoTransition(
					Config.transitions[videoTransitionId].introduction,
					true
				).then(() => {
					// Show the background again when the video has finished
					scenes[currentScene].hideImg(false);
				});
			}
			//Apply fade effect when the transition ended
			after.fadeInText();
			inAnim = false;
		});
		// Scroll to the new scene
		after.scrollTo();
	}, 500);
};

/**
 * Handler to know when the user scrolled
 */
function createScrollEventHandler() {
	return (event) => {
		// Cancels the scroll
		event.preventDefault();
		// If the user isn't actually in a transition or introduction
		if (!inScroll && !inAnim) {
			// Check if the user scrolls to top or not
			const toTop = event.deltaY > 0;
			inScroll = true;
			// Scroll to the new scene
			scenes[currentScene].scrollTo();
			setTimeout(() => {
				inScroll = false;
			}, 500);

			// Render the transition to the new scene
			if (toTop) {
				if (scenes.length > currentScene + 1) {
					renderTransition(currentScene + 1, false);
				}
			} else {
				if (currentScene - 1 >= 0) {
					renderTransition(currentScene - 1, true);
				}
			}
		}
	};
}

// Set the event handler to the wheel event listener
let scrollEventHandler = createScrollEventHandler();
window.addEventListener("wheel", scrollEventHandler, { passive: false });
