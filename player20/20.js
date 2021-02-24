function _(query) {
  return document.querySelector(query);
}

function _all(query) {
  return document.querySelectorAll(query);
}
let songList = [{
    thumbnail: "Shallow.jpg",
    audio: "Lady Gaga Ft Bradley Cooper - Shallow.mp3",
    songname: "Shallow",
    artistname: "Lady Gaga Ft Bradley Cooper",
  },
  {
    thumbnail: "EndlessLove.png",
    audio: "Mariah Carey - Endless Love.mp3",
    songname: "Endless Love",
    artistname: "Mariah Carey",
  },
  {
    thumbnail: "Hero.png",
    audio: "Mariah Carey - Hero.mp3",
    songname: "Hero",
    artistname: "Mariah Carey",
  },
  {
    thumbnail: "I Still Believe.jpg",
    audio: "Mariah Carey - I Still Believe.mp3",
    songname: "I Still Believe",
    artistname: "Mariah Carey",
  },
  {
    thumbnail: "My All.jpg",
    audio: "Mariah Carey - My All.mp3",
    songname: "My All",
    artistname: "Mariah Carey",
  },
  {
    thumbnail: "We Belong Together.png",
    audio: "Mariah Carey - We Belong Together.mp3",
    songname: "We Belong Together",
    artistname: "Mariah Carey",
  },
  {
    thumbnail: "Without You.jpg",
    audio: "Mariah Carey - Without You.mp3",
    songname: "Without You",
    artistname: "Mariah Carey",
  },
  {
    thumbnail: "Un-Break My Heart.png",
    audio: "Toni Braxton - Un-Break My Heart.mp3",
    songname: "Un-Break My Heart",
    artistname: "Toni Braxton",
  },
  {
    thumbnail: "I Have Nothing.jpg",
    audio: "Whitney Houston - I Have Nothing.mp3",
    songname: "I Have Nothing",
    artistname: "Whitney Houston",
  },
  {
    thumbnail: "I Will Always Love You.jpg",
    audio: "Whitney Houston - I Will Always Love You.mp3",
    songname: "I Will Always Love You",
    artistname: "Whitney Houston",
  },
  {
    thumbnail: "When You Believe.png",
    audio: "Whitney Houston Ft. Mariah Carey - When You Believe.mp3",
    songname: "When You Believe",
    artistname: "Whitney Houston Ft. Mariah Carey",
  }
];

let currentSongIndex = 0;
let repeatToggle = false;

let player = _(".player"),
  toggleSongList = _(".player .toggle-list");

let main = {
  audio: _(".player .main audio"),
  thumbnail: _(".player .main img"),
  seekbar: _(".player .main input"),
  songname: _(".player .main .details h2"),
  artistname: _(".player .main .details p"),
  prevControl: _(".player .main .controls .prev-control"),
  playPauseControl: _(".player .main .controls .play-pause-control"),
  nextControl: _(".player .main .controls .next-control")
}

_(".player .main .controls .repeat-control").addEventListener("click", function () {
  repeatToggle = !repeatToggle;
});

toggleSongList.addEventListener("click", function () {
  toggleSongList.classList.toggle("active");
  player.classList.toggle("activeSongList");
});

_(".player .player-list .list").innerHTML = (songList.map(function (song, songIndex) {
  return `
    <div class="item" songIndex="${songIndex}">
      <div class="thumbnail">
        <img src="../files/img/${song.thumbnail}">
      </div>
      <div class="details">
        <h2>${song.songname}</h2>
        <p>${song.artistname}</p>
      </div>
    </div>
    `;
}).join(""));

let songListItems = _all(".player .player-list .list .item");
for (let i = 0; i < songListItems.length; i++) {
  songListItems[i].addEventListener("click", function () {
    currentSongIndex = parseInt(songListItems[i].getAttribute("songIndex"));
    loadSong(currentSongIndex);
    player.classList.remove("activeSongList");
  });
}

function loadSong(songIndex) {
  let song = songList[songIndex];
  main.thumbnail.setAttribute("src", "../files/img/" + song.thumbnail);
  document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)),
      url("../files/img/${song.thumbnail}") center no-repeat`;
  document.body.style.backgroundSize = "cover";
  main.songname.innerText = song.songname;
  main.artistname.innerText = song.artistname;
  main.audio.setAttribute("src", "../files/audio/" + song.audio);
  main.seekbar.setAttribute("value", 0);
  main.seekbar.setAttribute("min", 0);
  main.seekbar.setAttribute("max", 0);
  main.audio.addEventListener("canplay", function () {
    main.audio.play();
    if (!main.audio.paused) {
      main.playPauseControl.classList.remove("paused");
    }
    main.seekbar.setAttribute("max", parseInt(main.audio.duration));
    main.audio.onended = function () {
      if (repeatToggle == true) {
        loadSong(currentSongIndex);
      } else {
        main.nextControl.click();
      }
    }
  })
}
setInterval(function () {
  main.seekbar.value = parseInt(main.audio.currentTime);
}, 1000);
main.prevControl.addEventListener("click", function () {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songList.length + currentSongIndex;
  }
  loadSong(currentSongIndex);
});
main.nextControl.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex + 1) % songList.length;
  loadSong(currentSongIndex);
});
main.playPauseControl.addEventListener("click", function () {
  if (main.audio.paused) {
    main.playPauseControl.classList.remove("paused");
    main.audio.play();
  } else {
    main.playPauseControl.classList.add("paused");
    main.audio.pause();
  }
});
main.seekbar.addEventListener("change", function () {
  main.audio.currentTime = main.seekbar.value;
});
loadSong(currentSongIndex);