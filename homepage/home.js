console.log("home.js loaded");
/* ---------- NAVIGATION ---------- */
function goTo(path) {
  let base = location.hostname === "sivar05.github.io" ? "/test/" : "../";
  window.location.href = base + path;
}

/* ---------- USER NAME ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const userName = localStorage.getItem("userName");
  const heading = document.querySelector(".profile-section h3");

  if (heading) {
    heading.textContent = userName
      ? `Hi ${userName.charAt(0).toUpperCase() + userName.slice(1)}`
      : "Hi User";
  }
});

/* ---------- SIDEBAR ---------- */
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", e => {
    e.stopPropagation();
    sidebar.classList.toggle("active");
  });

  sidebar.addEventListener("click", e => e.stopPropagation());

  document.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });
}

/* ---------- LOAD MENU ---------- */
async function loadMenu() {
  try {
    const res = await fetch("http://localhost:3000/menu");
    const menuItems = await res.json();

    const menuList = document.getElementById("menuList");
    menuList.innerHTML = "";

    menuItems.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.icon} ${item.name}`;

      if (item.action) {
        const fn = item.action.replace("()", "");

        li.addEventListener("click", () => {
          if (typeof window[fn] === "function") window[fn]();
          sidebar.classList.remove("active");
        });
      }

      menuList.appendChild(li);
    });
  } catch (err) {
    console.error("Menu load error:", err);
  }
}
document.addEventListener("DOMContentLoaded", loadMenu);

/* ---------- GALLERY LOAD ---------- */
async function loadWildImages() {
  try {
    const res = await fetch("http://localhost:3000/api/wild_images");
    const images = await res.json();

    const gallery = document.getElementById("wildGallery");
    if (!gallery) return;

    gallery.innerHTML = "";

    images.forEach(item => {
      console.log("CLICK ACTION:", item.action); // 👈 ADD THIS
      const img = document.createElement("img");
      img.src = item.image;
      img.className = "zoom-img";
      img.onclick = () => {
        const animal = item.name || item.action;
        openLink(animal);
      };
      gallery.appendChild(img);
    });
  } catch (err) {
    console.error("Image load error:", err);
  }
}
document.addEventListener("DOMContentLoaded", loadWildImages);

/* ---------- UPLOAD FORM TOGGLE ---------- */
function imageupload() {
  const form = document.getElementById("uploadForm");
  if (form) form.style.display = form.style.display === "none" ? "block" : "none";
}

/* ---------- MULTI IMAGE UPLOAD (ADD ONE BY ONE) ---------- */
const selectedImages = [];

function addImage() {
  document.getElementById("imageInput").click();
}

document.getElementById("imageInput")?.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  selectedImages.push(file);

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  img.style.width = "80px";
  img.style.margin = "6px";
  img.style.borderRadius = "6px";

  document.getElementById("previewList").appendChild(img);
  e.target.value = "";
});

/* ---------- UPLOAD SUBMIT ---------- */
document.getElementById("uploadForm")?.addEventListener("submit", async e => {
  e.preventDefault();

  if (selectedImages.length === 0) {
    alert("Add at least one image");
    return;
  }

  const nameValue = e.target.name.value.trim();
  const actionValue = e.target.action.value.trim() || nameValue.toLowerCase();


  const formData = new FormData(); // ✅ defined correctly

  formData.append("name", nameValue);
  formData.append("action", actionValue);

  selectedImages.forEach(file => {
    formData.append("images", file);
  });

  const res = await fetch("http://localhost:3000/api/wild_images", {
    method: "POST",
    body: formData
  });

  if (res.ok) {
    alert("Images uploaded successfully");
    selectedImages.length = 0;
    document.getElementById("previewList").innerHTML = "";
    e.target.reset();
    loadWildImages();
    e.target.style.display = "none";
  } else {
    alert("Upload failed");
  }
});


/* ---------- IMAGE ACTION ---------- */
function openLink(type) {
  alert("CLICKED TYPE = " + type);
  const query = encodeURIComponent(type);
  window.open(`https://www.google.com/search?q=${query}`, "_blank");
}



/* ---------- FULLSCREEN ---------- */
function openFull(src, title = "", desc = "") {
  const fs = document.getElementById("fullscreen");
  document.getElementById("fullImg").src = src;
  document.getElementById("imgTitle").innerText = title;
  document.getElementById("imgDesc").innerText = desc;
  fs.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeFull() {
  document.getElementById("fullscreen").style.display = "none";
  document.body.style.overflow = "";
}

/* ---------- LOGOUT ---------- */
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.clear();
    sessionStorage.clear();
    goTo("signin/signin.html");
  }
}

/* ---------- EXTRA MENU ---------- */
function changePwd() {
  goTo("changepassword/changepassword.html");
}

function about() {
  window.open("https://en.wikipedia.org/wiki/Wildlife_of_India", "_blank");
}
