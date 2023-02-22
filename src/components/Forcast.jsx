import { Search } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
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
    try {
      console.log("enter here ");
      fetch(`${apiKey.base}weather?q=${query}&units=metric&APPID=${apiKey.key}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setWeatherData({
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

          setQuery("");
        });
    } catch (error) {
      console.log(error);
      setWeatherData("");
      setQuery("");
      setError({ message: "Not Found", query: query });
    }
    console.log(weatherData);
  };

  const handleKeyDown = (event) => {
    console.log("here");
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

      <div className="pt-5 w-[80%]">
        <ul>
          <li className="flex justify-between text-lg font-medium">
            Temperature
            <span>{weatherData && Math.round(weatherData.temperatureC)}</span>
          </li>
          <div className="border-b w-[100%] my-3" />
          <li className="flex justify-between text-lg font-medium">
            Humidity
            <span>{Math.round(weatherData.humidity)}</span>
          </li>
          <div className="border-b w-[100%] my-3" />
          <li className="flex justify-between text-lg font-medium">
            Visibility
            {/* <span>32C</span> */}
          </li>
          <div className="border-b w-[100%] my-3" />
          <li className="flex justify-between text-lg font-medium">
            Wind Speed
            {/* <span>32C</span> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Forcast;
