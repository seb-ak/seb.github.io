    const endpoint = "https://YOUR_PI_ENDPOINT_HERE/auth"; // e.g. https://your-ngrok-subdomain.ngrok.io/auth

    document.getElementById("pwform").onsubmit = async (e) => {
      e.preventDefault();
      const pw = document.getElementById("pw").value;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pw }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        document.getElementById("private-content").innerHTML = data.html;
      } else {
        alert(data.error || "Something went wrong");
      }
    };