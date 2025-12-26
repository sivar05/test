const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  sidebar.classList.toggle("active");
});

// close menu on outside click
document.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

// keep menu open when clicking inside
sidebar.addEventListener("click", (e) => {
  e.stopPropagation();
});

// logout confirmation
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.clear();
    sessionStorage.clear();
    window.close();
  }
}


function changePwd(){
  setTimeout(()=>{
    alert("Going to Change password Page");
    goTo("changepassword/changepassword.html");
  },1000);
   
}

function about(){
  setTimeout(()=>{
    window.open("https://en.wikipedia.org/wiki/Wildlife_of_India", "_blank");
  },1000);
}

// Show image in fullscreen overlay with title/description
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


// Navigate to different pages, handling GitHub Pages path if needed
function goTo(path) {
    let base = "";
    // Detect GitHub Pages domain
    if (location.hostname === "sivar05.github.io") {
        base = "/test/"; // Your repository name
    }else {
        base = "../"; 
    } 
    window.location.href = base + path;
}

    function openLink(image) {
     setTimeout(() => {
      const urls = {
      lion: "https://www.google.com/search?q=wild+animal+about+lion",
      tiger: "https://www.google.com/search?q=wild+animal+about+tiger",
      elephant: "https://www.google.com/search?q=wild+animal+about+elephant",
      cheetah: "https://www.google.com/search?q=wild+animal+about+cheetah",
      giraffe: "https://www.google.com/search?q=wild+animal+about+giraffe",
      zebra: "https://www.google.com/search?q=wild+animal+about+zebra",
      bear: "https://www.google.com/search?q=wild+animal+about+bear",
      wolf: "https://www.google.com/search?q=wild+animal+about+wolf",
      personal: "https://www.google.com/search?q=personal"
      };
      window.open(urls[image], "_blank");
    }, 1000);
  }
