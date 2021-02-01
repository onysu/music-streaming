const vis = document.getElementsByClassName("sound-vis")[0];
const state = document.getElementsByClassName("state")[0];
document.body.addEventListener("click", () => {
  if (vis.className.indexOf("audio-playing") < 0) {
    vis.classList.remove("audio-paused");
    vis.classList.add("audio-playing");

    state.classList.remove("paused");
    state.classList.add("playing");
  } else {
    vis.classList.remove("audio-playing");
    vis.classList.add("audio-paused");

    state.classList.add("playing");
    state.classList.remove("paused");
  }
});

document.addEventListener("keydown", (event) => {
  const k = event.key;
  if (k === "+" || k === "=") {
    if (vis.className.indexOf("sound-vis--large") < 0) {
      vis.classList.add("sound-vis--large");
      vis.classList.remove("sound-vis--small");
    } else {
      return;
    }
  }
  if (k === "-") {
    if (vis.className.indexOf("sound-vis--small") < 0) {
      vis.classList.add("sound-vis--small");
      vis.classList.remove("sound-vis--large");
    } else {
      return;
    }
  }
});