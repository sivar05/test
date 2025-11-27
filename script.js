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

    const gallery = document.getElementById("gallery");
// Load all images
    images.forEach(name => {
        let img = document.createElement("img");
        img.src = "image/" + name;  // FOLDER = image
        img.onclick = () => openPopup(img.src);
        gallery.appendChild(img);
    });

    // Open right-side popup
    function openPopup(src) {
        document.getElementById("popupImg").src = src;
        document.getElementById("popup").style.right = "0";
    }

    // Close popup
    document.getElementById("closeBtn").onclick = function() {
        document.getElementById("popup").style.right = "-100%";
    };

    //minimum popup
    document.getElementById("minimumBtn").onClick=function(){
      document.getElementById(popup).style.right="-100%";
    }





