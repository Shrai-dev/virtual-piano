const buttons = document.querySelector(".btn-container");
const notesButton = document.querySelector(".btn-notes");
const lettersButton = document.querySelector(".btn-letters");
const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");
const fullscreenButton = document.getElementsByClassName(".fullscreen");

function toggleLettersAndNotes({ target }) {
  if (target === lettersButton) {
    target.classList.add("btn-active");
    notesButton.classList.remove("btn-active");
    pianoKeys.forEach((elem) => {
      elem.classList.add("letter");
    });
  } else if (target === notesButton) {
    target.classList.add("btn-active");
    lettersButton.classList.remove("btn-active");
    pianoKeys.forEach((elem) => {
      elem.classList.remove("letter");
    });
  }
}

buttons.addEventListener("click", toggleLettersAndNotes);

function playAudio(event) {
  if (event.target.classList.contains("piano-key")) {
    const letter = event.target.dataset.letter;
    const audio = document.querySelector(`audio[data-letter="${letter}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    audio.volume = 0.3;
  } else if (event.type === "keydown") {
    const letter = event.code.charAt(3);
    const audio = document.querySelector(`audio[data-letter="${letter}"]`);
    const key = document.querySelector(`.piano-key[data-letter="${letter}"]`);
    if (!audio) return;
    if (event.repeat) return;
    audio.currentTime = 0;
    audio.play();
    audio.volume = 0.3;
    key.classList.add("piano-key-active");
  }
}

function addKeyStyle(event) {
  if (event.target.classList.contains("piano-key")) {
    event.target.classList.add("piano-key-active", "piano-key-active-pseudo");
  }
}

function removeKeyStyle(event) {
  if (event.type === "mouseup" || event.type === "mouseout") {
    event.target.classList.remove(
      "piano-key-active",
      "piano-key-active-pseudo"
    );
  } else if (event.type === "keyup") {
    const letter = event.code.charAt(3);
    const key = document.querySelector(`.piano-key[data-letter="${letter}"]`);
    key.classList.remove("piano-key-active");
  }
}

function startCorrespondOver() {
  pianoKeys.forEach((elem) => {
    elem.addEventListener("mouseover", addKeyStyle);
    elem.addEventListener("mouseover", playAudio);
    elem.addEventListener("mouseout", removeKeyStyle);
  });
}

function stopCorrespondOver() {
  pianoKeys.forEach((elem) => {
    elem.removeEventListener("mouseover", playAudio);
    elem.removeEventListener("mouseover", addKeyStyle);
    elem.removeEventListener("mouseout", removeKeyStyle);
  });
}

piano.addEventListener("mousedown", startCorrespondOver, false);
piano.addEventListener("mousedown", playAudio);
piano.addEventListener("mousedown", addKeyStyle);
piano.addEventListener("mouseup", removeKeyStyle);
document.addEventListener("mouseup", stopCorrespondOver);

window.addEventListener("keydown", playAudio);
window.addEventListener("keyup", removeKeyStyle);

document.addEventListener(
  "click",
  (event) => {
    if (event.target.classList.contains("fullscreen")) {
      toggleFullScreen();
    }
  },
  false
);

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
