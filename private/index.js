document.getElementById("form").onsubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById("un").value.trim(); // This is the ngrok subdomain
  const pw = document.getElementById("pw").value;

  const endpoint = `https://${username}.ngrok-free.app/auth`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pw }), // Send only the password
  });

  const data = await res.json();

  if (res.ok && data.success) {
    document.getElementById("private-content").innerHTML = data.html;
    new Function(data.js)();
    document.getElementById("private-content").style.display = "block";
    document.getElementById("form-container").style.display = "none";
    document.querySelector("h1").textContent = `Welcome, ${username}`;
  } else {
    alert(data.error || "Login failed");
  }
};
