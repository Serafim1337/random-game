window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

function setLocalStorage() {
  if (!localStorage.getItem("score")) {
    localStorage.setItem("score", score);
  } else if (parseInt(localStorage.getItem("score")) < score) {
    localStorage.setItem("score", score);
  }
  if (localStorage.getItem("records")) {
    if (score != 0) {
      let recordsArray = localStorage
        .getItem("records")
        .split(" ")
        .filter((item) => item != 0)
        .slice(0, 10)
        .join(" ");
      localStorage.setItem("records", `${recordsArray} ${score}`);
    }
  } else {
    localStorage.setItem("records", score);
  }
}

function getLocalStorage() {
  if (localStorage.getItem("score")) {
    const storageScore = localStorage.getItem("score");
    document.querySelector("#max").textContent = storageScore;
  }
  if (localStorage.getItem("records")) {
    let arr = localStorage
      .getItem("records")
      .split(" ")
      .filter((item) => item != 0)
      .sort((a, b) => b - a);
    let counter = 0;
    for (let item of document.querySelectorAll("#r")) {
      item.textContent = arr[counter];
      counter++;
    }
  }
}
