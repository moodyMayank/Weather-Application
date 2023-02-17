import { useState, useEffect } from "react";
import apiKey from "../apiKey";
import { Icons } from "../constants";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState({
    lat: undefined,
    lon: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    // sunrise: undefined,
    // sunset: undefined,
    // errorMsg: undefined,
  });

  useEffect(() => {
    const getPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    const getWeather = async (lat, lon) => {
      const apiCall = await fetch(
        `${apiKey.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKey.key}`
      );
      const data = await apiCall.json();

      setWeatherData({
        lat: lat,
        lon: lon,
        city: data.name,
        temperatureC: Math.round(data.main.temp),
        temperatureF: Math.round(data.main.temp * 1.8 + 32),
        humidity: data.main.humidity,
        main: data.weather[0].main,
        country: data.sys.country,
        icon: Icons[data.weather[0].main]
          ? Icons[data.weather[0].main]
          : "CLEAR_DAY",
      });
    };

    if (navigator.geolocation) {
      getPosition()
        .then((position) => {
          getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. This APP to access your location. Your current location will be used for calculating real time weather"
          );
        });
    } else {
      alert("GeoLocation is Not Available");
    }

    const timerId = setInterval(
      () => getWeather(weatherData.lat, weatherData.lon),
      600000
    );

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return weatherData;
};

export default useWeather;
