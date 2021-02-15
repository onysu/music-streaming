"gunakan dengan ketat";

/**
 * Music Player
 * Hotkeys:
 *   a - sebelumnya
 *   d / n - lanjut
 *   s / p - play / pause
 *   e / r - ulang
 *   q - shuffle
 *
 * @author Holly Springsteen
 */

const colors = {
  aqua: {
    25: "#A7DCCD",
    50: "#5FBFA4",
    80: "#2F7561"
  },
  metal: {
    5: "#F3F3F1",
    20: "#CFD0C8",
    50: "#868975",
    80: "#36372F",
    90: "#272822"
  }
};

// Elemen tombol kontrol
const buttons = {
  shuffle: document.querySelector("#controls .shuffle"),
  previous: document.querySelector("#controls .previous"),
  playPause: document.querySelector("#controls .play-pause"),
  next: document.querySelector("#controls .next"),
  repeat: document.querySelector("#controls .repeat")
};

// Elemen Jarak & Waktu
const songCurrentTime = document.querySelector(".song-current-time");
const songLength = document.querySelector(".song-length");
const trackingSlider = document.querySelector(".tracking-slider");
const volumeSlider = document.querySelector(".volume-slider");

// Art
const artPlayer = document.querySelector("#art .player");
const playerArt = document.querySelector("#art .player img");
// const wideArt = document.querySelector("#art .wide img");

// Playlist
const playlistBody = document.querySelector("#playlist tbody");
let playlistPlay = document.querySelectorAll("#playlist .play-pause");
let listItems = document.querySelectorAll("#playlist tbdoy tr");

// Elemen Audio
const audio = document.getElementById("player");

// Rute dasar untuk url arsip
const archiveBase = "https://raw.githubusercontent.com/onysu/music-streaming/main/files/audio/";

/*
 * Daftar dasar lagu dan metadatanya.
 *
{
  title: '',
  artist: '',
  duration: 0,
  album: {
    title: '',
    art: {
      square: '',
      wide: '',
    },
  },
  url: `${archiveBase}`,
},
 */
