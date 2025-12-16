// PATH HANDLER
function goTo(path) {
  let base = location.hostname === "sivar05.github.io" ? "/test/" : "../";
  window.location.href = base + path;
}

// SIGNUP
function signup() {
  const msg = document.getElementById("message");

  fetch("http://127.0.0.1:3000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      mobilenumber: mobilenumber.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    })
  })
  .then(async res => {
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  })
  .then(data => {
    msg.style.color = "green";
    msg.innerText = data.message;

    alert("Signup successful! Redirecting to login...");
    setTimeout(() => {
      goTo("index.html");
    }, 1000);
  })
  .catch(err => {
    msg.style.color = "red";
    msg.innerText = err.message || "Signup failed";
  });
}