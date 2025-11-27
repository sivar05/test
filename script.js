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
        "img4.jpg"
    ];

 
    const galleryDiv = document.getElementById("gallery");
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popupImg");

    // Show thumbnails
    images.forEach(img => {
        let imageTag = document.createElement("img");
        imageTag.src = "image/" + img;   // folder name = image
        imageTag.onclick = () => showImage(img);
        galleryDiv.appendChild(imageTag);
    });

    function showImage(name) {
        popup.style.display = "block";
        popupImg.src = "image/" + name;
    }

    // Close popup
    document.getElementById("closeBtn").onclick = () => {
        popup.style.display = "none";
    };

    // Minimize popup
    document.getElementById("minBtn").onclick = () => {
        popupImg.style.display =
            popupImg.style.display === "none" ? "block" : "none";
    };





