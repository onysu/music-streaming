const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
const audioElement = document.querySelector('audio');
const canvasElement = document.querySelector('canvas');
const canvasCtx = canvasElement.getContext('2d');

const WIDTH = canvasElement.clientWidth;
const HEIGHT = canvasElement.clientHeight;

const source = audioCtx.createMediaElementSource(audioElement);
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;

source.connect(analyser);
analyser.connect(audioCtx.destination);

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw() {
  analyser.getByteFrequencyData(dataArray);
  canvasCtx.fillStyle = 'rgb(2,2,2)';
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  const barWidth = (WIDTH / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] / 2.8;
    canvasCtx.fillStyle = 'rgb(50,50,200)';
    canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }

  requestAnimationFrame(draw);
}
draw();