const images = document.querySelectorAll(".zoom-img");
const popup = document.getElementById("popup");
const popupImage = document.getElementById("popupImage");

const fullscreen = document.getElementById("fullscreen");
const fullImg = document.getElementById("fullImg");

const minBtn = document.getElementById("minBtn");
const closeBtn = document.getElementById("closeBtn");

// Open popup when clicking image
images.forEach(img => {
    img.addEventListener("click", () => {
        popup.style.display = "block";
        popup.classList.remove("minimized");
        popupImage.src = img.src;
    });
});

// Minimize button
minBtn.addEventListener("click", () => {
    popup.classList.toggle("minimized");
});

// Close popup
closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// Maximize image (double click)
popupImage.addEventListener("dblclick", () => {
    fullImg.src = popupImage.src;
    fullscreen.style.display = "flex";
});

// Close fullscreen
fullscreen.addEventListener("click", () => {
    fullscreen.style.display = "none";
});
