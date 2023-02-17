import CurrentLocation from "./components/CurrentLocation";
import NoLocation from "./components/NoLocation";
import Forcast from "./components/Forcast";

import useWeather from "./hooks/useWeather";
import { GitHub, LinkedIn } from "@mui/icons-material";

const App = () => {
  const weatherData = useWeather();
  console.log(weatherData);

  if (!weatherData.temperatureC) return <NoLocation />;
  else
    return (
      <>
        <div className="mt-12 mx-auto h-[93vh]">
          <div className="flex flex-col md:flex-row items-center justify-center relative max-w-5xl mx-auto shadow-2xl shadow-[#537FE7]">
            <CurrentLocation {...weatherData} />
            <Forcast
              icon={weatherData.icon}
              weather={weatherData.main}
              city={weatherData.city}
            />
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
      </>
    );
};

export default App;
