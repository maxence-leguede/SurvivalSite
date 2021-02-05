Config = {
	scenesLength: 5, // Define the number of scenes the current page has
	transitions: [
		// List each transitions we have between scenes and their sources.
		{
			source: "transition_1",
		},
		{
			source: "transition_2",
		},
		{
			source: "transition_3",
			playVideo: true, // Used to get when we have to play a video when the user is on a scene.
			introduction: "players", // Name of the video we might play
		},
		{
			source: "transition_4",
			playVideo: true,
			introduction: "lore",
		},
	],
};
