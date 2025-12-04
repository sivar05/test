
function signup(){
  window.location.href="../signUp/signup.html"
}

function showFull(src, title = "", desc = "") {
  const fs = document.getElementById("fullscreen");
  const fullImg = document.getElementById("fullImg");
  const imgTitle = document.getElementById("imgTitle");
  const imgDesc = document.getElementById("imgDesc");

  if (!fs || !fullImg || !imgTitle || !imgDesc) return;

  fullImg.src = src;
  imgTitle.innerText = title;
  imgDesc.innerText = desc;

  // IMPORTANT: turn on flex so the overlay appears correctly on desktop + mobile
  fs.style.display = "flex";
  // optionally lock scroll behind overlay
  document.body.style.overflow = "hidden";
}

function closeFull() {
  const fs = document.getElementById("fullscreen");
  fs.style.display = "none";
  document.getElementById("fullImg").src = "";
  document.body.style.overflow = ""; // restore scroll
}

// optional: click outside image area to close overlay
document.getElementById('fullscreen').addEventListener('click', function(e) {
  // if click directly on the overlay (not the image or info), close
  if (e.target.id === 'fullscreen') closeFull();
});

