const BASE_URL = "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("token");
}

async function apiRequest(url, method = "GET", body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    }
  };
console.log("TOKEN SENT:", getToken());

  if (body) options.body = JSON.stringify(body);

  const res = await fetch(BASE_URL + url, options);

  if (!res.ok) {
    const text = await res.text(); // 🔥 read HTML error
    throw new Error(text);
  }

  return res.json();
}

