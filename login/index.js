let code
let password

document.addEventListener('DOMContentLoaded', async () => {
  const lastLoginCode = localStorage.getItem("lastLoginCode");

  if (!lastLoginCode) return;

  try {
    const testResponse = await fetch(
      `https://${lastLoginCode}.trycloudflare.com/ping`, 
      { method: "GET" }
    );

    if (testResponse.ok) {
      document.getElementById("code").value = lastLoginCode;
    }
  } catch (err) {
    console.error("Ping failed:", err);
  }
});


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


function loggedIn(){
  // document.getElementById("camera-embed").src = endpoint;
  startWebRTC();

  localStorage.setItem("lastLoginCode", code);

  document.getElementById("feed-btn").style.display = "block"
  document.getElementById("form-container").style.display = "none"
  document.getElementById("title").style.display = "none"

  document.getElementById("feed-btn").onclick = () => {

    const endpoint = `https://${code}.trycloudflare.com/command?pw=${password}&cmd=feed`;

    confirmChoice(endpoint, "This will activate the feeder.", "Yes, feed!", "Feeding...")
  }
}

document.getElementById("form").onsubmit = async (e) => {
  e.preventDefault();

  code = document.getElementById("code").value.trim();
  password = document.getElementById("password").value;

  const endpoint = `https://${code}.trycloudflare.com/webrtc?pw=${password}`;

  try {
    // Use OPTIONS instead of HEAD
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
      text: "Wrong code/Password or Server offline",
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


async function startWebRTC() {
  const video = document.getElementById("video");
  const pc = new RTCPeerConnection();

  const endpoint = `https://${code}.trycloudflare.com/webrtc?pw=${password}`;

  pc.ontrack = (event) => {
    video.srcObject = event.streams[0];
  };

  // ✅ Tell the browser we want to receive video
  pc.addTransceiver("video", { direction: "recvonly" });

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      sdp: pc.localDescription.sdp,
      type: pc.localDescription.type
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const answer = await response.json();
  await pc.setRemoteDescription(answer);
}