const songList = [{
    title: "A New Day Has Come",
    artist: "Céline Dion",
    duration: 268,
    album: {
      title: "A New Day Has Come (2002)",
      art: {
        square: "https://upload.wikimedia.org/wikipedia/id/4/43/Andhc01.jpeg",
        wide: "https://nowthisiswhatiwouldcallmusic.files.wordpress.com/2019/12/maxresdefault-e1575202359128.jpg?w=1280"
      }
    },
    url: `${archiveBase}/Céline Dion - A New Day Has Come.mp3`
  },
  {
    title: "All By Myself",
    artist: "Céline Dion",
    duration: 215,
    album: {
      title: "Falling into You (1996)",
      art: {
        square: "https://img.discogs.com/eybFTkAuAgvjh3BtbmdOJHK8Fy4=/fit-in/600x618/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-3557529-1335182634.jpeg.jpg",
        wide: "https://i.ytimg.com/vi/NaGLVS5b_ZY/maxresdefault.jpg"
      }
    },
    url: `${archiveBase}/Céline Dion - All By Myself.mp3`
  },
  {
    title: "Because You Loved Me",
    artist: "Céline Dion",
    duration: 233,
    album: {
      title: "Falling into You (1996)",
      art: {
        square: "https://upload.wikimedia.org/wikipedia/en/e/ea/Because_You_Loved_Me_%28C%C3%A9line_Dion_single_-_cover_art%29.jpg",
        wide: "https://i.ytimg.com/vi/8wstXdwpHA8/maxresdefault.jpg"
      }
    },
    url: `${archiveBase}/Céline Dion - Because You Loved Me.mp3`
  },
  {
    title: "Goodbye's (The Saddest Word)",
    artist: "Céline Dion",
    duration: 215,
    album: {
      title: "A New Day Has Come (2002)",
      art: {
        square: "https://img.discogs.com/pamj4PusRRFIm0oISKUVdcgfZNU=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1933943-1600299849-4834.jpeg.jpg",
        wide: "https://lh3.googleusercontent.com/proxy/obpCDg9y6uAPrmVOhvFGHKsN7IjpQPb5hp2VOqxghPztCbo1dBdD5XZi_funEvmAA3KwQ9HXUSOvlartQ-QpjRGc5TYVhJxYZEvq_oEW2DLoauShqwhDsZUs0EuuHfhhVXzHAW7R1px6JxNPjt1ntlc5KCPnV8PCR78Ioofu5A8NAPM0wJ-XFRc=s0-d"
      }
    },
    url: `${archiveBase}/Céline Dion - Goodbye's (The Saddest Word).mp3`
  },
  {
    title: "I Drove All Night",
    artist: "Céline Dion",
    duration: 242,
    album: {
      title: "One Heart (2003)",
      art: {
        square: "https://f4.bcbits.com/img/a0158260742_10.jpg",
        wide: "https://i.pinimg.com/originals/9e/b4/18/9eb418adf8b8d0711ce4093ae032b6d5.jpg"
      }
    },
    url: `${archiveBase}/Céline Dion - I Drove All Night.mp3`
  },
  {
    title: "I Surrender",
    artist: "Céline Dion",
    duration: 225,
    album: {
      title: "A New Day Has Come (2002)",
      art: {
        square: "https://c-sf.smule.com/rs-s80/arr/4d/b1/656849fc-bf36-4421-905e-24d18c283ff9_1024.jpg",
        wide: "https://i.pinimg.com/originals/5f/c1/f3/5fc1f34abfb64207421077360d4f373a.jpg"
      }
    },
    url: `${archiveBase}/Céline Dion - I Surrender.mp3`
  },
  {
    title: "I'm Alive",
    artist: "Céline Dion",
    duration: 233,
    album: {
      title: "A New Day Has Come (2002)",
      art: {
        square: "https://upload.wikimedia.org/wikipedia/en/d/dd/Celine_dion-im_alive_s.jpg",
        wide: "https://i.ytimg.com/vi/dvCRi7LxscA/maxresdefault.jpg"
      }
    },
    url: `${archiveBase}/Céline Dion - I'm Alive.mp3`
  },
  {
    title: "Immortality",
    artist: "Céline Dion",
    duration: 216,
    album: {
      title: "Let's Talk About Love (1997)",
      art: {
        square: "https://4.bp.blogspot.com/-ulMGzJMLvyI/TxBQkZ7kZcI/AAAAAAAAEY0/1M9BtMBDKCA/s1600/CELINE+DION+CD.jpg",
        wide: "https://lh3.googleusercontent.com/proxy/JkBDYuYtUxYp1FjN1wvF0qEiRbSwCYdep8bgRW_zFYoo0NgpfdDesGJGvoRqPbMgtmA1xrV5lu0hAmWUbI9m=s0-d"
      }
    },
    url: `${archiveBase}/Céline Dion - Immortality.mp3`
  },
  {
    title: "It's All Coming Back To Me Now",
    artist: "Céline Dion",
    duration: 245,
    album: {
      title: "Falling into You (1996)",
      art: {
        square: "https://cdn-s3.allmusic.com/release-covers/500/0001/451/0001451145.jpg",
        wide: "https://pbs.twimg.com/media/ERzHUfDW4AANiuK.jpg"
      }
    },
    url: `${archiveBase}/Céline Dion - It's All Coming Back To Me Now.mp3`
  },
  {
    title: "The Prayer",
    artist: "Céline Dion",
    duration: 245,
    album: {
      title: "These Are Special Times (1998)",
      art: {
        square: "https://images.genius.com/05e768ac0699ec455e5f1b3a0f6ba151.1000x1000x1.jpg",
        wide: "https://cdn-production-thumbor-vidio.akamaized.net/-q4HTl1-zHcNn8ANtEFZnPNDJQk=/640x360/filters:quality(90)/vidio-web-prod-video/uploads/video/image/1938254/celine-dion-andrea-bocelli-lady-gaga-john-legend-lang-lang-the-prayer_fnl-a7e0dd.jpg"
      }
    },
    url: `${archiveBase}/Céline Dion - Prayer.mp3`
  },
  {
    title: "Sorry For Love",
    artist: "Céline Dion",
    duration: 245,
    album: {
      title: "A New Day Has Come (2002)",
      art: {
        square: "https://m.media-amazon.com/images/I/51kWttt3oML._SS500_.jpg",
        wide: "https://nowthisiswhatiwouldcallmusic.files.wordpress.com/2019/10/dtvr8jjwsaeommp-e1571567447870.jpg"
      }
    },
    url: `${archiveBase}/Céline Dion - Sorry For Love.mp3`
  },
  {
    title: "Super Love",
    artist: "Céline Dion",
    duration: 245,
    album: {
      title: "A New Day Has Come (2002)",
      art: {
        square: "https://images-na.ssl-images-amazon.com/images/I/71qphqfeIBL.png",
        wide: "https://cdn-2.tstatic.net/tribunnews/foto/bank/images/my-heart-will-go-on-celine-dion.jpg"
      }
    },
    url: `${archiveBase}/Céline Dion - Super Love.mp3`
  },
  {
    title: "That's The Way It Is",
    artist: "Céline Dion",
    duration: 245,
    album: {
      title: "All the Way... A Decade of Song (1999)",
      art: {
        square: "https://upload.wikimedia.org/wikipedia/en/1/1b/That%27s_the_Way_It_Is_%28Celine_Dion_song%29.jpg",
        wide: "https://i.ytimg.com/vi/WQi8iySyRjc/maxresdefault.jpg"
      }
    },
    url: `${archiveBase}/Céline Dion - That's The Way It Is.mp3`
  },
  {
    title: "The Power Of Love",
    artist: "Céline Dion",
    duration: 245,
    album: {
      title: "The Colour of My Love (1993)",
      art: {
        square: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/The_Power_of_Love_%28Celine_Dion_version%29.jpg/220px-The_Power_of_Love_%28Celine_Dion_version%29.jpg",
        wide: "https://img-highend.okezone.com/okz/900/pictureArticle/thumbawahgsdysgdsygdysd.jpg"
      }
    },
    url: `${archiveBase}/Céline Dion - The Power Of Love.mp3`
  },
  {
    title: "To Love You More",
    artist: "Céline Dion",
    duration: 245,
    album: {
      title: "The Colour of My Love (1993)",
      art: {
        square: "https://c-sf.smule.com/rs-s21/arr/4a/42/c30cb5fd-6806-4649-85e0-aa12119c64cf_1024.jpg",
        wide: "https://i.ytimg.com/vi/8b0GzFeq3ok/maxresdefault.jpg"
      }
    },
    url: `${archiveBase}/Céline Dion - To Love You More.mp3`
  },
  {
    title: "Water From The Moon",
    artist: "Céline Dion",
    duration: 245,
    album: {
      title: "Celine Dion (1992)",
      art: {
        square: "https://c-sf.smule.com/rs-s26/arr/08/c7/3ea60c8d-0edf-41bf-87bc-6848acb28f54_1024.jpg",
        wide: "https://i.ytimg.com/vi/LNmEQKHzLIc/maxresdefault.jpg"
      }
    },
    url: `${archiveBase}/Céline Dion - Water From The Moon.mp3`
  },
  {
    title: "When The Wrong One Loves You Right",
    artist: "Céline Dion",
    duration: 245,
    album: {
      title: "A New Day Has Come (2002)",
      art: {
        square: "https://sowndhaus.audio/uploads/media/1133283653_1175993126_1605861119.jpg",
        wide: "https://i.pinimg.com/originals/4c/4c/85/4c4c85c11f9d5c595c661b580eb17d21.jpg"
      }
    },
    url: `${archiveBase}/Céline Dion - When The Wrong One Loves You Right.mp3`
  },
  {
    title: "Where Does My Heart Beat Now",
    artist: "Céline Dion",
    duration: 245,
    album: {
      title: "Unison (1990)",
      art: {
        square: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/WDMHBN.jpeg/220px-WDMHBN.jpeg",
        wide: "https://i.ytimg.com/vi/Hij_QxDkIJI/maxresdefault.jpg"
      }
    },
    url: `${archiveBase}/Céline Dion - Where Does My Heart Beat Now.mp3`
  }
];

