/*
 * jQuery Simple Audio Player Plugin
 * http://github.com/dradl/jquery-simpleaudioplayer
 * Requires jQuery 1.4.2
 *
 * Copyright 2018, Dominik Radl.
 * Licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) 
 * https://creativecommons.org/licenses/by-nc-sa/4.0/
 */

$.fn.simpleAudioPlayer = function( options ) {

	function msie() {
	    var msie = window.navigator.userAgent.indexOf("MSIE ");
	    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
			console.log('SimpleAudioPlayer doesn\'t support this browser.');
			return true;
		}
	    return false;
	}

	if (msie()) return false;

	// import compressed SiriWave.js
	function SiriWaveCurve(t){this.controller=t.controller,this.definition=t.definition}function SiriWave(t){t=t||{},this.phase=0,this.run=!1,this.cache={},this.container=t.container,this.width=window.getComputedStyle(this.container).width.replace("px",""),this.height=window.getComputedStyle(this.container).height.replace("px",""),this.ratio=window.devicePixelRatio||1,this.cache.width=this.ratio*this.width,this.cache.height=this.ratio*this.height,this.cache.height2=this.cache.height/2,this.cache.width2=this.cache.width/2,this.cache.width4=this.cache.width/4,this.cache.heightMax=this.cache.height2-4,this.amplitude=t.amplitude,this.speed=.05,this.frequency=5,this.color=[26,161,178],this.speedInterpolationSpeed=.005,this.amplitudeInterpolationSpeed=.05,this.cache.interpolation={speed:this.speed,amplitude:this.amplitude},this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=this.cache.width,this.canvas.height=this.cache.height,this.canvas.style.width=this.canvas.style.height="100%",this.curves=[];for(var i=0;i<SiriWaveCurve.prototype.definition.length;i++)this.curves.push(new SiriWaveCurve({controller:this,definition:SiriWaveCurve.prototype.definition[i]}));this.container.appendChild(this.canvas),this.start()}SiriWaveCurve.prototype._globAttenuationEquation=function(t){return null==SiriWaveCurve.prototype._globAttenuationEquation.cache[t]&&(SiriWaveCurve.prototype._globAttenuationEquation.cache[t]=Math.pow(4/(4+Math.pow(t,4)),4)),SiriWaveCurve.prototype._globAttenuationEquation.cache[t]},SiriWaveCurve.prototype._globAttenuationEquation.cache={},SiriWaveCurve.prototype._xpos=function(t){return this.controller.cache.width2+t*this.controller.cache.width4},SiriWaveCurve.prototype._ypos=function(t){var i=this.controller.cache.heightMax*this.controller.amplitude/this.definition.attenuation;return this.controller.cache.height2+this._globAttenuationEquation(t)*i*Math.sin(this.controller.frequency*t-this.controller.phase)},SiriWaveCurve.prototype.draw=function(){var t=this.controller.ctx;t.moveTo(0,0),t.beginPath(),t.strokeStyle="rgba("+this.controller.color+","+this.definition.opacity+")",t.lineWidth=this.definition.lineWidth;for(var i=-2;i<=2;i+=.01){var e=this._ypos(i);Math.abs(i)>=1.9&&(e=this.controller.cache.height2),t.lineTo(this._xpos(i),e)}t.stroke()},SiriWaveCurve.prototype.definition=[{attenuation:-2,lineWidth:.4,opacity:.1},{attenuation:-6,lineWidth:.4,opacity:.2},{attenuation:6,lineWidth:.4,opacity:.4},{attenuation:2,lineWidth:.4,opacity:.6},{attenuation:1,lineWidth:.6,opacity:1}],SiriWave.prototype._interpolate=function(t){increment=this[t+"InterpolationSpeed"],Math.abs(this.cache.interpolation[t]-this[t])<=increment?this[t]=this.cache.interpolation[t]:this.cache.interpolation[t]>this[t]?this[t]+=increment:this[t]-=increment},SiriWave.prototype._clear=function(){this.ctx.globalCompositeOperation="destination-out",this.ctx.fillRect(0,0,this.cache.width,this.cache.height),this.ctx.globalCompositeOperation="source-over"},SiriWave.prototype._draw=function(){for(var t=0,i=this.curves.length;t<i;t++)this.curves[t].draw()},SiriWave.prototype._startDrawCycle=function(){!1!==this.run&&(this._clear(),this._interpolate("amplitude"),this._interpolate("speed"),this._draw(),this.phase=(this.phase+Math.PI*this.speed)%(2*Math.PI),window.requestAnimationFrame?window.requestAnimationFrame(this._startDrawCycle.bind(this)):setTimeout(this._startDrawCycle.bind(this),20))},SiriWave.prototype.start=function(){this.phase=0,this.run=!0,this._startDrawCycle()},SiriWave.prototype.setAmplitude=function(t){this.cache.interpolation.amplitude=Math.max(Math.min(t,1),0)},window.SiriWave=SiriWave;

	// import compressed Dancer.js
	!function(){var t=function(){this.audioAdapter=t._getAdapter(this),this.events={},this.sections=[],this.bind("update",e)};function e(){for(var t in this.sections)this.sections[t].condition()&&this.sections[t].callback.call(this)}t.version="0.3.2",t.adapters={},t.prototype={load:function(e){return e instanceof HTMLElement?this.source=e:(this.source=window.Audio?new Audio:{},this.source.src=t._makeSupportedPath(e.src,e.codecs)),this.audio=this.audioAdapter.load(this.source),this},play:function(){return this.audioAdapter.play(),this},pause:function(){return this.audioAdapter.pause(),this},bind:function(t,e){return this.events[t]||(this.events[t]=[]),this.events[t].push(e),this},unbind:function(t){return this.events[t]&&delete this.events[t],this},getWaveform:function(){return this.audioAdapter.getWaveform()}},window.Dancer=t}(),function(t){var e={mp3:"audio/mpeg;",ogg:'audio/ogg; codecs="vorbis"',wav:'audio/wav; codecs="1"',aac:'audio/mp4; codecs="mp4a.40.2"'},i=document.createElement("audio");t.options={},t.setOptions=function(e){for(var i in e)e.hasOwnProperty(i)&&(t.options[i]=e[i])},t.isSupported=function(){return window.Float32Array&&window.Uint32Array?(t=!!(navigator.vendor||"").match(/Apple/),e=(e=navigator.userAgent.match(/Version\/([^ ]*)/))?parseFloat(e[1]):0,t&&e<=6||!window.AudioContext&&!window.webkitAudioContext?(console.log("not supported"),""):"webaudio"):null;var t,e},t.canPlay=function(t){i.canPlayType;return!(!i.canPlayType||!i.canPlayType(e[t.toLowerCase()]).replace(/no/,""))},t.addPlugin=function(e,i){void 0===t.prototype[e]&&(t.prototype[e]=i)},t._makeSupportedPath=function(e,i){if(!i)return e;for(var n=0;n<i.length;n++)if(t.canPlay(i[n]))return e+"."+i[n];return e},t._getAdapter=function(e){switch(t.isSupported()){case"webaudio":return new t.adapters.webaudio(e);default:return null}},t._getMP3SrcFromAudio=function(t){var e=t.children;if(t.src)return t.src;for(var i=e.length;i--;)if((e[i].type||"").match(/audio\/mpeg/))return e[i].src;return null}}(window.Dancer),function(){var t=2048,e=function(t){this.dancer=t,this.audio=new Audio,this.context=window.AudioContext?new window.AudioContext:new window.webkitAudioContext};function i(){void 0===this.source&&(this.source=this.context.createMediaElementSource(this.audio)),this.source.connect(this.proc),this.source.connect(this.gain),this.gain.connect(this.context.destination),this.proc.connect(this.context.destination),this.isLoaded=!0,this.progress=1}e.prototype={load:function(e){var n=this;return this.audio=e,this.isLoaded=!1,this.progress=0,this.context.createScriptProcessor||(this.context.createScriptProcessor=this.context.createJavascriptNode),this.proc=this.context.createScriptProcessor(t/2,1,1),this.proc.onaudioprocess=function(t){n.update.call(n,t)},this.context.createGain||(this.context.createGain=this.context.createGainNode),this.gain=this.context.createGain(),this.signal=new Float32Array(t/2),this.audio.readyState<3?this.audio.addEventListener("canplay",function(){i.call(n)}):i.call(n),this.audio.addEventListener("progress",function(t){t.currentTarget.duration&&(n.progress=t.currentTarget.seekable.end(0)/t.currentTarget.duration)}),this.audio},play:function(){this.audio.play(),this.isPlaying=!0},pause:function(){this.audio.pause(),this.isPlaying=!1},setVolume:function(t){this.gain.gain.value=t},getVolume:function(){return this.gain.gain.value},getProgress:function(){return this.progress},getWaveform:function(){return this.signal},getSpectrum:function(){return this.fft.spectrum},getTime:function(){return this.audio.currentTime},update:function(e){if(this.isPlaying&&this.isLoaded){var i,n=[],o=e.inputBuffer.numberOfChannels,r=t/o,s=function(t,e){return t[i]+e[i]};for(i=o;i--;)n.push(e.inputBuffer.getChannelData(i));for(i=0;i<r;i++)this.signal[i]=o>1?n.reduce(s)/o:n[0][i]}}},Dancer.adapters.webaudio=e}();
	
	var outerThis = this;

	var settings = $.extend({
        chapters: [],
        fadeOutSpeed: 3
    }, options );

    var classes = {
    	'player': '.simpleAudioPlayer',
    	'progressBar': '.progressBar',
    	'progressBarInner': '.progressBarInner',
    	'progressIndicator': '.progressIndicator',
    	'progressTime': '.progressTime',
    	'durationTime': '.durationTime',
    	'waves': '.waves',
    	'play': '.play',
    	'pause': '.pause',
    	'stop': '.stop',
    	'forward': '.forward',
    	'backward': '.backward',
    	'menuToggle': '.menuToggle',
    	'chapterList': '.chapterList',
    	'chapterLink': '.chapterLink'
    	/*'faster': '.faster',
    	'slower': '.slower',
    	'resetSpeed': '.resetSpeed',
    	'fadeOut': '.fadeOut',*/
    };

    return this.each(function(index, element) {
    	
    	// some setup
    	
    	var self = $(this);
		var hash = $(classes.player).length;

    	if (self.prop( 'tagName' ).toLowerCase() != 'audio') {
			return false;
		}

		settings.title = settings.title || self.data('title') || "Simple Audio Player";

		// load audio file, bind to dancer & calculate waveform amplitude 

		var audioSrc = (typeof audioSrc == 'undefined') ? self.attr('src') : false;
		if (!audioSrc) return false;

	    var a = new Audio(audioSrc);
		var audio = new Dancer();
		audio.load(a);
		var wave = audio.getWaveform();
		var ampInt = null;
		
		// build the markup and hide html5 audio element 
		
		var wrapper = '<div class="' + classes['player'].substr(1) + '">' +
			'<div class="containerTop cf">' +
				'<div class="' + classes['progressBar'].substr(1) + '">' +
					'<div class="' + classes['progressBarInner'].substr(1) + '"></div>' +
					'<div class="' + classes['progressIndicator'].substr(1) + '"></div>' +
				'</div>' +
				'<div class="trackInfo cf">' +
					'<div class="' + classes['progressTime'].substr(1) + '">&nbsp;</div>' +
					'<div class="trackTitle">' + settings.title + '</div>' +
					'<div class="' + classes['durationTime'].substr(1) + '">&nbsp;</div>' +
				'</div>' +
				'<div id="waves' + hash + '" class="' + classes['waves'].substr(1) + '"></div>' +
				'<div class="controls row">' +
					'<div class="col c2 ' + classes['menuToggle'].substr(1) + '">&nbsp;</div>' +
					'<div class="col c2 ' + classes['backward'].substr(1) + '"><span class="icon icon-backward"></span></div>' +
					'<div class="col c4 ' + classes['play'].substr(1) + '"><span class="icon icon-play"></span></div>' +
					'<div class="col c4 hide ' + classes['pause'].substr(1) + '"><span class="icon icon-pause"></span></div>' +
					'<div class="col c2 ' + classes['forward'].substr(1) + '"><span class="icon icon-forward"></span></div>' +
					'<div class="col c2 ' + classes['stop'].substr(1) + '"><span class="icon icon-stop"></span></div>' +
				'</div>' +
			'</div>' +
			'<div class="containerBottom cf">' +
				'<div class="' + classes['chapterList'].substr(1) + '">' +
				'</div>' +
			'</div>' +
		'</div>';

		var player = $(wrapper).insertAfter(self);
		self.css( { 'width': 0, 'height': 0, 'visibility': 'hidden' } );

		// amplitude curve

		var SW = new SiriWave({
			container: document.getElementById('waves' + hash),
			amplitude: 0
		});

		function get(index) {
			return player.find(classes[index]);
		}

		// chapters
		
		if (settings.chapters.length > 0) {
			$(classes.player).addClass('hasChapters');
			get('menuToggle').append('<span class="icon icon-menu"></span>');
			
			var chaptersList = '<ul>';
			for (var i = 0; i < settings.chapters.length; i++) {
				chaptersList += '<li><a class="' + classes['chapterLink'].substr(1) + '" data-chapter="' + settings.chapters[i].seconds + '">' + settings.chapters[i].title + '</a></li>';
			}
			chaptersList += '</ul>';
			get('chapterList').append(chaptersList);
		}

		// public methods
		 
		outerThis.jumpBy = function(offset) {
			jumpBy(offset);
		}
		outerThis.jumpTo = function(offset) {
			jumpTo(offset);
		}
		outerThis.fadeOut = function(duration) {
			fadeOut(duration);
		}
		outerThis.fadeOutAfterSeconds = function(duration, offset) {
			fadeOutAfterSeconds(duration, offset);
		}
		outerThis.fadeOutAfterChapter = function(duration, chapter) {
			fadeOutAfterChapter(duration, chapter);
		}
		outerThis.fadeOutAfterPercent = function(duration, percentage) {
			fadeOutAfterPercent(duration, percentage);
		}

		// bind functionality

		get('progressBar').on('click', sapProgress);
		get('play').on('click', sapPlay);
		get('pause').on('click', sapPause);
		get('menuToggle').on('click', sapToggleChapters);
		get('stop').on('click', sapStop);
		get('forward').on('click', sapForward);
		get('backward').on('click', sapBackward);
		get('chapterLink').on('click', sapChapter);
		get('progressBar')
			.on('mouseenter', sapProgressEnter)
		    .on('mouseleave', sapProgressLeave);
		/*get('faster').on('click', sapFaster);
		get('slower').on('click', sapSlower);
		get('resetSpeed').on('click', sapResetSpeed);*/

		// key bindings
		
		$(window).keydown(function(e) {
			switch(e.keyCode) {
				case 32:
					(audio.audio.paused) ? sapPlay() : sapPause();
					break;
				case 37:
					sapBackward();
					break;
				case 39:
					sapForward();
					break;
			}
		})

		// bound functions

		function sapPlay() {
			audio.play();
			ampInt = setInterval(makeWave, 100);
			togglePlayPause();
			$(classes.player).trigger({
				'type': 'sapPlay',
				'hash': hash
			});
		}

		player.on('sapPlay', function(e) {
			if(e.hash == hash) return;
			if(!audio.audio.paused) {
				sapPause();
			}
		});

		function sapPause() {
			audio.pause();
			stopWave();
			togglePlayPause();
		}

		function sapStop() {
			resetPlaybackTime();
		}

		function sapFaster() {
			audio.audio.playbackRate += 0.1;
		}

		function sapSlower() {
			audio.audio.playbackRate -= 0.1;
		}

		function sapResetSpeed() {
			audio.audio.playbackRate = 1;
		}

		function sapForward() {
			jumpBy(15);
		}

		function sapBackward() {
			jumpBy(-15);
		}

		function sapToggleChapters() {
			get('chapterList').slideToggle();
		}

		function sapChapter() {
			jumpTo($(this).data('chapter'));
		}

		function sapProgress(e) {
		    var leftOffset = e.pageX - $(this).offset().left;
		    var songPercents = leftOffset / $(this).innerWidth();
		    var seconds = songPercents * audio.audio.duration;
		    jumpTo(seconds);
		}

		function sapProgressEnter() {
			this.iid = setInterval(function() {
				setIndicatorPosition();
		    }, 10);
		}

		function sapProgressLeave() {
			this.iid && clearInterval(this.iid);
		}

		// helper functions

		function makeWave() {
			var waveFormula = Math.abs(getAverageFromArray(wave)) * 100;
			SW.setAmplitude(waveFormula);
		}

		function getAverageFromArray(avgArray) {
			var total = 0;
			for(var i = 0; i < avgArray.length; i++) { total += avgArray[i]; }
			return total / avgArray.length;
		}
		 
		function setIndicatorPosition() {
			get('progressBar').on('mousemove', function(e) {
			    var leftOffset = e.pageX - $(this).offset().left;
			    var songPercents = leftOffset / $(this).innerWidth() * 100;
			    get('progressIndicator').css('left', songPercents + '%');
			})
		}

		setInterval(function() {
			if (!audio.audio.paused) {
				refreshUI();
			} else if (audio.audio.currentTime == audio.audio.duration) {
				resetPlaybackTime();
			}
		}, 100);

		function refreshUI() {
			showTime();
			showProgress();
		}

		function showTime() {
			var duration = audio.audio.duration - audio.audio.currentTime;
			var durationMinutes = Math.round(Math.floor(duration / 60));
			var durationSeconds = Math.round(duration - durationMinutes * 60);
			var durationTime = ('0'  + durationMinutes).slice(-2)+':'+('0' + durationSeconds).slice(-2);

			var current = audio.audio.currentTime;
			var currentMinutes = Math.round(Math.floor(current / 60));
			var currentSeconds = Math.round(current - currentMinutes * 60);
			var currentTime = ('0'  + currentMinutes).slice(-2)+':'+('0' + currentSeconds).slice(-2);

			get('progressTime').html(currentTime);
			get('durationTime').html('- ' + durationTime);
		}

		function showProgress() {
			var percent = audio.audio.currentTime / audio.audio.duration * 100;
			$(get('progressBarInner')).css('width', percent + '%');
		}
		 
		function togglePlayPause() {
			get('play').toggleClass('hide');
			get('pause').toggleClass('hide');
		}

		function resetPlaybackTime() {
			audio.pause();
			audio.audio.currentTime = 0;
			audio.audio.volume = 1;
			stopWave();
			get('play').removeClass('hide');
			get('pause').addClass('hide');
			refreshUI();
		}

		function stopWave() {
			clearInterval(ampInt);
			SW.setAmplitude(0);
		}

		function fadeOut(duration) {	
		 	duration = (typeof duration !== 'undefined') ? duration : settings.fadeOutSpeed;		
			var speed = duration/1000;
			if(audio.audio.volume > 0.001){
	        	audio.audio.volume -= 0.001;
		        setTimeout(fadeOut, speed);
		    }else{
		       	resetPlaybackTime();
		    }
		}

		function jumpBy(offset) {
			if (!offsetIsValid(offset)) return; 
			audio.audio.currentTime += offset;
			refreshUI();
		}

		function jumpTo(second) {
			audio.audio.currentTime = second;
			refreshUI();
		}

		function offsetIsValid(offset) {
			var positiveValidOffset = offset > 0 && audio.audio.currentTime < (audio.audio.duration - offset);
			var negativeValidOffset = offset < 0 && ((audio.audio.currentTime + offset) > 0);
			return (positiveValidOffset || negativeValidOffset) ? true : false;
		}

		function fadeOutAfterSeconds(duration, offset) {
			offset = (typeof offset !== 'undefined') ? offset * 1000 : 0;
			setTimeout(fadeOut, offset, duration);
		}

		function fadeOutAfterChapter(duration, chapter) {
			chapter = (typeof chapter !== 'undefined') ? chapter : 1;
			var chapterTime = settings.chapters[chapter-1] * 1000;
			setTimeout(fadeOut, chapterTime, duration);
		}

		function fadeOutAfterPercent(duration, percentage) {
			percentage = (typeof percentage !== 'undefined') ? percentage : 30;
			setTimeout(fadeOut, audio.duration*(percentage/100), duration);
		}

		// init() function can be used instead of calling refreshUI directly - currently there's no need for it
		setTimeout(refreshUI, 200);
    }); 
};