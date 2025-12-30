console.log("home.js loaded");

/* ---------- NAVIGATION ---------- */
function goTo(path) {
  let base = "";
  if (location.hostname === "sivar05.github.io") {
    base = "/test/";
  } else {
    base = "../";
  }
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
        li.onclick = () => window[item.action.replace("()", "")]?.();
      }

      menuList.appendChild(li);
    });
  } catch (err) {
    console.error("Menu error:", err);
  }
}
document.addEventListener("DOMContentLoaded", loadMenu);

/* ---------- LOAD IMAGES ---------- */
async function loadWildImages() {
  try {
    const res = await fetch("http://localhost:3000/api/wild_images");
    const images = await res.json();

    const gallery = document.getElementById("wildGallery");
    gallery.innerHTML = "";

    images.forEach(item => {
      const img = document.createElement("img");
      img.src = item.image;     // MUST be full URL from backend
      img.className = "zoom-img";
      img.onclick = () => openLink(item.action);
      gallery.appendChild(img);
    });
  } catch (err) {
    console.error("Image load error:", err);
  }
}
document.addEventListener("DOMContentLoaded", loadWildImages);

/* ---------- UPLOAD IMAGE ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uploadForm");

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(form);

    const res = await fetch("http://localhost:3000/api/wild_images", {
      method: "POST",
      body: formData
    });

    if (res.ok) {
      alert("Image uploaded successfully");
      form.reset();
      loadWildImages();
    } else {
      alert("Upload failed");
    }
  });
});

/* ---------- IMAGE ACTION ---------- */
function openLink(type) {
  window.location.href = `details.html?animal=${type}`;
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

/* ---------- EXTRA MENU ACTIONS ---------- */
function changePwd() {
  goTo("changepassword/changepassword.html");
}

function about() {
  window.open("https://en.wikipedia.org/wiki/Wildlife_of_India", "_blank");
}
