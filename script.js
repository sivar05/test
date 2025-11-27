console.log("WELCOME TO MY WORLD!");

function login() { window.location.href = "login_page.html"; }

// ---------------- FULLSCREEN IMAGE ----------------
let zoomImages = document.querySelectorAll(".zoom-img");
let fullscreen = document.getElementById("fullscreen");
let fullImg = document.getElementById("fullImg");

// Open fullscreen when zoom image clicked
zoomImages.forEach(img => {
    img.addEventListener("click", function () {
        fullImg.src = this.src;
        fullscreen.style.display = "flex";
    });
});

// Close fullscreen when clicked anywhere
fullscreen.addEventListener("click", function () {
    fullscreen.style.display = "none";
});

// ---------------- GALLERY IMAGES ----------------
const images = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
    "img5.jpg",
    "img6.jpg"
];

const gallery = document.getElementById("gallery");

images.forEach(img => {
    let imageTag = document.createElement("img");
    imageTag.src = "image/" + img;   
    imageTag.onclick = () => showPopup("image/" + img);
    gallery.appendChild(imageTag);
});

// ---------------- POPUP ----------------
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImage");
const minBtn = document.getElementById("minBtn");
const closeBtn = document.getElementById("closeBtn");

let isMinimized = false;

// Open popup from gallery
function showPopup(src) {
    popupImg.src = src;
    popup.style.display = "block";
    popup.classList.remove("minimized");
    minBtn.textContent = "–";
    isMinimized = false;
}

// Close popup
closeBtn.onclick = () => popup.style.display = "none";

// Minimize / Maximize popup
minBtn.onclick = () => {
    if (!isMinimized) {
        popup.classList.add("minimized");
        minBtn.textContent = "▢";  
    } else {
        popup.classList.remove("minimized");
        minBtn.textContent = "–";  
    }
    isMinimized = !isMinimized;
};
