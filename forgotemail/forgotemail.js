const API_BASE =
  location.hostname === "sivar05.github.io"
    ? "https://signup-api.up.railway.app"
    : "http://localhost:3000";

/* ---------- BUTTON BINDING ---------- */
document
  .getElementById("resetEmailButton")
  .addEventListener("click", sendOTP);

/* ---------- SEND OTP ---------- */
function sendOTP() {
  const mobile = document.getElementById("mobileNumber").value.trim();
  const msg = document.getElementById("message");

  if (!/^\d{10}$/.test(mobile)) {
    msg.innerText = "Enter a valid 10-digit mobile number";
    return;
  }

  msg.innerText = "Sending OTP...";

  fetch(`${API_BASE}/api/forgotemail/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobilenumber: mobile })
  })
    .then(res => res.json())
    .then(data => {
      msg.innerText = data.message;
      document.getElementById("otpBox").style.display = "block";
    })
    .catch(() => {
      msg.innerText = "Failed to send OTP";
    });
  }

  
  function resendOTP() {
  fetch(`${API_BASE}/api/forgotemail/resend-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobilenumber })
  })
  .then(res => res.json())
  .then(data => alert(data.message));
}



/* ---------- VERIFY OTP ---------- */
function verifyOTP() {
  const mobile = document.getElementById("mobileNumber").value.trim();
  const otp = document.getElementById("otp").value.trim();
  const msg = document.getElementById("message");

  if (!otp) {
    msg.innerText = "Enter OTP";
    return;
  }

  fetch(`${API_BASE}/api/forgotemail/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobilenumber: mobile, otp })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.success) throw data;
      msg.style.color = "green";
      msg.innerText = `Your registered email: ${data.maskedEmail}`;
    })
    .catch(err => {
      msg.style.color = "red";
      msg.innerText = err.message || "Invalid OTP";
    });
}

function handleMobileInput() {
  const mobileInput = document.getElementById("mobileNumber");
  const recoverBox = document.getElementById("recoverBox");

  // Allow digits only
  mobileInput.value = mobileInput.value.replace(/\D/g, "");

  // Show button only if exactly 10 digits
  if (mobileInput.value.length === 10) {
    recoverBox.style.display = "block";
  } else {
    recoverBox.style.display = "none";
  }
}

function recoverEmail() {
  const mobile = document.getElementById("mobileNumber").value.trim();
  const msg = document.getElementById("message");

  if (!/^\d{10}$/.test(mobile)) {
    msg.style.color = "red";
    msg.innerText = "Enter a valid 10-digit mobile number";
    return;
  }

  const API_BASE =
    location.hostname === "sivar05.github.io"
      ? "https://signup-api.up.railway.app"
      : "http://localhost:3000";

  fetch(`${API_BASE}/api/forgotemail/recover-email`, {
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
      msg.style.color = "green";
      msg.innerText = `Your registered email: ${data.maskedEmail}`;
    })
    .catch(err => {
      msg.style.color = "red";
      msg.innerText = err.message || "Mobile number not registered";
    });
}

