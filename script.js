console.log("WELCOME TO MY WORLD!");
//alert("JavaScript is running!");
//document.body.innerHTML += "<h2>JavaScript text added!</h2>";

function login() {
    window.location.href = "login_page.html";
}

let zoomImages = document.querySelectorAll(".zoom-img");
let fullscreen = document.getElementById("fullscreen");
let fullImg = document.getElementById("fullImg");




// Open full screen
zoomImages.forEach(img => {
  img.addEventListener("click", function () {
    fullImg.src = this.src;
    fullscreen.style.display = "flex";
  });
});

// Click anywhere → close fullscreen
fullscreen.addEventListener("click", function () {
  fullscreen.style.display = "none";
});


// ----------- OPEN NEXT PAGE CODE -----------
let linkImages = document.querySelectorAll(".link-img");

linkImages.forEach(img => {
  img.addEventListener("click", function () {
    let page = this.getAttribute("data-link");
    window.location.href = page;
  });
});

const images = [
    "image/img1.jpg",
    "image/img2.jpg",
    "image/img3.jpg",
    "image/img4.jpg"
];

let gallery = document.getElementById("gallery");

images.forEach(src => {
    let img = document.createElement("img");
    img.src = src;
    img.style.width = "150px";
    img.style.margin = "10px";
    img.classList.add("zoom-img");
    gallery.appendChild(img);
});

document.querySelectorAll(".zoom-img").forEach(img => {
    img.addEventListener("click", function() {
        document.getElementById("popupImg").src = this.src;
        document.getElementById("popup").style.display = "flex";
    });
});

document.getElementById("closeBtn").onclick = function() {
    document.getElementById("popup").style.display = "none";
};

document.getElementById("minBtn").onclick = function() {
    document.getElementById("popup").style.display = "none";
};
 
    

