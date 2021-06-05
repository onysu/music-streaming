$('.js-audio').each(function (index, el) {
  initAudioPlayer($(this), index);
});

$('.audio__slider').roundSlider({
  radius: 50,
  value: 0,
  startAngle: 90,
  width: 5,
  handleSize: '+6',
  handleShape: 'round',
  sliderType: 'min-range'
});

$('.audio__slider').on('drag, change', function (e) {
  var $this = $(this);
  var $elem = $this.closest('.js-audio');
  updateAudio(e, $elem);
  $this.addClass('active');
});

function updateAudio(e, $elem) {
  console.log(e.handle.value);
  var value = e.handle.value;
  // var thisPlayer = el.find('.js-audio'),
  var play = $elem.find('.play-pause'),
    circle = $elem.find('#seekbar'),
    getCircle = circle.get(0),
    totalLength = getCircle.getTotalLength(),

    //currentTime = $elem.find('audio')[0].currentTime,
    maxduration = $elem.find('audio')[0].duration;
  var y = value * maxduration / 100;
  $elem.find('audio')[0].currentTime = y;
}

function initAudioPlayer(player) {
  var audio = player.find('audio'),
    play = player.find('.play-pause'),
    circle = player.find('#seekbar'),
    getCircle = circle.get(0),
    totalLength = getCircle.getTotalLength();

  circle.attr({
    'stroke-dasharray': totalLength,
    'stroke-dashoffset': totalLength
  });

  play.on('click', function () {
    if (audio[0].paused) {
      $('audio').each(function (index, el) {
        $('audio')[index].pause();
      });
      $('.js-audio').removeClass('playing');
      audio[0].play();
      player.removeClass('paused');
      player.addClass('playing');
    } else {
      audio[0].pause();
      player.removeClass('playing');
      player.addClass('paused');
    }
  });

  audio.on('timeupdate', function () {
    var currentTime = audio[0].currentTime,
      maxduration = audio[0].duration,
      calc = totalLength - currentTime / maxduration * totalLength;

    circle.attr('stroke-dashoffset', calc);

    var value = Math.floor(currentTime / maxduration * 100);

    var slider = audio.closest('.js-audio').find('.audio__slider');
    $(slider).roundSlider('setValue', value);
  });

  audio.on('ended', function () {
    player.removeClass('playing');
    circle.attr('stroke-dashoffset', totalLength);
  });
}