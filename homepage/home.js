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

// Set user name in profile section
document.addEventListener("DOMContentLoaded", () => {
  const userName = localStorage.getItem("userName");
  const heading = document.querySelector(".profile-section h3");
   if (userName) {
    const formattedName =
      userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();

    heading.textContent = `Hi ${formattedName}`;
  } else {
    heading.textContent = "Hi User";
  }
});

// Sidebar menu toggle
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

/* Toggle sidebar */
menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  sidebar.classList.toggle("active");
});

/* Prevent closing when clicking inside sidebar */
sidebar.addEventListener("click", (e) => {
  e.stopPropagation();
});

/* Close when clicking outside */
document.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

/* 🔄 FIX FOR MOBILE ROTATION */
window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    sidebar.style.height = `calc(${window.innerHeight}px - 60px)`;
  }, 300);
});

// logout confirmation
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.clear();
    sessionStorage.clear();
    goTo("signin/signin.html");
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

function openFull(src, title, desc) {
   const fs = document.getElementById("fullscreen");
    document.getElementById("fullImg").src = src;
    document.getElementById("imgTitle").innerText = title;
    document.getElementById("imgDesc").innerText = desc;
    fs.style.display = "flex";
    document.body.style.overflow = "hidden"; // disable scroll  
    if(!fs || src || !title || !desc) return;
    showFull(src, title, desc
    )
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
