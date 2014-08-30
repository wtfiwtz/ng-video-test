// define angular module/app
var app = angular.module('app', [
	'ngSanitize', 
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay',
    'com.2fdevs.videogular.plugins.buffering',
    'info.vietnamcode.nampnq.videogular.plugins.youtube',
]);

// Root controller
var currentTime = 0;
app.controller('root', function ($scope, $sce) {

    function restartVideo() {
        var vp = document.getElementsByClassName("videoPlayer")[0];
        vp.play();
        vp.currentTime = $scope.currTime;
    }

    // Toggle between YouTube and HTML5
    $scope.isYoutube = true;

    $scope.onPlayerReady = function (API) {
        $scope.API = API;
    }

    $scope.setResolution = function(resolution) {
        $scope.config.width = resolution.width;
        $scope.config.height = resolution.height;

        if ($scope.isYoutube) {
            youtubeScope = angular.element('vg-youtube').isolateScope();
            youtubeScope.updateSize();

        } else {
            var vp = document.getElementsByClassName("videoPlayer")[0];
            $scope.currTime = vp.currentTime;
            vp.src = $sce.trustAsResourceUrl($scope.sources.mp4[resolution.version]); //mp4[resolution.version]);
            vp.load();
            $(vp).on('loadedmetadata', restartVideo);
        }
    }

	$scope.thumb = "img/test.jpg";
	var query = encodeURIComponent(JSON.stringify({ html5:1 }));
	$scope.sources = {
		youtube: {
            'large': "https://www.youtube.com/watch?v=r8HPIH5JCak&vq=large",
            'hd720': "https://www.youtube.com/watch?v=qEI1_oGPQr0&vq=hd720"
        },
		mp4: {
            'small': "http://pdl.vimeocdn.com/05009/152/256790876.mp4?token2=1409393190_9a6bc2bd3470277cb661df4270dd0bd8&aksessionid=e54e8adee31ddfc8",
            'medium': "http://pdl.vimeocdn.com/05009/152/256790876.mp4?token2=1409393190_9a6bc2bd3470277cb661df4270dd0bd8&aksessionid=e54e8adee31ddfc8",
			'large': "http://pdl.vimeocdn.com/05009/152/256790876.mp4?token2=1409393190_9a6bc2bd3470277cb661df4270dd0bd8&aksessionid=e54e8adee31ddfc8",
			'hd720': "http://pdl.vimeocdn.com/92453/305/258716066.mp4?token2=1409393154_26e87b2c46a8172555be1d78b8f1b8aa&aksessionid=61a79ec4008de5e0",
            'hd1440': "http://pdl.vimeocdn.com/92453/305/258716066.mp4?token2=1409393154_26e87b2c46a8172555be1d78b8f1b8aa&aksessionid=61a79ec4008de5e0",
            'highres': "http://pdl.vimeocdn.com/92453/305/258716066.mp4?token2=1409393154_26e87b2c46a8172555be1d78b8f1b8aa&aksessionid=61a79ec4008de5e0"
			},
		ogg: {
			SD: "http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_stereo.ogg",
			HD: "http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_720p_stereo.ogg"
			}
	};
    if ($scope.isYoutube) {
        $scope.source = $sce.trustAsResourceUrl($scope.sources.youtube['large']); // mp4['SD']);
    } else {
        $scope.source = $sce.trustAsResourceUrl($scope.sources.mp4['large']);
    }
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
            {src: $scope.sources.youtube, type: 'video/youtube'} // .mp4.SD, type: "video/mp4"}
		],
        resolutions: [
            {text: '320 x 240', width: 320, height: 180, version: 'small'},
            {text: '480 x 360', width: 640, height: 360, version: 'medium'},
            {text: '640 x 480', width: 640, height: 480, version: 'large'},
            {text: '960 x 720', width: 960, height: 720, version: 'hd720'},
            {text: '1440 x 1080', width: 1440, height: 1080, version: 'hd1440'},
            {text: '1920 x 1080', width: 1920, height: 1080, version: 'highres'}
        ]
	};
});

// Videogular
//app.directive('vg', function($window){
//  return {
//   restrict: 'A',
//   link: function(scope,element,attrs) {
//	   	scope.API = null;
//		scope.onPlayerReady = function(API) {
//			scope.API = API;
//            console.log(scope);
//		};
//	    scope.$on('onVgUpdateTime', function(e) {
//	    	console.debug('update');
//	    });
//	}
//  }
//});

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
