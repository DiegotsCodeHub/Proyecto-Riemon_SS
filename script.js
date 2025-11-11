// ========================================
// RIEMON - JavaScript Principal
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  
  // ====== INICIO: PROTECCIÓN Y SESIÓN ======
  const loggedInUser = sessionStorage.getItem("username");

  if (!loggedInUser) {
    window.location.href = "login.html";
  } else {
    document.getElementById("username-display").innerText = loggedInUser;
  }
  // ====== FIN: PROTECCIÓN Y SESIÓN ======

  // ====== INICIO: MODO OSCURO ======
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const htmlElement = document.documentElement;
  
  // Cargar preferencia guardada
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    htmlElement.classList.add("dark");
  }

  darkModeToggle.addEventListener("click", () => {
    htmlElement.classList.toggle("dark");
    const newDarkMode = htmlElement.classList.contains("dark");
    localStorage.setItem("darkMode", newDarkMode);
  });
  // ====== FIN: MODO OSCURO ======

  // ====== INICIO: MENÚ DE USUARIO ======
  const userMenuButton = document.getElementById("user-menu-button");
  const userMenuDropdown = document.getElementById("user-menu-dropdown");
  const userMenuContainer = document.getElementById("user-menu-container");
  const logoutButton = document.getElementById("logout-button");

  userMenuButton.addEventListener("click", () => {
    userMenuDropdown.classList.toggle("hidden");
  });

  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    window.location.href = "login.html";
  });

  window.addEventListener("click", (e) => {
    if (!userMenuContainer.contains(e.target)) {
      userMenuDropdown.classList.add("hidden");
    }
  });
  // ====== FIN: MENÚ DE USUARIO ======

  // ====== INICIO: PARTÍCULAS FLOTANTES ======
  function createParticles() {
    const container = document.getElementById("particles-container");
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.animationDuration = `${10 + Math.random() * 10}s`;
      container.appendChild(particle);
    }
  }
  createParticles();
  // ====== FIN: PARTÍCULAS FLOTANTES ======

  // ====== INICIO: CLIMA ======
  const weatherIconMap = {
    0: {
      desc: "Despejado",
      icon: "https://cdn.lordicon.com/flvisirw.json",
      colors: "primary:#f4b600,secondary:#fce596",
      emoji: "☀️",
    },
    1: {
      desc: "Principalmente despejado",
      icon: "https://cdn.lordicon.com/qcvtqfpg.json",
      colors: "primary:#f4b600,secondary:#cce5f4",
      emoji: "🌤️",
    },
    2: {
      desc: "Parcialmente nublado",
      icon: "https://cdn.lordicon.com/qcvtqfpg.json",
      colors: "primary:#f4b600,secondary:#cce5f4",
      emoji: "⛅",
    },
    3: {
      desc: "Nublado",
      icon: "https://cdn.lordicon.com/wmxtmfpb.json",
      colors: "primary:#a4d3f4,secondary:#cce5f4",
      emoji: "☁️",
    },
    45: {
      desc: "Niebla",
      icon: "https://cdn.lordicon.com/ayhtotha.json",
      colors: "primary:#a4d3f4,secondary:#cce5f4",
      emoji: "🌫️",
    },
    48: {
      desc: "Niebla densa",
      icon: "https://cdn.lordicon.com/ayhtotha.json",
      colors: "primary:#a4d3f4,secondary:#cce5f4",
      emoji: "🌫️",
    },
    51: {
      desc: "Llovizna ligera",
      icon: "https://cdn.lordicon.com/vjndwxlc.json",
      colors: "primary:#40a1e5,secondary:#cce5f4",
      emoji: "🌦️",
    },
    53: {
      desc: "Llovizna moderada",
      icon: "https://cdn.lordicon.com/vjndwxlc.json",
      colors: "primary:#40a1e5,secondary:#cce5f4",
      emoji: "🌧️",
    },
    55: {
      desc: "Llovizna intensa",
      icon: "https://cdn.lordicon.com/vjndwxlc.json",
      colors: "primary:#40a1e5,secondary:#cce5f4",
      emoji: "🌧️",
    },
    61: {
      desc: "Lluvia ligera",
      icon: "https://cdn.lordicon.com/yyecauzv.json",
      colors: "primary:#40a1e5,secondary:#cce5f4",
      emoji: "🌧️",
    },
    63: {
      desc: "Lluvia moderada",
      icon: "https://cdn.lordicon.com/yyecauzv.json",
      colors: "primary:#40a1e5,secondary:#cce5f4",
      emoji: "🌧️",
    },
    65: {
      desc: "Lluvia intensa",
      icon: "https://cdn.lordicon.com/yyecauzv.json",
      colors: "primary:#40a1e5,secondary:#cce5f4",
      emoji: "⛈️",
    },
    80: {
      desc: "Chubascos ligeros",
      icon: "https://cdn.lordicon.com/ymrqtppd.json",
      colors: "primary:#40a1e5,secondary:#cce5f4",
      emoji: "🌦️",
    },
    81: {
      desc: "Chubascos moderados",
      icon: "https://cdn.lordicon.com/ymrqtppd.json",
      colors: "primary:#40a1e5,secondary:#cce5f4",
      emoji: "🌧️",
    },
    82: {
      desc: "Chubascos violentos",
      icon: "https://cdn.lordicon.com/ymrqtppd.json",
      colors: "primary:#40a1e5,secondary:#cce5f4",
      emoji: "⛈️",
    },
    95: {
      desc: "Tormenta",
      icon: "https://cdn.lordicon.com/yvjfzxwk.json",
      colors: "primary:#f4b600,secondary:#40a1e5",
      emoji: "⛈️",
    },
  };

  const weatherIconEl = document.getElementById("weather-icon-dynamic");
  const weatherLocationEl = document.getElementById("weather-location");
  const weatherTempEl = document.getElementById("weather-temp");
  const weatherDescEl = document.getElementById("weather-desc");
  const weeklyForecastEl = document.getElementById("weekly-forecast");
  const currentLocationEl = document.getElementById("current-location");

  function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const temp = Math.round(data.current.temperature_2m);
        const wmoCode = data.current.weather_code;
        const location = data.timezone.split("/").pop().replace("_", " ");
        const weatherInfo = weatherIconMap[wmoCode] || weatherIconMap[0];

        weatherLocationEl.innerText = location;
        weatherTempEl.innerText = `${temp}°C`;
        weatherDescEl.innerText = weatherInfo.desc;
        weatherIconEl.setAttribute("src", weatherInfo.icon);
        weatherIconEl.setAttribute("colors", weatherInfo.colors);
        currentLocationEl.innerText = `📍 ${location}`;

        const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        const today = new Date().getDay();

        weeklyForecastEl.innerHTML = "";
        for (let i = 0; i < 7; i++) {
          const dayIndex = (today + i) % 7;
          const dayName = i === 0 ? "Hoy" : days[dayIndex];
          const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
          const minTemp = Math.round(data.daily.temperature_2m_min[i]);
          const dayWeatherCode = data.daily.weather_code[i];
          const dayWeather = weatherIconMap[dayWeatherCode] || weatherIconMap[0];

          const dayCard = document.createElement("div");
          dayCard.className = "weather-day bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-600";
          dayCard.innerHTML = `
            <p class="font-semibold text-gray-700 dark:text-gray-200 text-sm mb-2">${dayName}</p>
            <div class="text-3xl mb-2">${dayWeather.emoji}</div>
            <p class="text-lg font-bold text-gray-800 dark:text-gray-100">${maxTemp}°</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">${minTemp}°</p>
          `;
          weeklyForecastEl.appendChild(dayCard);
        }
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
        weatherDescEl.innerText = "Error al cargar clima";
      });
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeather(lat, lon);
        },
        (error) => {
          weatherDescEl.innerText = "Permiso de ubicación denegado.";
          fetchWeather(32.5149, -117.0382); // Coordenadas por defecto (Tijuana)
        }
      );
    } else {
      weatherDescEl.innerText = "Geolocalización no soportada.";
    }
  }
  // ====== FIN: CLIMA ======

  // ====== INICIO: ACTUALIZACIÓN DE HORA ======
  function updateClock() {
    const now = new Date();
    document.getElementById("last-updated").innerText = now.toLocaleTimeString();
  }
  // ====== FIN: ACTUALIZACIÓN DE HORA ======

  // ====== INICIO: SIMULACIÓN DE DATOS ======
  function simulateData() {
    const soilHumidity = (Math.random() * 30 + 35).toFixed(1);
    const ambientTemp = (Math.random() * 5 + 20).toFixed(1);
    const ambientHumidity = (Math.random() * 20 + 55).toFixed(1);
    const sunLight = Math.floor(Math.random() * 5000 + 10000);

    document.getElementById("soil-humidity").innerText = `${soilHumidity} %`;
    document.getElementById("ambient-temp").innerText = `${ambientTemp} °C`;
    document.getElementById("ambient-humidity").innerText = `${ambientHumidity} %`;
    document.getElementById("sun-light").innerText = sunLight;

    document.getElementById("soil-bar").style.width = `${(soilHumidity / 100) * 100}%`;
    document.getElementById("temp-bar").style.width = `${(ambientTemp / 40) * 100}%`;
    document.getElementById("humidity-bar").style.width = `${ambientHumidity}%`;
    document.getElementById("light-bar").style.width = `${(sunLight / 20000) * 100}%`;

    // Estado de la bomba
    const pumpText = document.getElementById("pump-status-text");
    const pumpDot = document.getElementById("pump-status-dot");
    const pumpIcon = document.getElementById("pump-icon");
    
    if (Math.random() > 0.7) {
      pumpText.innerText = "ON";
      pumpText.className = "text-5xl font-bold text-riemon-green dark:text-riemon-green-light";
      pumpDot.className = "w-5 h-5 rounded-full bg-riemon-green animate-pulse mr-3";
      pumpIcon.setAttribute("colors", "primary:#16c72e,secondary:#a8e0b0");
    } else {
      pumpText.innerText = "OFF";
      pumpText.className = "text-5xl font-bold text-gray-500 dark:text-gray-400";
      pumpDot.className = "w-5 h-5 rounded-full bg-gray-400 mr-3";
      pumpIcon.setAttribute("colors", "primary:#848484,secondary:#e4e4e4");
    }

    // Estado de la planta
    const plantText = document.getElementById("plant-status-text");
    const plantDot = document.getElementById("plant-status-dot");
    const plantIcon = document.getElementById("plant-icon");
    
    if (Math.random() > 0.1) {
      plantText.innerText = "Saludable";
      plantText.className = "text-4xl font-bold text-riemon-green dark:text-riemon-green-light";
      plantDot.className = "w-5 h-5 rounded-full bg-riemon-green mr-3";
      plantIcon.setAttribute("colors", "primary:#16c72e,secondary:#a8e0b0");
    } else {
      plantText.innerText = "Estresada";
      plantText.className = "text-4xl font-bold text-red-500 dark:text-red-400";
      plantDot.className = "w-5 h-5 rounded-full bg-red-500 mr-3";
      plantIcon.setAttribute("colors", "primary:#e83a30,secondary:#f49894");
    }

    // Actualizar estadísticas circulares
    const efficiency = Math.floor(Math.random() * 20 + 70);
    const waterSaved = Math.floor(Math.random() * 50 + 100);
    const plantHealth = Math.floor(Math.random() * 15 + 80);
    const co2Saved = (Math.random() * 2 + 2).toFixed(1);

    document.getElementById("efficiency").innerText = `${efficiency}%`;
    document.getElementById("water-saved").innerText = `${waterSaved}L`;
    document.getElementById("plant-health").innerText = `${plantHealth}%`;
    document.getElementById("co2-saved").innerText = `${co2Saved}kg`;

    document.querySelector('.stat-ring:nth-of-type(1)').parentElement.querySelector('.stat-ring').style.setProperty('--progress', `${efficiency}%`);

    updateClock();
  }
  // ====== FIN: SIMULACIÓN DE DATOS ======

  // ====== INICIO: INTERACCIÓN CON PLANTAS ======
  document.querySelectorAll('.plant, .tree').forEach(element => {
    element.addEventListener('click', () => {
      // Crear emoji flotante
      const emoji = document.createElement('div');
      emoji.innerText = ['🌱', '🌿', '🍃', '🌾'][Math.floor(Math.random() * 4)];
      emoji.style.position = 'fixed';
      emoji.style.left = `${element.getBoundingClientRect().left + 40}px`;
      emoji.style.bottom = '200px';
      emoji.style.fontSize = '30px';
      emoji.style.pointerEvents = 'none';
      emoji.style.zIndex = '9999';
      emoji.style.animation = 'floatUp 2s ease-out forwards';
      document.body.appendChild(emoji);

      setTimeout(() => emoji.remove(), 2000);
    });
  });

  // Agregar animación floatUp dinámicamente
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      to {
        transform: translateY(-100px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  // ====== FIN: INTERACCIÓN CON PLANTAS ======

  // ====== INICIALIZACIÓN ======
  getLocation();
  simulateData();
  setInterval(simulateData, 3000);
});