/* TODO:
  - ADD timer (currentTime and duration)
*/

const tracks = [{
    id: "1",
    title: "Ukulele",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-ukulele.mp3",
    cover: "https://www.bensound.com/bensound-img/ukulele.jpg"
  },
  {
    id: "2",
    title: "Summer",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-summer.mp3",
    cover: "https://www.bensound.com/bensound-img/summer.jpg"
  },
  {
    id: "3",
    title: "Happy Rock",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-happyrock.mp3",
    cover: "https://www.bensound.com/bensound-img/happyrock.jpg"
  },
  {
    id: "4",
    title: "Jazzy Frenchy",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3",
    cover: "https://www.bensound.com/bensound-img/jazzyfrenchy.jpg"
  },
  {
    id: "5",
    title: "Acoustic Breeze",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
    cover: "https://www.bensound.com/bensound-img/acousticbreeze.jpg"
  },
  {
    id: "6",
    title: "Punky",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-punky.mp3",
    cover: "https://www.bensound.com/bensound-img/punky.jpg"
  },
  {
    id: "7",
    title: "Badass",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-badass.mp3",
    cover: "https://www.bensound.com/bensound-img/badass.jpg"
  },
  {
    id: "8",
    title: "Brazil Samba",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-brazilsamba.mp3",
    cover: "https://www.bensound.com/bensound-img/brazilsamba.jpg"
  },
  {
    id: "9",
    title: "Creepy",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-creepy.mp3",
    cover: "https://www.bensound.com/bensound-img/creepy.jpg"
  },
  {
    id: "10",
    title: "High Octane",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-highoctane.mp3",
    cover: "https://www.bensound.com/bensound-img/highoctane.jpg"
  }
];
const player = document.querySelector(".player");
const audio = player.querySelector(".player__audio");
const audioSource = audio.querySelector("source");
const songPanel = player.querySelector(".song-panel");
const songTitle = player.querySelector(".song-info__title");
const songArtist = player.querySelector(".song-info__artist");
const backButton = player.querySelector(".backward");
const playButton = player.querySelector(".play");
const forwardButton = player.querySelector(".forward");
const spinner = player.querySelector(".spinner");
const spinnerDisc = player.querySelector(".spinner__disc");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

let playing = false;
let trackSwitch = false;

const togglePlay = () => {
  // Play / Pause audio
  const method = audio.paused ? "play" : "pause";
  playing = audio.paused ? true : false;
  audio[method]();
};

const toggleSongPanel = () => {
  if (!trackSwitch) {
    // Skala disk
    spinnerDisc.classList.toggle("scale");

    // Tampilkan / Sembunyikan panel lagu
    songPanel.classList.toggle("playing");

    // Ubah ikon tombol
    playButton.classList.toggle("playing");
  }
};

const startSpin = () => {
  // Mulai memutar disk
  spinner.classList.add("spin");
};

const stopSpin = () => {
  // Berhenti memutar disk
  const spin = document.querySelector(".spin");
  spin.addEventListener(
    "animationiteration",
    () => {
      if (!playing) {
        spin.style.animation = "none";
        spinner.classList.remove("spin");
        spin.style.animation = "";
      }
    }, {
      once: true
    }
  );
};

const handleProgress = () => {
  // Perbarui progress bar.
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;

  // Lompat ke trek berikutnya jika di akhir lagu.
  if (percent === 100) {
    trackSwitch = true;
    handleForwardButton();
  }
};

const handleBackButton = () => {
  if (audio.currentTime <= 3) {
    const currentTrackId = parseInt(audioSource.dataset.trackid);
    const previousTrackId =
      currentTrackId === 1 ? "10" : (currentTrackId - 1).toString();
    const previousTrack = tracks.find((o) => o.id === previousTrackId);
    changeTrack(previousTrack);
  } else {
    audio.currentTime = 0;
  }
};

const handleForwardButton = () => {
  const currentTrackId = parseInt(audioSource.dataset.trackid);
  const nextTrackId =
    currentTrackId === 10 ? "1" : (currentTrackId + 1).toString();
  const nextTrack = tracks.find((o) => o.id === nextTrackId);
  changeTrack(nextTrack);
};

const changeTrack = (track) => {
  if (playing) trackSwitch = true;
  audioSource.setAttribute("src", track.src);
  audioSource.dataset.trackid = track.id;
  songTitle.innerHTML = track.title;
  songArtist.innerHTML = track.artist;
  spinnerDisc.style.backgroundImage = `url(${track.cover})`;
  audio.load();
  if (playing) {
    audio.addEventListener(
      "canplay",
      () => {
        audio.play();
      }, {
        once: true
      }
    );
    audio.addEventListener(
      "play",
      () => {
        trackSwitch = false;
      }, {
        once: true
      }
    );
  }
};

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
}

audio.addEventListener("play", startSpin);
audio.addEventListener("play", toggleSongPanel);
audio.addEventListener("pause", stopSpin);
audio.addEventListener("pause", toggleSongPanel);
audio.addEventListener("timeupdate", handleProgress);

backButton.addEventListener("click", handleBackButton);
playButton.addEventListener("click", togglePlay);
forwardButton.addEventListener("click", handleForwardButton);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));