/**
 * Berdasarkan daftar kelas untuk elemen tertentu, matikan kelas yang diterima.
 * Dapat menerima kedua string dengan kelas yang dipisahkan oleh spasi dan array kelas.
 *
 * @param {} element Elemen dom yang akan digunakan untuk beralih class.
 * @param {string|string[]} classes Class yang akan diaktifkan atau dinonaktifkan.
 */
function toggleClasses(element, classes) {
  const currentClasses = new Set(element.classList);
  // Pisahkan kelas berformat string ke dalam array atau terima parameter array
  const newClasses = _.isString(classes) ? classes.split(" ") : classes;

  for (const className of newClasses) {
    if (currentClasses.has(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  }
}

/**
 * Alihkan nilai boolean.
 *
 * @param {boolean} boolean Nilai boolean yang akan diubah menjadi benar atau salah.
 * @return {boolean} Mengembalikan nilai boolean yang berlawanan dengan yang diterima.
 */
function toggleBoolean(boolean) {
  return !boolean;
}

/**
 * Ubah detik menjadi format waktu yang dapat digunakan.
 *
 * @param {number|string} seconds Jumlah detik yang akan dikonversi.
 * @return {string} Mengembalikan string dengan format waktu (-: -: -).
 */
function secondsToHms(seconds) {
  const time = {
    hours: String(Math.floor(Number(seconds) / 3600)),
    minutes: String(Math.floor((Number(seconds) % 3600) / 60)),
    seconds: String(Math.floor((Number(seconds) % 3600) % 60))
  };

  if (time.hours && time.hours < 10) {
    time.hours = `0${time.hours}`;
  }
  if (time.minutes && time.minutes < 10) {
    time.minutes = `0${time.minutes}`;
  }
  if (time.seconds && time.seconds < 10) {
    time.seconds = `0${time.seconds}`;
  }

  if (time.hours !== "00") {
    return `${time.hours}:${time.minutes}:${time.seconds}`;
  } else {
    return `${time.minutes}:${time.seconds}`;
  }
}

/**
 * Pengaturan dasar untuk pemutar audio tertentu.
 */
class Player {
  constructor() {
    this.playing = new Set(buttons.playPause.classList).has("on");
    this.shuffle = new Set(buttons.shuffle.classList).has("on");
    this.repeat = new Set(buttons.repeat.classList).has("on");

    this.songIndex = 0;
    this.previousSong = songList.length - 1;

    this.song = songList[this.songIndex];

    this.randomOrder = new Set();
    this.randomIndex = 0;

    this.volume = 0.8;
  }

  /**
   * Perbarui metadata untuk lagu saat ini.
   *
   * @param {number} songIndex Parameter opsional untuk memaksa mengatur indeks lagu.
   */
  updateSong(songIndex) {
    this.previousSong = this.songIndex;
    this.songIndex = songIndex || this.songIndex;
    this.song = songList[this.songIndex];
    const song = this.song;

    audio.src = song.url;
    trackingSlider.value = 0;
    this.updateSongRangeValues();
    songLength.innerHTML = secondsToHms(song.duration);
    trackingSlider.max = song.duration;

    playerArt.src = song.album.art.square;
    wideArt.src = song.album.art.wide;

    document
      .querySelector(`tr[data-index="${this.previousSong}"]`)
      .classList.remove("playing");
    toggleClasses(
      document.querySelector(`tr[data-index="${this.songIndex}"]`),
      "playing"
    );
  }

  /**
   * Putar audio
   */
  play() {
    audio.play();
  }

  /**
   * Pause audio.
   */
  pause() {
    audio.pause();
  }

  /**
   * Cari di audio, perbarui waktu berdasarkan nilai rentang yang dipilih.
   */
  seek() {
    audio.currentTime = Number(trackingSlider.value);
    songCurrentTime.innerHTML = secondsToHms(audio.currentTime);
  }

  /**
   * Perbarui nilai rentang berdasarkan waktu saat ini di lagu.
   */
  updateSongRangeValues() {
    const value = (trackingSlider.value / this.song.duration) * 100;
    const buffer = 0;

    songCurrentTime.innerHTML = secondsToHms(trackingSlider.value);

    trackingSlider.style.background = `linear-gradient(to right, ${colors.aqua[50]} 0%, ${colors.aqua[50]} ${value}%, ${colors.metal[50]} ${value}%, ${colors.metal[50]} ${buffer}%, ${colors.metal[80]} ${buffer}%, ${colors.metal[80]} 100%)`;
  }

  /**
   * Sesuaikan volume.
   */
  adjustVolume() {
    const {
      value
    } = volumeSlider;
    const buffer = 0;

    audio.volume = value;

    volumeSlider.style.background = `linear-gradient(to right, ${
      colors.aqua[80]
    } 0%, ${colors.aqua[80]} ${value * 100}%, ${colors.metal[50]} ${
      value * 100
    }%, ${colors.metal[50]} ${buffer}%, ${colors.metal[80]} ${buffer}%, ${
      colors.metal[80]
    } 100%)`;
  }
}

/**
 * Penyiapan untuk set kontrol apa pun untuk player.
 */
class Controls extends Player {
  /**
   * Play atau Pause item daftar saat ini.
   */
  playPause() {
    this.playing = toggleBoolean(this.playing);
    toggleClasses(buttons.playPause, "on fa-play fa-pause");
    toggleClasses(artPlayer, "playing");

    const currentClasses = new Set(buttons.playPause.classList);

    if (currentClasses.has("on")) {
      this.play();
    } else {
      this.pause();
    }
  }

  /**
   * lanjut pindah ke item berikutnya dalam daftar.
   */
  next() {
    this.previousSong = this.songIndex;
    let playNext = true;

    toggleClasses(
      document.querySelector(`tr[data-index="${this.songIndex}"]`),
      "playing"
    );

    if (this.shuffle) {
      this.randomIndex++;

      if (this.randomIndex >= this.randomOrder.size) {
        this.randomIndex = 0;

        playNext = this.repeat;
      }

      this.songIndex = Array.from(this.randomOrder)[this.randomIndex];
    } else {
      this.songIndex++;

      if (this.songIndex >= songList.length) {
        this.songIndex = 0;

        playNext = this.repeat;
      }
    }

    this.updateSong();

    if (this.playing) {
      if (playNext) {
        this.play();
      } else {
        this.playPause();
      }
    }
  }

  /**
   * Pindah ke item sebelumnya dalam daftar.
   */
  previous() {
    toggleClasses(
      document.querySelector(`tr[data-index="${this.songIndex}"]`),
      "playing"
    );

    if (this.shuffle) {
      if (this.randomIndex === 0) {
        this.randomIndex = this.randomOrder.size;
      }
      this.randomIndex--;

      this.songIndex = Array.from(this.randomOrder)[this.randomIndex];
    } else {
      if (this.songIndex === 0) {
        this.songIndex = songList.length;
      }
      this.songIndex--;
    }

    this.updateSong();

    if (this.playing) {
      this.play();
    }
  }

  /**
   * Acak daftar, mainkan dalam urutan acak.
   */
  toggleShuffle() {
    this.shuffle = toggleBoolean(this.shuffle);
    toggleClasses(buttons.shuffle, "on");
    const currentClasses = new Set(buttons.shuffle.classList);

    if (currentClasses.has("on")) {
      this.randomOrder = new Set();
      this.randomIndex = 0;

      let randomIndex = this.songIndex;

      for (let index = 0; index < songList.length; index++) {
        // While loop untuk memastikan bahwa indeks yang ditambahkan ke urutan acak adalah unik, yang lain mengubah nilai indeks.
        while (this.randomOrder.has(randomIndex)) {
          randomIndex = Math.floor(Math.random() * songList.length);
        }

        this.randomOrder.add(randomIndex);
      }
    }
  }

  /**
   * Ulangi / putar daftar yang sedang diputar.
   */
  toggleRepeat() {
    this.repeat = toggleBoolean(this.repeat);
    toggleClasses(buttons.repeat, "on");
  }
}

// Buat contoh kontrol
const controls = new Controls();

// Tambahkan EventListener untuk tombol tersebut
buttons.playPause.addEventListener("click", () => {
  controls.playPause();
});
buttons.next.addEventListener("click", () => {
  controls.next();
});
buttons.previous.addEventListener("click", () => {
  controls.previous();
});
buttons.shuffle.addEventListener("click", () => {
  controls.toggleShuffle();
});
buttons.repeat.addEventListener("click", () => {
  controls.toggleRepeat();
});

audio.onended = () => {
  // Setelah lagu selesai, putar lagu berikutnya.
  controls.next();
};
audio.ontimeupdate = () => {
  trackingSlider.value = audio.currentTime;
  controls.updateSongRangeValues();
};

// Perbarui nilai rentang saat mengubah atau memindahkan scrubber.
trackingSlider.addEventListener("change", () => {
  controls.updateSongRangeValues();
  controls.seek();
});
trackingSlider.addEventListener("mousemove", () => {
  controls.updateSongRangeValues();
});

volumeSlider.addEventListener("change", () => {
  controls.adjustVolume();
});
volumeSlider.addEventListener("mousemove", () => {
  controls.adjustVolume();
});

// Ini adalah hotkeys!
document.onkeypress = (event) => {
  switch (event.keyCode) {
    // a - sebelumnya
    case 97: {
      controls.previous();
      break;
    }
    // d / n - lanjut
    case 100:
    case 110: {
      controls.next();
      break;
    }
    // s / p - play / pause
    case 115:
    case 112: {
      controls.playPause();
      break;
    }
    // e / r - ulang
    case 101:
    case 114: {
      controls.toggleRepeat();
      break;
    }
    // q - shuffle
    case 113: {
      controls.toggleShuffle();
      break;
    }
  }
};

/**
 * Bangun daftar putar dari rangkaian lagu yang diberikan.
 */
function buildPlaylist() {
  // Tambahkan lagu ke dom
  let html = "";
  songList.forEach((song, index) => {
    html += `
<tr data-index="${index}">
  <td class="play-pause"><img src="${song.album.art.square}"></td>
  <td>${song.title}</td>
  <td>${song.artist}</td>
  <td>${song.album.title}</td>
  <td>${secondsToHms(song.duration)}</td>
</tr>
`;
  });
  playlistBody.innerHTML = html;

  // Perbarui item daftar
  listItems = document.querySelectorAll("#playlist tbody tr");
  playlistPlay = document.querySelectorAll("#playlist .play-pause");

  // Tambahkan EventListener ke item daftar
  for (const listItem of listItems) {
    listItem.addEventListener("click", (event) => {
      const songIndex = event.target.parentElement.dataset.index;
      controls.updateSong(songIndex);

      if (controls.playing) {
        controls.play();
      }
    });

    listItem.addEventListener("dblclick", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!controls.playing) {
        controls.playPause();
      }
    });
  }

  for (const playlistPlayButton of playlistPlay) {
    playlistPlayButton.addEventListener("click", (event) => {
      if (!controls.playing) {
        controls.playPause();
      }
    });
  }
}

// Mulailah penyiapan.
window.onload = () => {
  buildPlaylist();
  controls.updateSong();
  controls.adjustVolume();
};