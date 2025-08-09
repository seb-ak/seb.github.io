function start(endpoint){
  document.getElementById("camera-embed").src = endpoint;

  document.getElementById("feed-btn").style.display = "block"
  document.getElementById("form").style.display = "none"
  document.getElementById("title").style.display = "none"

  document.getElementById("feed-btn").onclick = () => {

    const code = document.getElementById("code").value.trim();
    const password = document.getElementById("password").value;

    const endpoint = `https://${code}.trycloudflare.com/command?pw=${password}&cmd=feed`;

    Swal.fire({
      title: "Are you sure?",
      text: "This will activate the feeder.",
      icon: "warning",
      background: "rgba(2, 2, 22, 0.95)",
      color: "whitesmoke",
      showCancelButton: true,
      confirmButtonText: "Yes, feed!",
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
          title: "Feeding...",
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

}

document.getElementById("form").onsubmit = async (e) => {
  e.preventDefault();
  const code = document.getElementById("code").value.trim();
  const password = document.getElementById("password").value;

  const endpoint = `https://${code}.trycloudflare.com/video_feed?pw=${password}`;

  try {
    // Test if server responds before applying changes
    const testResponse = await fetch(endpoint, { method: "HEAD" });

    if (testResponse.ok) {

      start(endpoint)

    } else {
      Swal.fire({
        title: "Error",
        text: `Server responded with status: ${testResponse.status}`,
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
  }
};