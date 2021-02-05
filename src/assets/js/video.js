/**
 * Render the transition / intro of a scene.
 * @param {String} source Video source name for the transition / intro
 * @param {Boolean} isIntro Set to true if it's an intro or false if it's a transition.
 */
const videoTransition = (source, isIntro) => {
	return new Promise((resolve, reject) => {
		$("body").append(`<video id="${
			isIntro ? "intro" : "transition"
		}"  webkit-playsinline="true"
                playsinline="true" autoplay="" muted>
                    <source src="../assets/video/${source}.webm" type="video/webm">
                </video>`);

		const video = document.getElementById(isIntro ? "intro" : "transition");
		video.currentTime = 0;

		video.onended = function () {
			$(`#${isIntro ? "intro" : "transition"}`).remove();
			resolve();
		};
	});
};
