window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

function setLocalStorage() {
  if (!localStorage.getItem("score")) {
    localStorage.setItem("score", score);
  } else if (parseInt(localStorage.getItem("score")) < score) {
    localStorage.setItem("score", score);
  }
}

function getLocalStorage() {
  if (localStorage.getItem("score")) {
    const storageScore = localStorage.getItem("score");
    document.querySelector("#max").textContent = storageScore;
  }
}
