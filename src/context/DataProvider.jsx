import { useState, createContext } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
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
    visibility: undefined,
    windSpeed: undefined,
    // errorMsg: undefined,
  });

  return (
    <DataContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
