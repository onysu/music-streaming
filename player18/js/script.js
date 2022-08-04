const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    musicList = wrapper.querySelector(".music-list"),
    moreMusicBtn = wrapper.querySelector("#more-music"),
    closemoreMusic = musicList.querySelector("#close");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingSong();
});

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    // musicImg.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
    // mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
    musicImg.src = `../../files/img/${allMusic[indexNumb - 1].src}.jpg`;
    mainAudio.src = `../../files/audio/CelineDion/${allMusic[indexNumb - 1].src}.mp3`;
}

// mainkan fungsi musik
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

// fungsi Pause
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

// fungsi prev
function prevMusic() {
    musicIndex--; // penurunan musicIndex sebesar 1
    // jika musicIndex kurang dari 1 maka musicIndex akan menjadi panjang array sehingga musik terakhir diputar
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

// fungsi next
function nextMusic() {
    musicIndex++; // peningkatan musicIndex sebesar 1
    // jika musicIndex lebih besar dari panjang array maka musicIndex akan menjadi 1 sehingga musik pertama diputar
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

// tombol play / pause
playPauseBtn.addEventListener("click", () => {
    const isMusicPlay = wrapper.classList.contains("paused");
    //if isPlayMusic is true then call pauseMusic else call playMusic
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
});

// tombol prev
prevBtn.addEventListener("click", () => {
    prevMusic();
});

// tombol next
nextBtn.addEventListener("click", () => {
    nextMusic();
});

// perbarui lebar bilah kemajuan sesuai dengan waktu musik saat ini
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime; // mulai memutar lagu saat ini
    const duration = e.target.duration; // mendapatkan durasi total pemutaran lagu
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuartion = wrapper.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", () => {
        // perbarui total durasi lagu
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if (totalSec < 10) { // jika detik kurang dari 10 maka tambahkan 0 sebelum itu
            totalSec = `0${totalSec}`;
        }
        musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
    // perbarui memutar lagu waktu saat ini
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) { // jika detik kurang dari 10 maka tambahkan 0 sebelum itu
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// perbarui pemutaran lagu saat iniWaktu aktif sesuai dengan lebar bilah kemajuan
progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth; // mendapatkan lebar progress bar
    let clickedOffsetX = e.offsetX; // mendapatkan offset nilai x
    let songDuration = mainAudio.duration; // mendapatkan total durasi lagu

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic(); // memanggil fungsi playMusic
    playingSong();
});

// ubah lingkaran, acak, ulangi ikon saat klik on
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText; // mendapatkan tag ini innerText
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffled");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});

// kode untuk apa yang harus dilakukan setelah lagu berakhir
mainAudio.addEventListener("ended", () => {
    // kami akan melakukan sesuai dengan ikon berarti jika pengguna telah mengatur ikon ke
    // loop lagu maka kami akan mengulangi lagu saat ini dan akan melakukan yang sesuai
    let getText = repeatBtn.innerText; // mendapatkan tag ini innerText
    switch (getText) {
        case "repeat":
            nextMusic(); // memanggil fungsi Musik berikutnya
            break;
        case "repeat_one":
            mainAudio.currentTime = 0; // mengatur waktu audio saat ini ke 0
            loadMusic(musicIndex); // memanggil fungsi loadMusic dengan argumen, dalam argumen ada indeks lagu saat ini
            playMusic(); // memanggil fungsi playMusic
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1); // menghasilkan indeks/angka acak dengan rentang maksimum panjang array
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex == randIndex); // loop ini berjalan hingga nomor acak berikutnya tidak akan sama dengan musicIndex saat ini
            musicIndex = randIndex; // meneruskan randomIndex ke musicIndex
            loadMusic(musicIndex);
            playMusic();
            playingSong();
            break;
    }
});

// tampilkan daftar musik dengan mengklik ikon musik
moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
    moreMusicBtn.click();
});

const ulTag = wrapper.querySelector("ul");
// buat tag li sesuai dengan panjang array untuk daftar
for (let i = 0; i < allMusic.length; i++) {
    // kita berikan nama lagu, artis dari array
    let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">0:00</span>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
              </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag); // memasukkan li di dalam tag ul

    let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
    liAudioTag.addEventListener("loadeddata", () => {
        let duration = liAudioTag.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if (totalSec < 10) { // jika detik kurang dari 10 maka tambahkan 0 sebelum itu
            totalSec = `0${totalSec}`;
        };
        liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; // melewati total durasi lagu
        liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); // menambahkan atribut t-duration dengan total nilai durasi
    });
}

// mainkan lagu tertentu dari daftar klik tag li
function playingSong() {
    const allLiTag = ulTag.querySelectorAll("li");

    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration");

        if (allLiTag[j].classList.contains("playing")) {
            allLiTag[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }

        // jika indeks tag li sama dengan musicIndex maka tambahkan kelas bermain di dalamnya
        if (allLiTag[j].getAttribute("li-index") == musicIndex) {
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }

        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}

// fungsi klik li tertentu
function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex; // memperbarui indeks lagu saat ini dengan indeks li yang diklik
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}