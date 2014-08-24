// define angular module/app
var app = angular.module('app', [
	'ngSanitize', 
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay',
    'com.2fdevs.videogular.plugins.buffering',
    'info.vietnamcode.nampnq.videogular.plugins.youtube',
]);

app.run(function ($rootScope) {
});

// Root controller
app.controller('root', function ($scope) {
	$scope.thumb = "img/test.jpg";
	// Videogular config
	$scope.config = {
		width: "640",
		height: "360",
		autoHide: "true",
		autoPlay: "true",
		responsive: "false",
		stretch: "fit",
		theme: {
			url: "css/videogular.css",
			playIcon: "&#xe000;",
			pauseIcon: "&#xe001;",
			volumeLevel3Icon: "&#xe002;",
			volumeLevel2Icon: "&#xe003;",
			volumeLevel1Icon: "&#xe004;",
			volumeLevel0Icon: "&#xe005;",
			muteIcon: "&#xe006;",
			enterFullScreenIcon: "&#xe007;",
			exitFullScreenIcon: "&#xe008;"
		},
		plugins: {
			poster: {
				url: $scope.thumb
			}
		},
		sources: [
			{src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", type: "video/youtube"}
		]
	};
});
