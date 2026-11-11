// (1) Hàm bất đồng bộ.
async function xemThoiTiet() {
  const city = document.getElementById("city").value.trim();
  const box = document.getElementById("box");
  const button = document.getElementById("weather-button");
  if (!city) {
    alert("Vui lòng nhập tên thành phố!");
    return;
  }
  button.disabled = true;
  box.style.display = "block";
  box.className = "loading";
  box.textContent = "Đang tải dữ liệu...";
  // (2) Khối bắt lỗi cho hai yêu cầu mạng.
  try {
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=vi`;
    // (3) Chờ response; (4) chờ đọc JSON.
    const geoRes = await fetch(geoURL);
    if (!geoRes.ok) throw new Error(`Không tải được tọa độ (HTTP ${geoRes.status})`);
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`Không tìm thấy thành phố "${city}"`);
    }
    const { latitude, longitude, name, country } = geoData.results[0];
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    // (5) Chờ phản hồi thời tiết.
    const weatherRes = await fetch(weatherURL);
    if (!weatherRes.ok) throw new Error(`Không tải được thời tiết (HTTP ${weatherRes.status})`);
    const weatherData = await weatherRes.json();
    const { temperature, windspeed } = weatherData.current_weather;
    const locationName = document.createElement("strong");
    locationName.textContent = `${name}, ${country}`;
    const temp = document.createElement("span");
    temp.className = "temp";
    temp.textContent = `${temperature}°C`;
    const wind = document.createTextNode(`Gió: ${windspeed} km/h`);
    const coordinates = document.createElement("small");
    coordinates.className = "coordinates";
    coordinates.textContent = `Tọa độ: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    box.className = "success";
    // Dùng textContent để tên từ API luôn là văn bản thuần.
    box.replaceChildren(locationName, document.createElement("br"), temp,
      document.createElement("br"), wind, document.createElement("br"), coordinates);
  // (6) Bắt lỗi; (7) lấy err.message.
  } catch (err) {
    box.className = "error";
    box.textContent = "Lỗi: " + err.message;
  } finally {
    button.disabled = false;
  }
}

document.getElementById("weather-form").addEventListener("submit", event => {
  event.preventDefault();
  xemThoiTiet();
});
