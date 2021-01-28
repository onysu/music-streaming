let vue = new Vue({
  el: "#app",
  data: {
    defaultSong: "https://res.cloudinary.com/dmf10fesn/video/upload/v1548882863/audio/Post_Malone_-_Wow._playvk.com.mp3",
    isPlaying: false,
    isLoaded: false,
    isCurrentlyPlaying: "",
    onRepeat: false,
    shuffle: false,

    loop: {
      state: false,
      value: 1
    },

    durationSeconds: 0,
    currentSeconds: 0,
    audioPlayer: undefined,
    previousVolume: 35,
    volume: 100,
    autoPlay: false,
    progressPercentageValue: "0%",

    songs: [{
        id: 1,
        title: "Wow",
        artist: "Post Malone",
        album: "",
        url: "https://res.cloudinary.com/dmf10fesn/video/upload/v1548882863/audio/Post_Malone_-_Wow._playvk.com.mp3",
        cover_art_url: "https://res.cloudinary.com/dmf10fesn/image/upload/v1548884701/audio/album%20arts/s-l300.jpg"
      },
      {
        id: 3,
        title: "Gods Plan",
        artist: "Drake",
        album: "",
        url: "https://res.cloudinary.com/dmf10fesn/video/upload/v1548884577/audio/Drake_-_Gods_Plan_NaijaExclusive.net.mp3",
        cover_art_url: "https://res.cloudinary.com/dmf10fesn/image/upload/v1548884622/audio/album%20arts/a2497580059_10.jpg"
      },

      {
        id: 6,
        title: "Hamble",
        artist: "Kendrick Lamar",
        album: "",
        url: "https://res.cloudinary.com/dmf10fesn/video/upload/v1548884988/audio/Kendrick-Lamar-HUMBLE.mp3",
        cover_art_url: "https://res.cloudinary.com/dmf10fesn/image/upload/v1548884891/audio/album%20arts/FwqM2g6.png"
      },
      {
        id: 5,
        title: "Chilling",
        artist: "Kwesi Arthur",
        album: "",
        url: "https://res.cloudinary.com/dmf10fesn/video/upload/v1548887340/audio/Kwesi-Arthur-Chill-Prod-by-Dannyedtracks.mp3",
        cover_art_url: "https://res.cloudinary.com/dmf10fesn/image/upload/v1548887458/audio/album%20arts/Kwesi-Arthur-Chill-Prod.-By-Dannyedtrackswww.Ghanasongs.com_.jpg"
      },
      {
        id: 2,
        title: "Better Now",
        artist: "Post Malone",
        album: "",
        url: "https://res.cloudinary.com/dmf10fesn/video/upload/v1548882769/audio/Post_Malone_-_Better_Now_playvk.com.mp3",
        cover_art_url: "https://res.cloudinary.com/dmf10fesn/image/upload/v1548884701/audio/album%20arts/s-l300.jpg"
      },

      {
        id: 4,
        title: "Dont Kill My Vibe",
        artist: "Kendrick Lamar",
        album: "",
        url: "https://res.cloudinary.com/dmf10fesn/video/upload/v1548884972/audio/Kendrick-Lamar-Bitch-Dont-Kill-My-Vibe.mp3",
        cover_art_url: "https://res.cloudinary.com/dmf10fesn/image/upload/v1548885857/audio/album%20arts/ae8e88aa099173dbee78d904f035e459bfb69f5a.jpg"
      }
    ],

    playlist: {
      currentIndex: 0,

      songs: [{
        id: 1,
        title: "Wow",
        artist: "Post Malone",
        album: "",
        url: "https://res.cloudinary.com/dmf10fesn/video/upload/v1548882863/audio/Post_Malone_-_Wow._playvk.com.mp3",
        cover_art_url: "https://res.cloudinary.com/dmf10fesn/image/upload/v1548884701/audio/album%20arts/s-l300.jpg"
      }]
    },
    previousPlaylistIndex: 0,
    hasNext: false,
    originalSongArray: [],

    currentSong: {
      id: "",
      title: "",
      artist: "",
      album: "",
      url: "",
      cover_art_url: ""
    },

    /** ui control variables*/

    showPlaylist: false
  },

  created() {
    this.innerLoop = this.loop.state;
  },

  mounted() {
    this.audioPlayer = this.$el.querySelectorAll("audio")[0];
    this.initPlayer();
  },

  methods: {
    /** UI control methods
     * these methods are used to control the ui*/

    toggleShowPlaylist() {
      this.showPlaylist = !this.showPlaylist;
    },

    /**Music player methods
     * these methods are used to control the music player*/

    initPlayer() {
      this.audioPlayer.src = this.playlist.songs[0].url;
      this.setCurrentSong(this.playlist.songs[0]);

      this.audioPlayer.addEventListener("timeupdate", this.updateTimer);
      this.audioPlayer.addEventListener("loadeddata", this.load);
      this.audioPlayer.addEventListener("pause", () => {
        this.isPlaying = false;
      });
      this.audioPlayer.addEventListener("play", () => {
        this.isPlaying = true;
      });

      this.audioPlayer.addEventListener("ended", this.playNextSongInPlaylist);
    },

    play(song = {}) {
      if (typeof song === "object") {
        if (this.isLoaded) {
          //check if song exists in playlist

          if (this.currentSong.id === song.id && this.isPlaying) {
            this.pause();
          } else if (this.currentSong.id === song.id && !this.isPlaying) {
            this.playCurrentSong();
          } else if (this.currentSong.id !== song.id) {
            if (!this.containsObjectWithSameId(song, this.playlist.songs)) {
              this.addToPlaylist(song);
            } else {
              console.log("playMethod", "song already in playlist");
            }

            this.setAudio(song.url);
            this.setCurrentSong(song);
            this.playlist.currentIndex = this.getObjectIndexFromArray(
              song,
              this.playlist.songs
            );
            this.previousPlaylistIndex = this.playlist.currentIndex;
            this.audioPlayer.play();
          }
        } else {
          this.setAudio(song.url);
          this.audioPlayer.play();
        }

        this.isPlaying = true;
      } else {
        throw new Error("Type Error : Song must be an object");
      }
    },

    playCurrentSong() {
      this.audioPlayer.play();
      this.isPlaying = true;
    },

    stop() {
      this.audioPlayer.currentTime = 0;
    },

    pause() {
      this.audioPlayer.pause();
      this.isPlaying = false;
    },

    repeat() {
      if (!this.loop.state && !this.onRepeat) {
        //firstclick
        this.loop.state = true;
        this.loop.value = 1;
        this.onRepeat = true;
      } else if (this.loop.state && this.onRepeat && this.loop.value === 1) {
        //second click
        this.loop.state = true;
        this.loop.value = "all";
        this.onRepeat = true;
      } else if (
        this.loop.state &&
        this.onRepeat &&
        this.loop.value === "all"
      ) {
        this.loop.state = false;
        this.loop.value = 1;
        this.onRepeat = false;
      }
    },

    skip(direction) {
      if (direction === "forward") {
        this.playlist.currentIndex += 1;
      } else if (direction === "backward") {
        this.playlist.currentIndex -= 1;
      }

      /**if the current Index of the playlist is greater or equal to the length of the playlist songs (the index is out of range)
       reset the index to 0. It could also mean that the playlist is at its end. */

      if (this.playlist.currentIndex >= this.playlist.songs.length) {
        this.playlist.currentIndex = 0;
      }

      if (this.playlist.currentIndex < 0) {
        this.playlist.currentIndex = this.playlist.songs.length - 1;
      }

      this.audioPlayer.src = this.playlist.songs[
        this.playlist.currentIndex
      ].url;
      this.setCurrentSong(this.playlist.songs[this.playlist.currentIndex]);

      //the code below checks if a song is playing so it can go ahead and auto play
      if (this.isPlaying) {
        this.audioPlayer.play();
      }
    },

    mute() {
      //this.muted is a computed variable available down below

      if (this.muted) {
        return (this.volume = this.previousVolume);
      } else {
        this.previousVolume = this.volume;
        this.volume = 0;
      }
    },

    updateTimer() {
      this.currentSeconds = parseInt(this.audioPlayer.currentTime);
      this.progressPercentageValue =
        (this.currentSeconds / parseInt(this.audioPlayer.duration) * 100 || 0) +
        "%";
    },

    seek(e) {
      if (this.isLoaded) {
        let el = e.target.getBoundingClientRect();
        let seekPos = (e.clientX - el.left) / el.width;
        let seekPosPercentage = seekPos * 100 + "%";

        /**
         *  calculating the portion of the song based on where the user clicked
         *
         */

        let songPlayTimeAfterSeek = parseInt(
          this.audioPlayer.duration * seekPos
        );

        this.audioPlayer.currentTime = songPlayTimeAfterSeek;

        this.progressPercentageValue = seekPosPercentage;
        console.log(this.progressPercentageValue);
      } else {
        throw new Error("Song Not Loaded");
      }
    },

    addAndPlayNext() {
      let selectedSong = {
        title: "Song Name 3",
        artist: "Artist Name",
        album: "Album Name",
        url: "./song2.mp3",
        cover_art_url: "/cover/art/url.jpg",
        isPlaying: false
      };

      //add the song to the playlist

      //get the index of the song that is currently being played in the player

      //insert the song at that position

      let indexOfCurrentSong = this.playlist.currentIndex;

      this.playlist.songs.splice(indexOfCurrentSong + 1, 0, selectedSong);
    },

    addToPlaylist(song) {
      this.playlist.songs.unshift(song);
    },

    dragSeek(e) {
      let el = e.target.getBoundingClientRect();
    },

    playNextSongInPlaylist() {
      if (this.onRepeat && this.loop.value === 1) {
        this.audioPlayer.play();
      } else {
        if (this.playlist.songs.length > 1) {
          if (this.random) {
            //generate a random number
            let randomNumber = this.generateRandomNumber(
              0,
              this.playlist.songs.length - 1,
              this.previousPlaylistIndex
            );

            //set the current index of the playlist
            this.playlist.currentIndex = randomNumber;

            //set the src of the audio player
            this.audioPlayer.src = this.playlist.songs[
              this.playlist.currentIndex
            ].url;
            //set the current song
            this.setCurrentSong(
              this.playlist.songs[this.playlist.currentIndex]
            );
            //begin to play
            this.audioPlayer.play();
          } else {
            /**if the current Index of the playlist is equal to the index of the last song played skip that song
             and add 1*/

            if (this.playlist.currentIndex === this.previousPlaylistIndex) {
              //increment the current index of the playlist by 1
              this.playlist.currentIndex += 1;
            }

            /**if the current Index of the playlist is greater or equal to the length of the playlist songs (the index is out of range)
             reset the index to 0. It could also mean that the playlist is at its end. */

            if (this.playlist.currentIndex >= this.playlist.songs.length) {
              if (this.onRepeat && this.loop.value === "all") {
                //if repeat is on then replay from the top
                this.playlist.currentIndex = 0;
              } else {
                return;
              }
            }

            this.audioPlayer.src = this.playlist.songs[
              this.playlist.currentIndex
            ].url;
            this.setCurrentSong(
              this.playlist.songs[this.playlist.currentIndex]
            );
            this.audioPlayer.play();
            this.playlist.currentIndex++;
          }
        } else {}
      }
    },

    shuffleToggle() {
      //shuffle the playlist songs and rearrange
      this.playlist.songs = this.shuffleArray(this.playlist.songs);

      //reset the playlist index when changed and rest the previous playlist index
      this.playlist.currentIndex = this.getObjectIndexFromArray(
        this.currentSong,
        this.playlist.songs
      );
      this.previousPlaylistIndex = this.playlist.currentIndex;
    },

    /** Helper methods
     * these methods are usually used within other methods*/

    formatTime(secs) {
      var minutes = Math.floor(secs / 60) || 0;
      var seconds = Math.floor(secs - minutes * 60) || 0;
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    },

    setAudio(song) {
      this.audioPlayer.src = song;
    },

    load() {
      if (this.audioPlayer.readyState >= 2) {
        this.isLoaded = true;
        this.durationSeconds = parseInt(this.audioPlayer.duration);
      } else {
        throw new Error("Failed to load sound file.");
      }
    },

    playlistHelper() {},

    containsObjectWithSameId(obj, list) {
      let i;
      for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
          return true;
        }
      }
    },

    getObjectIndexFromArray(obj, list) {
      //this function just returns the index of the item with the id
      let i;
      for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
          return i;
        }
      }
    },

    setCurrentSong(song) {
      this.currentSong.id = song.id;
      this.currentSong.title = song.title;
      this.currentSong.artist = song.artist;
      this.currentSong.album = song.album;
      this.currentSong.url = song.url;
      this.currentSong.cover_art_url = song.cover_art_url;

      this.previousPlaylistIndex = this.playlist.currentIndex;
    },

    generateRandomNumber(min, max, except) {
      let num = null;
      num = Math.floor(Math.random() * (max - min + 1)) + min;
      return num === except ? this.generateRandomNumber(min, max, except) : num;
    },

    shuffleArray(array) {
      let ctr = array.length;
      let temp;
      let index;

      // While there are elements in the array
      while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
      }
      return array;
    }
  },

  computed: {
    currentPlayedTime() {
      return this.formatTime(this.currentSeconds);
    },
    duration() {
      return this.formatTime(this.durationSeconds);
    },
    progressPercentage() {
      return parseInt(this.currentSeconds / this.durationSeconds * 100);
    },
    muted() {
      //this returns true or false
      return this.volume / 100 === 0;
    }
  }
});