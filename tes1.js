$(document).ready(function () {
  audio.src = playlist[choosen];
  $('.now_playing>.sliding>.name').empty();
  $('.now_playing>.sliding>.name').append(author_arr[choosen] + ' - ' + name_arr[choosen]);
  $('.now_playing>img').remove();
  $('.now_playing').append("<img src='" + img_arr[choosen] + "' width='40px' style='border-radius: 50%'>");
  $('img.play').remove();
  $('.right_panel').append("<img class='play' src='" + img_arr[choosen] + "'>");
});
var audio = new Audio(),
  duration = -1,
  choosen = 2,
  playlist = [
    'https://github.com/cuneydbolukoglu/CodePen/blob/master/audioplayer/audio/1.mp3?raw=true',
    'https://github.com/cuneydbolukoglu/CodePen/blob/master/audioplayer/audio/2.mp3?raw=true',
    'https://github.com/cuneydbolukoglu/CodePen/blob/master/audioplayer/audio/3.mp3?raw=true',
    'https://www.bensound.com/bensound-music/bensound-ukulele.mp3',
    'https://www.bensound.com/bensound-music/bensound-summer.mp3',
    'https://www.bensound.com/bensound-music/bensound-happyrock.mp3',
    'https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3',
    'https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3'
  ],

  img_arr = ["https://th.bing.com/th/id/OIP.njIdQQCIZOJuLls6eb5lGAHaHx?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/R3b2cdd49cf8fcc6d1c927e9729580b3d?rik=30FD3c%2f4wSUkyA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-K1VhfHJe7Pc%2fVLZ-LceIY5I%2fAAAAAAAAF4I%2fGxQTLweCx6E%2fs1600%2fbabe.jpg&ehk=R8m9hwHMUiGeOlnSG2m2RHzz9oA3%2bbyIu2KIt8xiUMA%3d&risl=&pid=ImgRaw",
    "https://yhstars.com/wp-content/uploads/2020/05/Alee_Babe-e1588668674688.jpg",
    "https://i1.wp.com/dynastyseries.com/wp-content/2019/03/Petite-Babe-@petite.babe-x-True-Beauty-@true_beauty1991-Fred-Luse-07324.jpg?resize=600%2C600&ssl=1",
    "https://i.pinimg.com/736x/2f/ac/c4/2facc40f8b10a4ebb4d53688f1df92e1--selfie-tips-best-selfies.jpg",
    "https://th.bing.com/th/id/OIP.OqHtVEH6S48MAHXbV7DNAAHaHK?pid=ImgDet&rs=1",
    "https://www.motorcycle.com/images/babes/babes_justene_00.jpg",
    "https://external-preview.redd.it/Lo5BLGPqy9Y8i-qmG8tz94UQwGxy4COQA6ruzPcbmZ0.jpg?auto=webp&s=e9e11459449f2297be99316c3633ae3f5e5e7c97"
  ],

  name_arr = ["Saturn Barz", "Delta", "let's go", "ukulele", "summer", "happyrock", "jazzyfrenchy", "acousticbreeze"],

  author_arr = ["Gorillaz", "C2C", "Stuck in the sound", "bensound", "bensound", "bensound", "bensound", "bensound"];


$('.skip.next').click(function () {
  choosen++;
});
$('.skip.prev').click(function () {
  choosen--;
});
$('.skip').click(function () {
  music_upadate();
});

function music_upadate() {
  audio.src = playlist[choosen];
  audio.play();
  image_update();
}

function image_update() {
  $('.now_playing>.sliding>.name').empty();
  $('.now_playing>.sliding>.name').append(author_arr[choosen] + ' - ' + name_arr[choosen]);
  $('.now_playing>img').remove();
  $('.now_playing').append("<img src='" + img_arr[choosen] + "' width='40px' style='border-radius: 50%'>");
  $('img.play').remove();
  $('.right_panel').append("<img class='play' src='" + img_arr[choosen] + "'>");
}

$('li:nth-child(1)').on('click', function () {
  choosen = 0;
  music_upadate();
});
$('li:nth-child(2)').on('click', function () {
  choosen = 1;
  music_upadate();
});
$('li:nth-child(3)').on('click', function () {
  choosen = 2;
  music_upadate();
});
$('li:nth-child(4)').on('click', function () {
  choosen = 3;
  music_upadate();
});
$('li:nth-child(5)').on('click', function () {
  choosen = 4;
  music_upadate();
});
$('li:nth-child(6)').on('click', function () {
  choosen = 5;
  music_upadate();
});
$('li:nth-child(7)').on('click', function () {
  choosen = 6;
  music_upadate();
});
$('li:nth-child(8)').on('click', function () {
  choosen = 7;
  music_upadate();
});
$('li:nth-child(9)').on('click', function () {
  choosen = 8;
  music_upadate();
});

