const token = new URLSearchParams(window.location.search).get("token");

function resetPassword() {
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const msg = document.getElementById("message");
  const API_BASE =
    location.hostname === "sivar05.github.io"
      ? "https://signup-api.up.railway.app"
      : "http://127.0.0.1:3000";

  fetch(`${API_BASE}/api/resetpassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword })
  })
    .then(res => res.json())
    .then(data => {
      msg.style.color = data.success ? "green" : "red";
      msg.innerText = data.message;
    });
}

function goTo(Path){
  let base = (location.hostname==="sivar05.github.io") ? "../" : "/test";
  window.location.href= base+Path;
}
