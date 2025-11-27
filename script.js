function signup(){
  window.location.href = "signup.html";
}

function showFull(imgSrc) {
    document.getElementById("fullImg").src = imgSrc;
    document.getElementById("fullscreen").style.display = "flex";

    // hide buttons & other elements
    document.querySelector(".btn").style.display = "none";
}

function closeFull() {
    document.getElementById("fullscreen").style.display = "none";

    // show buttons again
    document.querySelector(".btn").style.display = "block";
}
