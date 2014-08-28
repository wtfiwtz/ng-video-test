// define angular module/app
var app = angular.module('app', [
	'ngSanitize', 
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay',
    'com.2fdevs.videogular.plugins.buffering',
    //'info.vietnamcode.nampnq.videogular.plugins.youtube',
]);

// Root controller
var currentTime = 0;
app.controller('root', function ($scope, $sce) {

    function updateVideo() {
        var vp = document.getElementsByClassName("videoPlayer")[0];
        vp.play();
        vp.currentTime = $scope.currTime;
    }

    $scope.setResolution = function(resolution) {
        $scope.config.width = resolution.width;
        $scope.config.height = resolution.height;
        var vp = document.getElementsByClassName("videoPlayer")[0];
        $scope.currTime = vp.currentTime;
        vp.src = $sce.trustAsResourceUrl($scope.sources.mp4[resolution.version]);
        vp.load();
        $(vp).on('loadedmetadata', updateVideo);
    }

	$scope.thumb = "img/test.jpg";
	var query = encodeURIComponent(JSON.stringify({ html5:1 }));
	$scope.sources = {
		/* youtube: "https://www.youtube.com/watch?v=r8HPIH5JCak&vq=small", */
		mp4: {
			'SD': "http://pdl.vimeocdn.com/02149/576/272781449.mp4?token2=1409266696_bdd61e4756e1d9133e75d89e134d9d28&aksessionid=7431a9debd982f3d",
			'HD': "http://pdl.vimeocdn.com/88089/513/269819799.mp4?token2=1409267819_7450647efd00ea5c461f0e7076579f22&aksessionid=11a5eb5e8a87749f"
			},
        // http://pdl.vimeocdn.com/02149/576/272781449.mp4?token2=1409266696_bdd61e4756e1d9133e75d89e134d9d28&aksessionid=7431a9debd982f3d
		ogg: {
			SD: "http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_stereo.ogg",
			HD: "http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_720p_stereo.ogg"
			}
	};
	$scope.source = $sce.trustAsResourceUrl($scope.sources.mp4['SD']);
    $scope.mimeType = 'video/mp4'

	// Videogular config
	$scope.config = {
		width: "1280",
		height: "720",
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
            {src: $scope.sources.mp4.SD, type: "video/mp4"}
			//{src: $scope.ytUrl, type: "video/youtube"}
		],
        resolutions: [
            {text: '320 x 180', width: 320, height: 180, version: 'SD'},
            {text: '640 x 360', width: 640, height: 360, version: 'HD'},
            {text: '640 x 480', width: 640, height: 480, version: 'HD'}
        ]
	};
});

// Videogular
app.directive('vg', function($window){
  return {
   restrict: 'A',
   link: function(scope,element,attrs) {
	   	scope.API = null;
		scope.onPlayerReady = function(API) {
			scope.API = API;
		};
	    scope.$on('onVgUpdateTime', function(e) { 
	    	console.debug('update');
	    });
	}
  }
});

// Video.js
app.directive('videoJs', function($timeout, $window){
  return {
   restrict: 'A',
   link: function(scope,element,attrs) {
   		var setup = { techOrder:["youtube"], forceHTML5:true, autoplay:true, src:scope.sources.youtube };
   		attrs.id = "video" + "foo";
   		element.attr('id', attrs.id);
   		element.attr('poster', "/img/test.jpg");
        var player = $window.videojs(attrs.id, setup).ready(function() {
	    });
//       	player.trigger('firstplay');
        // Fix issue with not getting activated classes
        player.buildCSSClass();
 //       player.removeClass('vjs-paused');
 //       player.addClass('vjs-has-started');
 //       player.addClass('vjs-playing');
        player.dimensions(640,360);

	    scope.$on('$destroy', function () {
		    player.dispose();
		});
    }
  }
});
