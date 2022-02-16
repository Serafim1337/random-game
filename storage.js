window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

function setLocalStorage() {
  localStorage.setItem("score", score);
}

function getLocalStorage() {
  if (localStorage.getItem("score")) {
    const storageScore = localStorage.getItem("score");
    document.querySelector("#max").textContent = storageScore;
  }
}
