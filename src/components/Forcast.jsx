import { Search } from "@mui/icons-material";
import { useState, useContext } from "react";
import apiKey from "../apiKey";
import ReactAnimatedWeather from "react-animated-weather";
import { DataContext } from "../context/DataProvider";
import { Icons } from "../constants";

const defaults = {
  color: "#E9F8F9",
  size: 150,
  animate: true,
};

const Forcast = () => {
  const { weatherData, setWeatherData } = useContext(DataContext);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const search = () => {
    fetch(`${apiKey.base}weather?q=${query}&units=metric&APPID=${apiKey.key}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData({
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
        setQuery("");
        setError({});
      })
      .catch((error) => {
        setQuery("");
        setError({ message: "Not Found", query: ": " + query });
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") search();
  };

  return (
    <div className="text-white relative h-[600px] w-[100%] flex flex-col items-center">
      <div className="p-4">
        <ReactAnimatedWeather
          icon={weatherData.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="font-bold font-[Raleway] text-[50px] w-[100%] text-center px-2">
        {weatherData.main}
      </div>
      <div className="border-b w-[80%] mb-8" />
      <div className="border-2 pl-5 rounded-lg flex justify-between w-[80%] mx-auto">
        <input
          type="text"
          placeholder="Search Any City"
          onKeyDown={handleKeyDown}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="flex flex-grow bg-transparent text-lg outline-none cursor-pointer "
        />
        <span
          onClick={search}
          className="rounded-full m-1 p-1 bg-[#537FE7] text-white cursor-pointer transition transform hover:scale-105 active:scale-95 duration-100 ease-in-out"
        >
          <Search style={{ color: "white", fontSize: "30px" }} />
        </span>
      </div>
      <h1 className="pt-2 font-bold text-xl text-red-400">
        {error.message}{" "}
        <span className="text-white capitalize">{error.query}</span>
      </h1>
      <div className="pt-5 w-[80%]">
        <ul>
          <li className="flex justify-between text-lg font-medium">
            Temperature (Fahrenheit)
            <span>
              {weatherData && Math.round(weatherData.temperatureF)}° F
            </span>
          </li>
          <div className="border-b w-[100%] my-3" />
          <li className="flex justify-between text-lg font-medium">
            Humidity
            <span>{Math.round(weatherData.humidity)} %</span>
          </li>
          <div className="border-b w-[100%] my-3" />
          <li className="flex justify-between text-lg font-medium">
            Visibility
            <span>{Math.round(weatherData.visibility)} mi</span>
          </li>
          <div className="border-b w-[100%] my-3" />
          <li className="flex justify-between text-lg font-medium">
            Wind Speed
            <span>{Math.round(weatherData.windSpeed)} Km/hr</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Forcast;
