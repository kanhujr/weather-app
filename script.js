const btn = document.querySelector("button");

async function getWeather() {
  try {
    const place = document.querySelector("#city").value.trim();

    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${place}&aqi=no`,
    );

    const data = await res.json();
    console.log(data);

    // Select elements
    const cityName = document.querySelector(".cityName");
    const temp = document.querySelector(".temp");
    const feels = document.querySelector(".feels");
    const humidity = document.querySelector(".humidity");
    const icon = document.querySelector(".icon");

    // Update UI
    cityName.innerText = data.location.name;
    temp.innerText = data.current.temp_c;
    feels.innerText = data.current.feelslike_c;
    humidity.innerText = data.current.humidity;

    // Condition text
    const condition = data.current.condition.text.toLowerCase();

    // Map condition → local SVG file
    let iconPath = "icons/animated/day.svg"; // default

    if (condition.includes("cloud")) {
      iconPath = "icons/animated/cloudy-day-1.svg";
    } else if (condition.includes("rain")) {
      iconPath = "icons/animated/rainy-1.svg";
    } else if (condition.includes("snow")) {
      iconPath = "icons/animated/snowy-1.svg";
    } else if (condition.includes("thunder")) {
      iconPath = "icons/animated/thunder.svg";
    } else if (condition.includes("clear") || condition.includes("sun")) {
      iconPath = "icons/animated/day.svg";
    }

    // Set icon
    icon.src = iconPath;
  } catch (error) {
    console.log("Error:", error);
  }
}

btn.addEventListener("click", getWeather);
