import { useContext, useEffect } from "react";
import CurrentLocation from "../components/CurrentLocation";
import Forcast from "../components/Forcast";
import NoLocation from "../components/NoLocation";
import { DataContext } from "../context/DataProvider";
import { LinkedIn, GitHub } from "@mui/icons-material";
import apiKey from "../apiKey";
import { Icons } from "../constants";

const Home = () => {
  const { weatherData, setWeatherData } = useContext(DataContext);

  const userCurrentLocation = () => {
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
      console.log(data);
      console.log(setWeatherData);
      setWeatherData({
        lat: lat,
        lon: lon,
        city: data.name,
        temperatureC: Math.round(data.main.temp),
        temperatureF: Math.round(data.main.temp * 1.8 + 32),
        humidity: data.main.humidity,
        main: data.weather[0].main,
        country: data.sys.country,
        visibility: data.visibility,
        windSpeed: data.wind.speed,
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
  };

  useEffect(() => {
    console.log("called");
    userCurrentLocation();
  }, []);

  console.log(weatherData);
  console.log(weatherData.temperatureC);
  if (!weatherData.temperatureC) return <NoLocation />;
  return (
    <div className="mt-12 mx-auto h-[93vh]">
      <div className="flex flex-col md:flex-row items-center justify-center relative max-w-5xl mx-auto shadow-2xl shadow-[#537FE7]">
        <CurrentLocation />
        <Forcast />
      </div>
      {/* Footer */}
      <div className="flex items-center justify-center p-4 space-x-2 text-md font-semibold text-white">
        <p className="text-md">Developed By Mayank ❤️ | </p>
        <div className="flex items-center space-x-2">
          <a
            href="https://www.linkedin.com/in/mayank-kumar-83a623193/"
            target="_blank"
          >
            <LinkedIn />
          </a>
          <a href="https://github.com/moodyMayank" target="_blank">
            <GitHub />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
