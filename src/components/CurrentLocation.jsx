import cityImage from "../assets/b1.jpg";
import dateBuilder from "../utils/dateBuilder";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

const CurrentLocation = () => {
  const { weatherData } = useContext(DataContext);
  return (
    <div className="relative h-[600px] ">
      <div className="relative w-[100%] h-[600px] ">
        <img
          src={cityImage}
          alt="Weather Image"
          className="h-[100%] w-[100%] object-cover "
        />
      </div>
      <div className="absolute  text-white top-0 right-0 px-10 pt-5">
        <h2 className="font-bold text-3xl md:text-2xl text-end font-mono antialiased">
          {weatherData.city}
        </h2>
        <h3 className="font-semibold text-md text-end ">
          {weatherData.country}
        </h3>
      </div>
      <div className="absolute  text-white bottom-0 flex flex-col justify-evenly items-center space-x-5 w-[100%] p-1">
        <p className="text-[80px] font-[Raleway] ">
          {weatherData.temperatureC}°<span>C</span>
        </p>
        <p className="opacity-80 font-normal text-xl ">
          {dateBuilder(new Date())}
        </p>
      </div>
    </div>
  );
};

export default CurrentLocation;
