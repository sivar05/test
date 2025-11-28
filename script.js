
function signup(){
  window.location.href = "signup.html";
}

function showFull(imgSrc) {
    document.getElementById("fullImg").src = imgSrc;
    document.getElementById("fullscreen").style.display = "flex";
}

function closeFull() {
    document.getElementById("fullscreen").style.display = "none";
}


