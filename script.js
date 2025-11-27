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


document.getElementById("images".addEventListener("change"),function(event){
  let previewDiv=document.getElementById("preview");
  previewDiv.innerHTML="";

  for (let file of event.target.files) {
        let img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.width = "150px";
        img.style.margin = "10px";
        previewDiv.appendChild(img);
    }
});