$(window).on('load', function () { // memastikan seluruh situs dimuat
  $('#status').fadeOut(); // akan memudarkan animasi pemuatan terlebih dahulu
  $('#preloader').delay(500).fadeOut('slow'); // akan memudarkan DIV putih yang menutupi situs web.
  // checkTouchScreen();
})

$(document).ready(function () {
  (function (window, undefined) {
    var player = document.getElementById('ap');
    var audio;
    var preloadBar = player.querySelector('.line_preload');
    var seeking = false;
    var rightClick = false;
    var progressBar = player.querySelector('.line_played');
    var trackList = player.querySelector('.player_playlist_list');
    var t = {
      playList: [{
        'file': '../files/audio/adele/All I Ask.mp3',
        'thumb': '../files/img/All-I-Ask.jpg',
        'trackName': 'All I Ask',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Chasing Pavements.mp3',
        'thumb': '../files/img/Chasing-Pavements.jpg',
        'trackName': 'Chasing Pavements',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Dont You Remember.mp3',
        'thumb': '../files/img/Dont-You-Remember.jpg',
        'trackName': 'Dont You Remember',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Hello.mp3',
        'thumb': '../files/img/Hello.png',
        'trackName': 'Hello',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/I Miss You.mp3',
        'thumb': '../files/img/I-Miss-You.jpg',
        'trackName': 'I Miss You',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Love In The Dark.mp3',
        'thumb': '../files/img/Love-In-The-Dark.jpg',
        'trackName': 'Love In The Dark',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Make You Feel My Love.mp3',
        'thumb': '../files/img/Make-You-Feel-My-Love.jpg',
        'trackName': 'Make You Feel My Love',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Million Years Ago.mp3',
        'thumb': '../files/img/Million-Years-Ago.jpg',
        'trackName': 'Million Years Ago',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/One And Only.mp3',
        'thumb': '../files/img/One-And-Only.jpg',
        'trackName': 'One And Only',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Remedy.mp3',
        'thumb': '../files/img/Remedy.jpg',
        'trackName': 'Remedy',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/River Lea.mp3',
        'thumb': '../files/img/River-Lea.jpg',
        'trackName': 'River Lea',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Rolling In The Deep.mp3',
        'thumb': '../files/img/Rolling-In-The-Deep.png',
        'trackName': 'Rolling In The Deep',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Rumour Has It.mp3',
        'thumb': '../files/img/Rumour-Has-It.jpg',
        'trackName': 'Rumour Has It',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Send My Love (To Your New Lover).mp3',
        'thumb': '../files/img/Send-My-Love.jpg',
        'trackName': 'Send My Love (To Your New Lover)',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Set Fire To The Rain.mp3',
        'thumb': '../files/img/Set-Fire-To-The-Rain.jpg',
        'trackName': 'Set Fire To The Rain',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Skyfall Skrillex Remix.mp3',
        'thumb': '../files/img/Skyfall-Skrillex-Remix.jpg',
        'trackName': 'Skyfall Skrillex Remix',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Skyfall.mp3',
        'thumb': '../files/img/Skyfall.jpg',
        'trackName': 'Skyfall',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Someone Like You.mp3',
        'thumb': '../files/img/Someone-Like-You.jpg',
        'trackName': 'Someone Like You',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Turning Tables.mp3',
        'thumb': '../files/img/Turning-Tables.jpg',
        'trackName': 'Turning Tables',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/Water Under The Bridge.mp3',
        'thumb': '../files/img/Water-Under-The-Bridge.jpg',
        'trackName': 'Water Under The Bridge',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },{
        'file': '../files/audio/adele/When We Were Young.mp3',
        'thumb': '../files/img/When-We-Were-Young.jpg',
        'trackName': 'When We Were Young',
        'trackArtist': 'Adele',
        'trackAlbum': '',
        'time': '3:28'
      },
      ]
    };
    var arr = t.playList;
    var randomArr = arr.slice();
    addRandomLi.called = false;

    function addPlaylistLi() {
      for (var index = 0; index < arr.length; index++) {
        var trackFile = arr[index].file;
        var trackName = arr[index].trackName;
        var trackArtist = arr[index].trackArtist;
        var trackThumb = arr[index].thumb;
        var trackTime = arr[index].time;
        var count = index + 1;
        var html = "";

        html += '<li class="player_playlist_item" song="' + trackFile + '" cover="' + trackThumb + '" artist="' + trackArtist + '" data-track="' + count + '">' +
          '<div class="song_block" title="' + trackArtist + ' – ' + trackName + '">' +
          '<p class="title_block">' + trackName + '</p>' +
          '<p class="artist_block">' + trackArtist + '</p>' +
          '</div>' +
          '<div class="song_time">' + trackTime + '</div>' +
          '</li>';

        $(trackList).append(html);
      }
    }
    addPlaylistLi();
    clickOnSong();

    // Inisialisasi
    initAudio($('.player_playlist_list li:first-child'));

    // Fungsi Penginisialisasi
    function initAudio(element) {
      var song = element.attr('song');
      var title = $('.title_block', element).text();
      var artist = $('.artist_block', element).text();
      var cover = element.attr('cover');

      progressBar.closest('.timeline').addEventListener('mousedown', handlerBar, false);
      progressBar.closest('.timeline').addEventListener('mousemove', seek, false);
      document.documentElement.addEventListener('mouseup', seekingFalse, false);

      // Buat Objek Audio
      audio = new Audio(song);
      timeUpdate();
      autoPlayNext();

      // Setel Waktu saat ini dengan 00:00
      if (!audio.currentTime) {
        $('.time_played').html('0:00')
      }

      // Tambahkan judul dan nama artis di halaman utama
      $('#title').attr('title', artist + " – " + title).text(title);
      $('#artist').attr('title', artist + " – " + title).text(artist);

      // masukkan cover
      var a = {
        'background-image': 'url(' + cover + ')'
      },
        // tidak ada cover / cover default
        b = {
          'background-image': 'url(../files/img/me.jpg)'
        }
      // Jika Cover akan ditampilkan
      if (cover !== '') {
        $('.cover').css(a);
      }
      // Jika Cover tidak ada, tampilkan cover default
      else {
        $('.cover').css(b);
      }

      $('.player_playlist_list li').removeClass('active');
      element.addClass('active');
    }

    // Tombol Play and Pause
    $('.play_btn').on('click', function () {
      if (!audio.paused) {
        // Pause action
        audio.pause();
      } else {
        // Play action
        audio.play();
      }
      $('#play_circle').toggleClass('glyphicon-play').toggleClass('glyphicon-pause');
      // $('#npAction').text(function (i, text) {
      //   return text === "paused ..." ? "sedang diputar ..." : "paused ...";
      // })
      $('.time_played').fadeIn(400);
      timeUpdate();
    })

    // Tombol Next
    $('.next_btn').on('click', function () {
      clearTime();
      console.log("audio next");
      if (audio.paused) {
        $('#play_circle').removeClass('glyphicon-play').addClass('glyphicon-pause');
        $('#npAction').text(function (i, text) {
          if (text === "paused ...") {
            return "sedang diputar ...";
          }
        })
      }
      audio.pause();
      audio.loop = false;
      $('.repeat_btn').removeClass('active');
      var next = $('.player_playlist_list li.active').next();
      if (next.length == 0) {
        next = $('.player_playlist_list li:first-child');
      }
      initAudio(next);
      audio.load();
      audio.play();
      timeUpdate();
    })

    // Tombol Prev
    $('.prev_btn').on('click', function () {
      clearTime();
      if (audio.paused) {
        $('#play_circle').removeClass('glyphicon-play').addClass('glyphicon-pause');
        // $('#npAction').text(function (i, text) {
        //   if (text === "paused ...") {
        //     return "sedang diputar ...";
        //   }
        // })
      }
      audio.pause();
      audio.loop = false;
      $('.repeat_btn').removeClass('active');
      var prev = $('.player_playlist_list li.active').prev();
      if (prev.length == 0) {
        prev = $('.player_playlist_list li:last-child');
      }
      initAudio(prev);
      audio.load();
      audio.play();
      timeUpdate();
    })

    // Tombol Repeat
    $('.repeat_btn').on('click', function () {
      if (audio.loop == false) {
        audio.loop = true;
        $('.repeat_btn').addClass('active');
      } else {
        audio.loop = false;
        $('.repeat_btn').removeClass('active');
      }
    })

    // Tombol Random
    $('.random_btn').on('click', function () {
      if (addRandomLi.called == false) {
        addRandomLi.called = true;
        $(trackList).html('');
        addRandomLi();
        $('.random_btn').addClass('active');
      } else if (addRandomLi.called == true) {
        addRandomLi.called = false;
        $(trackList).html('');
        addPlaylistLi();
        $('.random_btn').removeClass('active');
      }

      //       if (!audio.paused) {

      //       }
      //       audio.pause();
      //       clearTime();
      //       audio.loop = false;
      //       $('.repeat_btn').removeClass('active');

      clickOnSong();
      // initAudio($('.player_playlist_list li:first-child'));
      // if (audio.paused) {
      //   $('#play_circle').removeClass('glyphicon-play').addClass('glyphicon-pause');
      //   $('#npAction').text(function(i, text) {
      //     if (text === "paused ...") {
      //       return "sedang diputar ...";
      //     }
      //   })
      // }
      // audio.play();
      // timeUpdate();
    })

    function addRandomLi() {
      // addRandomLi.called = true;
      randomArr = shuffle(randomArr);
      for (var index = 0; index < randomArr.length; index++) {
        trackFile = randomArr[index].file;
        trackName = randomArr[index].trackName;
        trackArtist = randomArr[index].trackArtist;
        trackThumb = randomArr[index].thumb;
        trackTime = randomArr[index].time;
        var count = index + 1;
        var html = "";
        html += '<li class="player_playlist_item" song="' + trackFile + '" cover="' + trackThumb + '" artist="' + trackArtist + '" data-track="' + count + '">' +
          '<div class="song_block" title="' + trackArtist + ' – ' + trackName + '">' +
          '<p class="title_block">' + trackName + '</p>' +
          '<p class="artist_block">' + trackArtist + '</p>' +
          '</div>' +
          '<div class="song_time">' + trackTime + '</div>' +
          '</li>';
        $(trackList).append(html);
      }
    }

    // KLIK LAGU
    function clickOnSong() {
      $('.player_playlist_list li').on('click', function () {
        if ($(this).hasClass('active') == true) {
          if (audio.paused) {
            $('#play_circle').removeClass('glyphicon-play').addClass('glyphicon-pause');
            $('#npAction').text(function (i, text) {
              if (text === "paused ...") {
                return "sedang diputar ...";
              }
            })
            audio.play();
          } else {
            $('#play_circle').addClass('glyphicon-play').removeClass('glyphicon-pause');
            $('#npAction').text(function (i, text) {
              if (text === "sedang diputar ...") {
                return "paused ...";
              }
            })
            audio.pause();
          }
        } else if ($(this).hasClass('active') == false) {
          audio.pause();
          clearTime();
          audio.loop = false;
          $('.repeat_btn').removeClass('active');
          $('#play_circle').removeClass('glyphicon-play').addClass('glyphicon-pause');
          $('#npAction').text(function (i, text) {
            if (text === "paused ...") {
              return "sedang diputar ...";
            }
          })
          initAudio($(this));
          audio.load();
          audio.play();
          timeUpdate();
        }
      })
    }

    function timeUpdate() {
      audio.addEventListener('loadedmetadata', function () {
        var time = audio.duration;

        $(audio).bind('timeupdate', function () {
          var value = 0;
          if (audio.currentTime > 0) {
            value = Math.floor((100 / time) * audio.currentTime);
          }
          $('.line_played').css('width', value + '%');

          // Dapatkan Jam dan Menit
          var curSecs = parseInt(audio.currentTime % 60);
          var curMins = parseInt((audio.currentTime) / 60) % 60;

          var secs = parseInt(time % 60);
          var mins = parseInt((time) / 60) % 60;

          // Tambahkan 0 jika kurang dari 10
          if (curSecs < 10) {
            curSecs = '0' + curSecs;
          }
          if (secs < 10) {
            secs = '0' + secs;
          }
          $('.time_played').html(curMins + ':' + curSecs);
          $('.full_time').html(mins + ':' + secs);

          if (audio.buffered) {
            var buffered = audio.buffered;
            if (buffered.length) {
              var loaded = Math.round(100 * buffered.end(0) / time);
              preloadBar.style.width = loaded + '%';
            }
          }
        })
      })
    }

    function clearTime() {
      $('.line_played').css('width', '0%');
      $('.time_played').html('0:00');
      // $('.full_time').html('0:00');
    }

    // Fungsi Shuffle
    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue, randomIndex;

      // Meskipun masih ada elemen yang harus diacak ...
      while (0 !== currentIndex) {

        // Pilih elemen yang tersisa ...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Dan tukar dengan elemen saat ini.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    // Setelah lagu berakhir, mainkan lagu berikutnya
    function autoPlayNext() {
      $(audio).on("ended", function () {
        clearTime();
        // audio.pause();
        var next = $('.player_playlist_list li.active').next();
        if (next.length === 0) {
          next = $('.player_playlist_list li:first-child');
        }
        initAudio(next);
        audio.load();
        audio.play();
        timeUpdate();
      })
    }

    // Pindah dan cari Progress Bar dan atur Waktu Saat Ini
    function moveBar(evt, el, dir) {
      var value;
      if (dir === 'horizontal') {
        value = Math.round(((evt.clientX - el.offset().left) + window.pageXOffset) * 100 / el.parentNode.offsetWidth);
        el.style.width = value + '%';
        return value;
      }
    }

    function handlerBar(evt) {
      rightClick = (evt.which === 3) ? true : false;
      seeking = true;
      seek(evt);
    }

    function seek(evt) {
      if (seeking && rightClick === false && audio.readyState !== 0) {
        var value = moveBar(evt, progressBar, 'horizontal');
        audio.currentTime = audio.duration * (value / 100);
      }
    }

    function seekingFalse() {
      seeking = false;
    }

    Element.prototype.offset = function () {
      var el = this.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      return {
        left: el.left + scrollLeft
      };
    };

    (function () {
      $('.playlist_btn').on('click', function () {
        $('.player_playlist').toggleClass('active');
        $('.glyphicon-menu-left').toggleClass('active');
        $('.waves').toggleClass('active');
        $('.album_wrap').toggleClass('active');
        $('.song_playing').toggleClass('active');
        $('.timeline_wrap').toggleClass('active');
        $('.player_btns').toggleClass('active');
        $('.line_played').toggleClass('active');
        $('.full_line').toggleClass('active');
        $('.time_of_song').toggleClass('active');
        $('.timeline_pointer').toggleClass('active');
        $('.line_preload').toggleClass('active');
      })
    })();

    (function () {
      $('.hamburger-menu').on('click', function () {
        $('.bar').toggleClass('active');
        $('.hamburger-menu').toggleClass('active');
        $('.playlist_btn').toggleClass('active');
        $('.nav_menu').toggleClass('active');
        $('.player_fade').toggleClass('active');
      })
      $('.player_fade').on('click', function () {
        $('.bar').removeClass('active');
        $('.hamburger-menu').removeClass('active');
        $('.playlist_btn').removeClass('active');
        $('.nav_menu').removeClass('active');
        $('.player_fade').removeClass('active');
      })
    })();

    // hapus teks
    function preventSelection(element) {
      var preventSelection = false;

      function addHandler(element, event, handler) {
        if (element.attachEvent)
          element.attachEvent('on' + event, handler);
        else
          if (element.addEventListener)
            element.addEventListener(event, handler, false);
      }

      function removeSelection() {
        if (window.getSelection) {
          window.getSelection().removeAllRanges();
        } else if (document.selection && document.selection.clear)
          document.selection.clear();
      }

      function killCtrlA(event) {
        var event = event || window.event;
        var sender = event.target || event.srcElement;
        if (sender.tagName.match(/INPUT|TEXTAREA/i))
          return;
        var key = event.keyCode || event.which;
        if (event.ctrlKey && key == 'A'.charCodeAt(0)) // 'A'.charCodeAt(0) bisa diganti dengan 65
        {
          removeSelection();
          if (event.preventDefault)
            event.preventDefault();
          else
            event.returnValue = false;
        }
      }
      addHandler(element, 'mousemove', function () {
        if (preventSelection)
          removeSelection();
      });
      addHandler(element, 'mousedown', function (event) {
        var event = event || window.event;
        var sender = event.target || event.srcElement;
        preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
      });
      addHandler(element, 'mouseup', function () {
        if (preventSelection)
          removeSelection();
        preventSelection = false;
      });
      addHandler(element, 'keydown', killCtrlA);
      addHandler(element, 'keyup', killCtrlA);
    }
    preventSelection(document);
  })(window);
});

// function checkTouchScreen() {
//   if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//     $('body').addClass('touch-screen');
//     return true;
//   } else {
//     $('body').removeClass('touch-screen');
//     return false;
//   }
// }

// ngopi

// Tombol Shuffle
//   function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex ;
//     // Meskipun masih ada elemen yang harus diacak ...
//     while (0 !== currentIndex) {
//       // Pilih elemen yang tersisa ...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;
//       // Dan tukar dengan elemen saat ini.
//       temporaryValue = array[currentIndex];
//       array[currentIndex] = array[randomIndex];
//       array[randomIndex] = temporaryValue;
//     }
//     return array;
//   }

// seret dan lepas Progress Bar versi sederhana
// $(".timeline").mouseup(function(e) {
//   var leftOffset = e.pageX - $(this).offset().left;
//   var songPercents = leftOffset / $('.timeline').width();
//   audio.currentTime = songPercents * audio.duration;
// });