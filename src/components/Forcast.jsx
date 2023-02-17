import { Search } from "@mui/icons-material";
import { useState, useEffect } from "react";
import apiKey from "../apiKey";
import ReactAnimatedWeather from "react-animated-weather";

const defaults = {
  color: "#E9F8F9",
  size: 150,
  animate: true,
};

const Forcast = ({ icon, weather, city }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState({});

  const search = async (city) => {
    try {
      const apiCall = await fetch(
        `${apiKey.base}weather?q=${
          city != "[object object]" ? city : query
        }&units=metric&APPID=${apiKey.key}`
      );
      const data = await apiCall.json();
      console.log(data);
      setWeatherData(data);
      setQuery("");
    } catch (error) {
      console.log(error);
      setWeatherData("");
      setQuery("");
      setError({ message: "Not Found", query: query });
    }
    console.log(weatherData);
  };

  useEffect(() => {
    search(city);
  }, []);

  return (
    <div className="text-white relative h-[600px] w-[100%] flex flex-col items-center">
      <div className="p-4">
        <ReactAnimatedWeather
          icon={icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="font-bold font-[Raleway] text-[50px] w-[100%] text-center px-2">
        {weather}
      </div>
      <div className="border-b w-[80%] mb-8" />
      <div className="border-2 pl-5 rounded-lg flex justify-between w-[80%] mx-auto">
        <input
          type="text"
          placeholder="Search Any City"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="flex flex-grow bg-transparent text-lg outline-none cursor-pointer "
        />
        <span
          onClick={search}
          className="rounded-full m-1 p-1 bg-slate-900 text-white cursor-pointer transition transform hover:scale-105 active:scale-95 duration-100 ease-in-out"
        >
          <Search style={{ color: "white", fontSize: "30px" }} />
        </span>
      </div>

      <div className="pt-5 w-[80%]">
        <ul>
          <li className="flex justify-between text-lg font-medium">
            Temperature
            <span>{Math.round(weatherData.main?.temp)}</span>
          </li>
          <div className="border-b w-[100%] my-3" />
          <li className="flex justify-between text-lg font-medium">
            Humidity
            <span>32C</span>
          </li>
          <div className="border-b w-[100%] my-3" />
          <li className="flex justify-between text-lg font-medium">
            Visibility
            <span>32C</span>
          </li>
          <div className="border-b w-[100%] my-3" />
          <li className="flex justify-between text-lg font-medium">
            Wind Speed
            <span>32C</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Forcast;