audio.onloadedmetadata = function () {
  duration = this.duration;
};

$('#box').on('click', function () {
  if ($('#box').is(':checked')) {
    audio.play();
    audio.volume = 1;
  } else {
    audio.pause();
  }
});

var scale = .5,
  gl_scale = .8,
  input_vol = document.getElementById('input_vol'),
  volume = 1;

var timer = setInterval(function () {
  var i = audio.currentTime * (600 / duration) - 25,
    input = document.getElementById('input'),
    time = document.getElementById('time'),
    min = Math.floor(duration / 60),
    sec = Math.floor(duration) - min * 60;
  if (sec < 10) {
    sec = '0' + String(sec);
  }
  $('li:nth-child(odd)').css({
    'background': '#444'
  });
  $('li:nth-child(even)').css({
    'background': '#555'
  });
  $('li:nth-child(' + (choosen + 1) + ')').css({
    'background': '#222'
  });
  var minute = Math.floor(audio.currentTime / 60),
    second = Math.floor(audio.currentTime) - minute * 60;
  if (second < 10) {
    second = '0' + String(second);
  }
  time.style.fontSize = "20px";
  time.innerHTML = minute + ':' + second + ' / ' + min + ':' + sec;
  input.style.left = i + 'px';
  input_vol.style.height = audio.volume * 120 + 'px';
  audio.volume = volume;

  HTMLAudioElement.prototype.next = function () {
    choosen++;
    audio.src = playlist[choosen];
    audio.play();
    image_update();
  };

  audio.onended = function () {
    if ($('.loop_checkbox').is(':checked')) {
      audio.currentTime = 0;
      audio.play();
    } else {
      if ($('.shuffle_checkbox').is(':checked')) {
        choosen = randomInteger(0, playlist.length - 1);
        audio.src = playlist[choosen];
        audio.play();
        image_update();
      } else {
        audio.next();
      }
    }
  };

  function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

  if (audio.paused == true) {
    document.getElementById("box").checked = false;
  } else {
    document.getElementById("box").checked = true;
  }
  // $('.navigation').css({
  //   'transform': 'scale(' + scale + ')'
  // });
}, 0);

$('.slider').click(function (e) {
  var offset = $(this).offset();
  var relativeX = (e.pageX - offset.left) * (600 / (600 * scale * gl_scale));
  audio.currentTime = relativeX / (600 / duration);
});

$('.volume').click(function (e) {
  var offset = $(this).offset();
  var relativeY = (e.pageY - offset.top) * (600 / (600 * scale * gl_scale));
  volume = 1 - relativeY / 120;
  if (volume == 0) {
    $('.mute_checkbox').next('.fa').removeClass('fa-volume-off').addClass('fa-volume-up');
    current_volume = audio.volume;
  }
});

for (var i = 0; i < name_arr.length + 1; i++) {
  $('li:nth-child(' + i + ')').append("<img src='" + img_arr[i - 1] + "' width='40px'>");
  $('li:nth-child(' + i + ')>.text').append("<div class='name'>" + name_arr[i - 1] + "</div>");
  $('li:nth-child(' + i + ')>.text').append("<div class='author'>" + author_arr[i - 1] + "</div>");
}

$('.pitch:nth-child(1)').click(function () {
  audio.playbackRate = 0.5;
});
$('.pitch:nth-child(2)').click(function () {
  audio.playbackRate = 1;
});
$('.pitch:nth-child(3)').click(function () {
  audio.playbackRate = 3;
});
$('.pitch:nth-child(4)').click(function () {
  audio.playbackRate = 4;
});

$('.checkbox').change(function () {
  if ($(this).is(':checked')) {
    $(this).next('.fa').removeClass('fa-star-o').addClass('fa-star');
  } else {
    $(this).next('.fa').removeClass('fa-star').addClass('fa-star-o');
  }
});
var current_volume = 1;
$('.mute_checkbox').change(function () {
  if ($(this).is(':checked')) {
    $(this).next('.fa').removeClass('fa-volume-off').addClass('fa-volume-up');
    volume = current_volume;
  } else {
    $(this).next('.fa').removeClass('fa-volume-up').addClass('fa-volume-off');
    current_volume = audio.volume;
    volume = 0;
  }
});
$(document).ready(function () {
  audio.src = playlist[choosen];
  $('.now_playing>.sliding>.name').empty();
  $('.now_playing>.sliding>.name').append(author_arr[choosen] + ' - ' + name_arr[choosen]);
  $('.now_playing>img').remove();
  $('.now_playing').append("<img src='" + img_arr[choosen] + "' width='40px' style='border-radius: 50%'>");
  $('img.play').remove();
  $('.right_panel').append("<img class='play' src='" + img_arr[choosen] + "'>");
});
audio.onloadedmetadata = function () {
  duration = this.duration;
};

