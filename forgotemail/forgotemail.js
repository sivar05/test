function goTo(path) {
  let base = location.hostname === "sivar05.github.io" ? "/test/" : "../";
  window.location.href = base + path;
}

document
  .getElementById("resetEmailButton")
  .addEventListener("click", resetEmail);

function resetEmail() {
  const mobile = document.getElementById("mobileNumber").value.trim();
  const error = document.getElementById("mobile-error");

  if (!/^\d{10}$/.test(mobile)) {
    error.innerText = "Enter a valid 10-digit mobile number";
    return;
  }

  error.innerText = "";

  const API_BASE =
    location.hostname === "sivar05.github.io"
      ? "https://signup-api.up.railway.app"
      : "http://localhost:3000";

  fetch(`${API_BASE}/api/forgetemail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobilenumber: mobile })
  })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) throw data;
      return data;
    })
    .then(data => {
      alert(data.message);
      goTo("reset/resetpassword.html");
    })
    .catch(err => {
      error.innerText = err.message || "Mobile number not found";
    });
}