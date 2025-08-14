let code;
let password;

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const urlLoginCode = params.get("code");

  if (await tryCode(urlLoginCode)) return

  const lastLoginCode = localStorage.getItem("lastLoginCode");

  await tryCode(lastLoginCode)

});

async function tryCode(code) {
  if (!code) return false

  try {
    const testResponse = await fetch(
      `https://${code}.trycloudflare.com/ping`, 
      { method: "GET" }
    );

    if (testResponse.ok) {
      document.getElementById("code").value = code;
    }
  } catch (err) {}
}

function confirmChoice(endpoint, warnMessage, confirmButton, confirmMessage) {
  Swal.fire({
    title: "Are you sure?",
    text: warnMessage,
    icon: "warning",
    background: "rgba(2, 2, 22, 0.95)",
    color: "whitesmoke",
    showCancelButton: true,
    confirmButtonText: confirmButton,
    cancelButtonText: "Cancel",
    customClass: {
      popup: "my-popup",
      title: "my-title",
      confirmButton: "my-btn",
      cancelButton: "my-btn"
    },
    buttonsStyling: false
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: confirmMessage,
        text: "Please wait",
        background: "rgba(2, 2, 22, 0.95)",
        color: "whitesmoke",
        allowOutsideClick: false,
        customClass: {
          popup: "my-popup",
          title: "my-title"
        },
        didOpen: () => Swal.showLoading(),
        buttonsStyling: false
      });

      fetch(endpoint)
        .then(res => res.text())
        .then(msg => {
          Swal.fire({
            title: "Success!",
            text: msg,
            icon: "success",
            background: "rgba(2, 2, 22, 0.95)",
            color: "whitesmoke",
            customClass: {
              popup: "my-popup",
              title: "my-title",
              confirmButton: "my-btn"
            },
            buttonsStyling: false
          });
        })
        .catch(err => {
          Swal.fire({
            title: "Error",
            text: err.toString(),
            icon: "error",
            background: "rgba(2, 2, 22, 0.95)",
            color: "whitesmoke",
            customClass: {
              popup: "my-popup",
              title: "my-title",
              confirmButton: "my-btn"
            },
            buttonsStyling: false
          });
        });
    }
  });
};

function loggedIn() {
  // Show MJPEG stream instead of WebRTC video
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = `<img id="video" src="https://${code}.trycloudflare.com/video_feed?pw=${password}" style="width:100%; height:auto;" alt="Camera Feed" />`;
  
  localStorage.setItem("lastLoginCode", code);

  document.getElementById("feed-btn").style.display = "block";
  document.getElementById("logout-btn").style.display = "block";
  document.getElementById("home-btn").style.display = "none";
  document.getElementById("form-container").style.display = "none";
  document.getElementById("title").style.display = "none";
    
}
function logout() {
  window.location.reload();
}


document.getElementById("form").onsubmit = async (e) => {
  e.preventDefault();

  code = document.getElementById("code").value.trim().replaceAll("`", "");
  password = document.getElementById("password").value.replaceAll(" ", "");

  const endpoint = `https://${code}.trycloudflare.com/video_feed?pw=${password}`;

  try {
    const testResponse = await fetch(endpoint, { method: "OPTIONS" });

    if (testResponse.ok) {
      loggedIn();
    } else {
      Swal.fire({
        title: "Error",
        text: `${testResponse.status}`,
        icon: "error",
        background: "rgba(2, 2, 22, 0.95)",
        color: "whitesmoke",
        customClass: {
          popup: "my-popup",
          title: "my-title",
          confirmButton: "my-btn"
        },
        buttonsStyling: false
      });
    }
  } catch (err) {
    Swal.fire({
      title: "Connection Failed",
      text: "Incorrect code or Password",
      icon: "error",
      background: "rgba(2, 2, 22, 0.95)",
      color: "whitesmoke",
      customClass: {
        popup: "my-popup",
        title: "my-title",
        confirmButton: "my-btn"
      },
      buttonsStyling: false
    });
  }
};

document.addEventListener("touchmove", (e) => { e.preventDefault(); }, { passive: false });

document.getElementById("feed-btn").onclick = () => {
  const endpoint = `https://${code}.trycloudflare.com/command?pw=${password}&cmd=feed`;

  confirmChoice(endpoint, "This will activate the feeder.", "Yes, feed!", "Feeding...");
};

document.getElementById("logout-btn").onclick = () => {
  
  Swal.fire({
    title: "Are you sure?",
    text: "your about to Logout",
    icon: "warning",
    background: "rgba(2, 2, 22, 0.95)",
    color: "whitesmoke",
    showCancelButton: true,
    confirmButtonText: "Yes, Logout",
    cancelButtonText: "Cancel",
    customClass: {
      popup: "my-popup",
      title: "my-title",
      confirmButton: "my-btn",
      cancelButton: "my-btn"
    },
    buttonsStyling: false
  }).then((result) => {
    if (result.isConfirmed) {
      logout()
    }
  });
  
};

document.getElementById('home-btn').onclick = () => {
  window.location.href = '../';
};
