const vis = document.getElementsByClassName("sound-vis")[0];
const state = document.getElementsByClassName("state")[0];
document.body.addEventListener("click", () => {
  if (vis.className.indexOf("audio-paused") < 0) {
    vis.classList.add("audio-paused");
    vis.classList.remove("audio-playing");

    state.classList.add("paused");
    state.classList.remove("playing");
  } else {
    vis.classList.add("audio-playing");
    vis.classList.remove("audio-paused");

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