$('#box').on('click', function () {
  if ($('#box').is(':checked')) {
    audio.play();
    audio.volume = 1;
  } else {
    audio.pause();
  }
});

var scale = .5,
  gl_scale = .8,
  input_vol = document.getElementById('input_vol'),
  volume = 1;

var timer = setInterval(function () {
  var i = audio.currentTime * (600 / duration) - 25,
    input = document.getElementById('input'),
    input_slider = document.getElementById('input_slider'),
    time = document.getElementById('time'),
    min = Math.floor(duration / 60),
    sec = Math.floor(duration) - min * 60;
  if (sec < 10) {
    sec = '0' + String(sec);
  }
  $('li:nth-child(odd)').css({
    'background': '#444'
  });
  $('li:nth-child(even)').css({
    'background': '#555'
  });
  $('li:nth-child(' + (choosen + 1) + ')').css({
    'background': '#222'
  });
  var minute = Math.floor(audio.currentTime / 60),
    second = Math.floor(audio.currentTime) - minute * 60;
  if (second < 10) {
    second = '0' + String(second);
  }
  // input_slider.style.height = '20px';
  time.style.fontSize = "20px";
  time.innerHTML = minute + ':' + second + ' / ' + min + ':' + sec;
  input.style.left = i + 'px';
  // input_vol.style.height = audio.volume * 120 + 'px';
  audio.volume = volume;

  HTMLAudioElement.prototype.next = function () {
    choosen++;
    audio.src = playlist[choosen];
    audio.play();
    image_update();
  };

  audio.onended = function () {
    if ($('.loop_checkbox').is(':checked')) {
      audio.currentTime = 0;
      audio.play();
    } else {
      if ($('.shuffle_checkbox').is(':checked')) {
        choosen = randomInteger(0, playlist.length - 1);
        audio.src = playlist[choosen];
        audio.play();
        image_update();
      } else {
        audio.next();
      }
    }
  };

  function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

  if (audio.paused == true) {
    document.getElementById("box").checked = false;
  } else {
    document.getElementById("box").checked = true;
  }
  // $('.navigation').css({
  //   'transform': 'scale(' + scale + ')'
  // });
  $('#input_slider').draggable({
    axis: 'y',
    containment: 'parent',
    drag: handleDragStop
  });

  function handleDragStop(event, ui) {
    var offsetYPos = parseInt(ui.offset.top) - 174;
    $('li').css({
      'top': '-' + offsetYPos + 'px'
    });
  }
}, 0);
$('.slider').click(function (e) {
  var offset = $(this).offset();
  var relativeX = (e.pageX - offset.left) * (600 / (600 * scale * gl_scale));
  audio.currentTime = relativeX / (600 / duration);
});

$('.volume').click(function (e) {
  var offset = $(this).offset();
  var relativeY = (e.pageY - offset.top) * (600 / (600 * scale * gl_scale));
  volume = 1 - relativeY / 120;
  if (volume == 0) {
    $('.mute_checkbox').next('.fa').removeClass('fa-volume-off').addClass('fa-volume-up');
    current_volume = audio.volume;
  }
});

$('.pitch:nth-child(1)').click(function () {
  audio.playbackRate = 0.5;
});
$('.pitch:nth-child(2)').click(function () {
  audio.playbackRate = 1;
});
$('.pitch:nth-child(3)').click(function () {
  audio.playbackRate = 3;
});
$('.pitch:nth-child(4)').click(function () {
  audio.playbackRate = 4;
});

$('.checkbox').change(function () {
  if ($(this).is(':checked')) {
    $(this).next('.fa').removeClass('fa-star-o').addClass('fa-star');
  } else {
    $(this).next('.fa').removeClass('fa-star').addClass('fa-star-o');
  }
});
var current_volume = 1;
$('.mute_checkbox').change(function () {
  if ($(this).is(':checked')) {
    $(this).next('.fa').removeClass('fa-volume-off').addClass('fa-volume-up');
    volume = current_volume;
  } else {
    $(this).next('.fa').removeClass('fa-volume-up').addClass('fa-volume-off');
    current_volume = audio.volume;
    volume = 0;
  }
});