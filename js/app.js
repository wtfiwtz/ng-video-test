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
app.controller('root', function ($scope, $sce) {
	$scope.thumb = "img/test.jpg";
	var query = encodeURIComponent(JSON.stringify({ html5:1 }));
	$scope.sources = {
		youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&playerVars=" + query,
/*		mp4: {
			SD: "http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_stereo.avi", 
			HD: "http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_720p_stereo.avi"
			},
*/
		ogg: {
			SD: "http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_stereo.ogg",
			HD: "http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_720p_stereo.ogg"
			}
	};
	$scope.ytUrl = $sce.trustAsResourceUrl($scope.sources.youtube);

	// Videogular config
	$scope.config = {
		width: "320",
		height: "180",
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
			{src: $scope.ytUrl, type: "video/youtube"}
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
   		var setup = { techOrder:["youtube"], forceHTML5:true };
   		attrs.id = "video" + "foo";
   		element.attr('id', attrs.id);
//   		element.attr('poster', "/img/test.jpg");
   		element.append('<source type="video/youtube" src="' + scope.sources.youtube + '" />');
	        var player = $window.videojs(attrs.id, setup).ready(function() {
	        	var source = ([
	        		{ type:"video/youtube", src:scope.sources.youtube }
	 	  		]);
	    		this.src(source);
	//    		this.load();
	//       	this.stop();
	//        	this.play();
		    });

	    scope.$on('$destroy', function () {
		    player.dispose();
		});
        // Fix issue with not getting activated classes
        //var vidDiv = $('#' + id);
        //vidDiv.removeClass('vjs-paused').addClass('vjs-has-started vjs-playing');
        // Move overlay inside video element to be styled for pause/play
        //$('#' + id + ' + .overlay').appendTo(vidDiv);
    }
  }
});
