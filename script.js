
function signup(){
  window.location.href = "../signUp/signup.html";
}



function showFull(src, title, desc) {
    const fs = document.getElementById("fullscreen");

    fs.style.display = "flex";  // VERY IMPORTANT
    document.getElementById("fullImg").src = src;

    document.getElementById("imgTitle").innerText = title;
    document.getElementById("imgDesc").innerText = desc;
}



function closeFull() {
    document.getElementById("fullscreen").style.display = "none";
}


