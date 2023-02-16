import CurrentLocation from "./components/CurrentLocation";
import NoLocation from "./components/NoLocation";
import Forcast from "./components/Forcast";

import useWeather from "./hooks/useWeather";

const App = () => {
  const weatherData = useWeather();
  console.log(weatherData);

  if (!weatherData.temperatureC) return <NoLocation />;
  else
    return (
      <>
        <div className="mt-12 mx-auto h-[93vh]">
          <div className="flex flex-col md:flex-row items-center justify-center relative max-w-4xl mx-auto shadow-2xl shadow-white">
            <CurrentLocation {...weatherData} />
            <Forcast icon="CLEAR_DAY" weather="Haze" />
          </div>
          {/* Footer */}
          <div className="flex items-center justify-center p-5 text-md font-semibold text-white">
            <a href="">Download Source Code</a>
            <a href="">Developed By Mayank Kumar</a>
            <a href="">Linkedin Profile</a>
          </div>
        </div>
      </>
    );
};

export default App;
