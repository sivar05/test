
function signup(){
  window.location.href = "signup.html";
}

function showFull(imgSrc) {
    document.getElementById("fullImg").src = imgSrc;
    document.getElementById("fullscreen").style.display = "flex";
}

function closeFull() {
    document.getElementById("fullscreen").style.display = "none";
}

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please fill all fields!");
        return;
    }

    alert("Login successful!");
}
