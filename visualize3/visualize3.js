let select = document.getElementById("select"),
  audio = document.getElementById("audio"),
  status = document.getElementById("status"),
  metaTitle = document.getElementById("title"),
  metaCover = document.getElementById("cover"),
  metaBG = document.getElementById("bg"),
  canvas = document.getElementById("canvas"),
  color = "#ffffff",
  barWidth = 10,
  barGap = 5,
  statusTimeoutId = -1,
  canvasContext = document.getElementById("canvas").getContext("2d"),
  audioContext = new AudioContext(),
  analyser = audioContext.createAnalyser(),
  source = audioContext.createMediaElementSource(audio),
  bufferLength,
  dataArray;

function showStatus(text, timeout = 3000) {
  if (statusTimeoutId > 0) clearTimeout(statusTimeoutId);

  status.innerText = text;
  statusTimeoutId = setTimeout(() => {
    status.innerText = "Klik dua kali atau drag file audio di sini";
  }, timeout);
}

function readFile(f) {
  if (!f.type.match(/audio\/.*/)) {
    showStatus("Jenis file tidak didukung: " + f.type + ".");
    return;
  }

  musicmetadata(f, function (err, result) {
    metaTitle.innerText = "Judul Tidak Diketahui";
    metaBG.style.backgroundImage = null;
    metaCover.setAttribute("hidden", "");

    if (err) throw err;
    metaTitle.innerText =
      result.artist && result.artist.length > 0 ?
      result.artist.join(", ") :
      "Artis Tidak Dikenal";
    metaTitle.innerText +=
      result.title && result.title.length > 0 ?
      ` - ${result.title}` :
      " - Unknown Title";

    if (result.picture.length > 0) {
      var picture = result.picture[0];
      var url = URL.createObjectURL(
        new Blob([picture.data], {
          type: "image/" + picture.format
        })
      );
      metaBG.style.backgroundImage = `url(${url})`;
      metaCover.src = url;
      metaCover.removeAttribute("hidden");
    }
  });

  showStatus("Ready.");

  let reader = new FileReader();

  reader.onload = (e) => {
    audio.setAttribute("src", e.target.result);
    audio.play();
    showStatus("Playing...");
  };
  reader.readAsDataURL(f);
}

select.addEventListener("change", (e) => {
  readFile(e.target.files[0]);
});

source.connect(analyser);
analyser.connect(audioContext.destination);

function setup() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  analyser.fftSize = 4096;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
}

function draw() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  analyser.getByteFrequencyData(dataArray);

  let x = 0;

  let avg = 0;
  let max = 0;

  for (let i = 0; i < bufferLength / 4; i++) {
    const d = dataArray[i];
    avg += d;
    if (max < d) {
      max = d;
    }
  }

  avg = 1 + avg / (bufferLength / 4) / max;
  metaBG.style.filter = `blur(100px) brightness(${avg})`;

  for (let i = 0; i < bufferLength; i++) {
    if (x > canvas.width) break;
    const d = dataArray[i];

    canvasContext.fillStyle = color;
    canvasContext.fillRect(Math.floor(x), canvas.height - d, barWidth, d);

    x += barWidth + barGap;
  }
  requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
  setup();
});
setup();

draw(); // Start Drawing

canvas.addEventListener("dblclick", (e) => {
  e.preventDefault();
  select.click();
});

canvas.addEventListener("dragover", (e) => {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";

  let f = e.dataTransfer.items[0];
  if (!f.type.match(/audio.*/)) {
    showStatus("Jenis file tidak didukung: " + f.type + ".");
    e.dataTransfer.dropEffect = "none";
    return;
  }
  showStatus("Drag di sini...");
});

canvas.addEventListener("drop", (e) => {
  e.stopPropagation();
  e.preventDefault();
  readFile(e.dataTransfer.files[0]);
});