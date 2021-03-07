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
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - A New Day Has Come.mp3',
        'thumb': 'https://images-na.ssl-images-amazon.com/images/I/81Qi7-sxp5L._SL1500_.jpg',
        'trackName': 'A New Day Has Come',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'A New Day Has Come (2002)',
        'time': ''
      },{
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - All By Myself.mp3',
        'thumb': 'https://images-na.ssl-images-amazon.com/images/I/7115ubghVQL._SL1500_.jpg',
        'trackName': 'All By Myself',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'Falling into You (1996)',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - Because You Loved Me.mp3',
        'thumb': 'https://images-na.ssl-images-amazon.com/images/I/7115ubghVQL._SL1500_.jpg',
        'trackName': 'Because You Loved Me',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'Falling into You (1996)',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
        'thumb': 'https://cdn.acidcow.com/pics/20160907/these_college_babes_01.jpg',
        'trackName': 'track 4',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
        'thumb': 'https://cdn.acidcow.com/pics/20160907/these_college_babes_01.jpg',
        'trackName': 'track 4',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
        'thumb': 'https://cdn.acidcow.com/pics/20160907/these_college_babes_01.jpg',
        'trackName': 'track 4',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
        'thumb': 'https://cdn.acidcow.com/pics/20160907/these_college_babes_01.jpg',
        'trackName': 'track 4',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
        'thumb': 'https://cdn.acidcow.com/pics/20160907/these_college_babes_01.jpg',
        'trackName': 'track 4',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
        'thumb': 'https://cdn.acidcow.com/pics/20160907/these_college_babes_01.jpg',
        'trackName': 'track 4',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
        'thumb': 'https://cdn.acidcow.com/pics/20160907/these_college_babes_01.jpg',
        'trackName': 'track 4',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
        'thumb': 'https://cdn.acidcow.com/pics/20160907/these_college_babes_01.jpg',
        'trackName': 'track 4',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
        'thumb': 'https://cdn.acidcow.com/pics/20160907/these_college_babes_01.jpg',
        'trackName': 'track 4',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
        'thumb': 'https://cdn.acidcow.com/pics/20160907/these_college_babes_01.jpg',
        'trackName': 'track 4',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
        'thumb': 'https://cdn.acidcow.com/pics/20160907/these_college_babes_01.jpg',
        'trackName': 'track 4',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
        'thumb': 'https://cdn.acidcow.com/pics/20160907/these_college_babes_01.jpg',
        'trackName': 'track 4',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
        'thumb': 'https://cdn.acidcow.com/pics/20160907/these_college_babes_01.jpg',
        'trackName': 'track 4',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
        'thumb': 'https://cdn.acidcow.com/pics/20160907/these_college_babes_01.jpg',
        'trackName': 'track 4',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }, {
        'file': 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
        'thumb': 'https://cdn.acidcow.com/pics/20160907/these_college_babes_01.jpg',
        'trackName': 'track 4',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }, {
        'file': 'https://www.bensound.com/bensound-music/bensound-highoctane.mp3',
        'thumb': 'https://th.bing.com/th/id/OIP.Eqg5RvK2bm0ZNsMzAWpCCQHaHa?pid=ImgDet&rs=1',
        'trackName': 'track 5',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'album',
        'time': ''
      }]
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
          'background-image': 'url(https://raw.githubusercontent.com/onysu/music-streaming/main/files/img/ony.png)'
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
        $('#npAction').text(function (i, text) {
          if (text === "paused ...") {
            return "sedang diputar ...";
          }
        })
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