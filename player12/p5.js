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
        'time': '4:18'
      },{
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - All By Myself.mp3',
        'thumb': 'https://madegrandbycam.com/wp-content/uploads/2017/02/dionceline_.jpg',
        'trackName': 'All By Myself',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'Falling into You (1996)',
        'time': '3:58'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - Because You Loved Me.mp3',
        'thumb': 'https://images-na.ssl-images-amazon.com/images/I/7115ubghVQL._SL1500_.jpg',
        'trackName': 'Because You Loved Me',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'Falling into You (1996)',
        'time': '4:37'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline%20Dion%20-%20Goodbyes%20(The%20Saddest%20Word).mp3',
        'thumb': 'https://fm100.com/wp-content/uploads/sites/12/2019/02/celine-2015-instagram-updated.jpg',
        'trackName': 'Goodbyes (The Saddest Word)',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'A New Day Has Come (2002)',
        'time': '5:19'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - I Drove All Night.mp3',
        'thumb': 'https://images.genius.com/93e98623a4a1122c07d2e44fd0d821fa.1000x1000x1.jpg',
        'trackName': 'I Drove All Night',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'One Heart (2003)',
        'time': '3:58'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - I Surrender.mp3',
        'thumb': 'https://3.bp.blogspot.com/-zM9bo9kDBr4/UcnHqldRaAI/AAAAAAABE-M/9LTPP4yeaC8/s1600/Celine-Dion-wallpapers-20.jpg',
        'trackName': 'I Surrender',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'A New Day Has Come (2002)',
        'time': '4:49'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline%20Dion%20-%20I%20am%20Alive.mp3',
        'thumb': 'https://upload.wikimedia.org/wikipedia/en/d/dd/Celine_dion-im_alive_s.jpg',
        'trackName': 'I am Alive',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'A New Day Has Come (2002)',
        'time': '3:28'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - Immortality.mp3',
        'thumb': 'https://images-na.ssl-images-amazon.com/images/I/61O4jjrOaxL._SL1200_.jpg',
        'trackName': 'Immortality',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'Lets Talk About Love (1997)',
        'time': '4:10'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - Its All Coming Back To Me Now.mp3',
        'thumb': 'https://th.bing.com/th/id/Rf0ddff7d9afd68c09d41af845603e03d?rik=uaGB8VRHFGmg8A&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1331516%2fimages%2fo-CELINE-DION-facebook.jpg&ehk=vh1dOMPOf6ymMmNnAjpRFQnZLnIbwVeq1FBQYIr8asc%3d&risl=&pid=ImgRaw',
        'trackName': 'Its All Coming Back To Me Now',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'Falling into You (1996)',
        'time': '7:36'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - Prayer.mp3',
        'thumb': 'https://images-na.ssl-images-amazon.com/images/I/71wlm4z8eGL._SL1500_.jpg',
        'trackName': 'The Prayer',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'These Are Special Times (1998)',
        'time': '5:35'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - Sorry For Love.mp3',
        'thumb': 'https://cdn2.stylecraze.com/wp-content/uploads/2020/03/Conclusion.jpg',
        'trackName': 'Sorry For Love',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'A New Day Has Come (2002)',
        'time': '4:11'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - Super Love.mp3',
        'thumb': 'https://i.pinimg.com/736x/16/25/fc/1625fc3691e398099fa2ed41721c9fe4--c%C3%A8line-dion-passion-music.jpg',
        'trackName': 'Super Love',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'A New Day Has Come (2002)',
        'time': '4:18'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - Thats The Way It Is.mp3',
        'thumb': 'https://upload.wikimedia.org/wikipedia/en/5/5d/Celine_Dion_-_All_the_Way-_A_Decade_of_Song_cover.jpg',
        'trackName': 'Thats The Way It Is',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'All the Way... A Decade of Song (1999)',
        'time': '4:02'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - The Power Of Love.mp3',
        'thumb': 'https://lastfm.freetls.fastly.net/i/u/ar0/f857e77d32064be7b9069eb32a7b92a2.jpg',
        'trackName': 'The Power Of Love',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'The Colour of My Love (1993)',
        'time': '4:46'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - To Love You More.mp3',
        'thumb': 'https://i1.sndcdn.com/artworks-000016613073-ppw731-t500x500.jpg',
        'trackName': 'To Love You More',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'The Colour of My Love (1993)',
        'time': '5:28'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - Water From The Moon.mp3',
        'thumb': 'https://images-na.ssl-images-amazon.com/images/I/71koWnmPRIL._SL1500_.jpg',
        'trackName': 'Water From The Moon',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'Celine Dion (1992)',
        'time': '4:16'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - When The Wrong One Loves You Right.mp3',
        'thumb': 'https://mp3jp-download.com/wp-content/uploads/2018/12/YPQHeOK.jpg',
        'trackName': 'When The Wrong One Loves You Right',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'A New Day Has Come (2002)',
        'time': '3:49'
      }, {
        'file': 'https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/Céline Dion - Where Does My Heart Beat Now.mp3',
        'thumb': 'https://images-na.ssl-images-amazon.com/images/I/81arfauSkpL._SL1500_.jpg',
        'trackName': 'Where Does My Heart Beat Now',
        'trackArtist': 'Céline Dion',
        'trackAlbum': 'Unison (1990)',
        'time': '4:34'
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