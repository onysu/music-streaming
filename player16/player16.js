function _(query) {
  return document.querySelector(query);
}

function _all(query) {
  return document.querySelectorAll(query);
}
let songList = [{
    thumbnail: "In-the-Name-of-God.jpg",
    audio: "Dream Theater - In The Name Of God.mp3",
    songname: "In The Name Of God",
    artistname: "Dream Theater"
  },
  {
    thumbnail: "Suffocation-Infecting-The-Crypts.jpg",
    audio: "Suffocation - Infecting The Crypts.mp3",
    songname: "Infecting The Crypts",
    artistname: "Suffocation",
  },
  {
    thumbnail: "Pierced-From-Within.jpg",
    audio: "Suffocation - Pierced from Within.mp3",
    songname: "Pierced from Within",
    artistname: "Suffocation",
  },
  {
    thumbnail: "Victory.jpg",
    audio: "Bolt Thrower - ...for Victory.mp3",
    songname: "... for Victory",
    artistname: "Bolt Thrower",
  },
  {
    thumbnail: "Bolt-Thrower---Through-the-Eye-of-Terror.jpg",
    audio: "Bolt Thrower - Through The Eye Of Terror.mp3",
    songname: "Through The Eye Of Terror",
    artistname: "Bolt Thrower",
  },
  {
    thumbnail: "Simon_s_Song.jpg",
    audio: "Simon_s_Song.mp3",
    songname: "Simon's Song",
    artistname: "Dan Lebowitz",
  },
  {
    thumbnail: "Scanline.jpg",
    audio: "Scanline.mp3",
    songname: "Scanline",
    artistname: "Mike Relm",
  },
  {
    thumbnail: "Flight_To_Tunisia.jpg",
    audio: "Flight_To_Tunisia.mp3",
    songname: "Flight To Tunisia",
    artistname: "Causmic",
  },
  {
    thumbnail: "Calimba.jpg",
    audio: "Calimba.mp3",
    songname: "Calimba",
    artistname: "E's Jammy Jams",
  },
  {
    thumbnail: "Everglow.jpg",
    audio: "Everglow.mp3",
    songname: "Everglow",
    artistname: "Patrick Patrikios",
  }
];

let currentSongIndex = 0;

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

toggleSongList.addEventListener("click", function () {
  toggleSongList.classList.toggle("active");
  player.classList.toggle("activeSongList");
});

_(".player .player-list .list").innerHTML = (songList.map(function (song, songIndex) {
  return `
		<div class="item" songIndex="${songIndex}">
			<div class="thumbnail">
				<img src="../files/${song.thumbnail}">
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
  main.thumbnail.setAttribute("src", "../files/" + song.thumbnail);
  // document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("../files/${song.thumbnail}") center no-repeat`;
  // document.body.style.backgroundSize = "cover";
  main.songname.innerText = song.songname;
  main.artistname.innerText = song.artistname;
  main.audio.setAttribute("src", "../files/" + song.audio);
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
      main.nextControl.click();
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