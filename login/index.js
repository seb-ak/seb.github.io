document.getElementById("form").onsubmit = async (e) => {
  e.preventDefault();
  const code = document.getElementById("code").value.trim();
  const password = document.getElementById("password").value;

  const endpoint = `https://${code}.trycloudflare.com/video_feed?pw=${password}`;

  document.getElementById("camera-embed").src = endpoint;

};

