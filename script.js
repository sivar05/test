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
        "img1.jpg",
        "img2.jpg",
        "img3.jpg",
        "img4.jpg",
        "img5.jpg",
``
    ];

    const gallery = document.getElementById("gallery");

    // load images into page
    images.forEach(img => {
        let imageTag = document.createElement("img");
        imageTag.src = "image/" + img;    // <--- IMPORTANT PATH
        imageTag.onclick = () => showPopup("image/" + img);
        gallery.appendChild(imageTag);
    });

    const popup = document.getElementById("popup");
    const popupImage = document.getElementById("popupImage");
    const closeBtn = document.getElementById("closeBtn");
    const minBtn = document.getElementById("minBtn");

    function showPopup(src) {
        popup.style.display = "flex";
        popupImage.src = src;
        popup.style.width = "350px";
    }

    closeBtn.onclick = () => {
        popup.style.display = "none";
    };

    minBtn.onclick = () => {
        popup.style.width = "80px";
        popupImage.style.display = "none";
    };

