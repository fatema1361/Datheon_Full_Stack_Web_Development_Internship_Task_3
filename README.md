# 🌦️ WeatherNow - Live Weather Dashboard

A modern and responsive weather dashboard that provides real-time weather information and a 5-day forecast for cities around the world.

Search for any city and instantly explore its temperature, weather conditions, humidity, wind speed, atmospheric pressure, and more.

## 🚀 Live Features

- 🌍 Search weather for cities worldwide.
- 🌡️ Display real-time temperature.
- ☀️ Dynamic weather icons and descriptions.
- 💧 Humidity information.
- 💨 Wind speed in km/h.
- 🌡️ Atmospheric pressure.
- ☁️ Cloudiness information.
- 📅 5-day weather forecast.
- 🎨 Dynamic background based on weather conditions and nighttime.
- ⏳ Loading spinner while fetching data.
- ⚠️ Error handling for invalid cities and network issues.
- 📱 Fully responsive design for mobile and desktop devices.

## 🛠️ Technologies Used

- **HTML5** - Website structure.
- **CSS3** -Styling, Flexbox, Grid, gradients, and responsive design.
- **JavaScript (ES6+)** -Application functionality and DOM manipulation.
- **OpenWeatherMap API** - Real-time weather and forecast data.
- **Fetch API** - Fetching external data.
- **Async/Await** - Handling asynchronous operations.
- **Try/Catch** - Error handling.

## 📂 Project Structure

```text
Weather-Dashboard/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## ⚙️ Installation & Setup

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

**2. Open the project folder**

```bash
cd Weather-Dashboard
```

**3. Get an API key**

Visit [OpenWeatherMap](https://openweathermap.org/api) and create a free account.

Generate your API key from your account.

**4. Configure the API key**

Open `script.js` and replace:

```javascript
const API_KEY = "YOUR_API_KEY";
```

With your actual API key:

```javascript
const API_KEY = "your_actual_api_key";
```

**5. Run the application**

Open `index.html` using VS Code Live Server.

## 🌐 API Integration

This project uses three OpenWeatherMap endpoints:

| API | Purpose |
|---|---|
| Geocoding API | Find city coordinates |
| Current Weather API | Retrieve current weather |
| 5 Day / 3 Hour Forecast API | Retrieve forecast information |

Weather information is retrieved dynamically using JavaScript Fetch API and displayed through DOM manipulation.

## 📸 Application Highlights

- Clean and modern weather dashboard.
- Dynamic weather-based backgrounds.
- Interactive city search.
- Responsive forecast cards.
- Real-time weather information.

## 🎯 Learning Outcomes

Through this project, I practiced:

- Working with third-party REST APIs.
- Understanding JSON responses.
- Using Fetch API with Async/Await.
- Handling asynchronous JavaScript operations.
- Implementing Try/Catch error handling.
- Using JavaScript array methods like `map()` and `forEach()`.
- Dynamically updating HTML elements using DOM manipulation.
- Creating responsive layouts with CSS Grid and Flexbox.

## 🔐 Security Note

The API key is used for local development. Never commit a real API key to a public GitHub repository. For production deployment, use a backend or serverless function to protect API credentials.

## 👩‍💻 Author

**Fatema Begum**

Software Engineering Student | Aspiring Developer

- GitHub: [fatema1361](https://github.com/fatema1361)
- LinkedIn: [Fatema Begum](https://www.linkedin.com/in/fa-te-ma-644818362/)

---

⭐ If you find this project interesting, feel free to explore the repository!

**Built with curiosity and a passion for learning. ❤️**