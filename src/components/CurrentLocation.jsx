import cityImage from "../assets/city.jpg";
import dateBuilder from "../utils/dateBuilder";

import Clock from "react-live-clock";

const CurrentLocation = ({ city, country, temperatureC }) => {
  return (
    <div className="relative  h-[600px] ">
      <div className="relative w-[100%] h-[600px] ">
        <img
          src={cityImage}
          alt="Weather Image"
          className="h-[100%] w-[100%] object-cover "
        />
      </div>
      <div className="absolute  text-white top-0 right-0 px-10 pt-5">
        <h2 className="font-bold text-2xl text-end font-mono antialiased ">
          {city}
        </h2>
        <h3 className="font-semibold text-md text-end pt-1">{country}</h3>
      </div>
      <div className="absolute  text-white bottom-0 flex justify-evenly items-center space-x-5 w-[100%] p-2">
        <div className="">
          <p className="font-normal text-3xl">
            <Clock format="HH:mm:ss" interval={1000} ticking={true} />
          </p>
          <p className="opacity-80 font-normal text-xl pt-1">
            {dateBuilder(new Date())}
          </p>
        </div>
        <p className="text-[100px] font-[Raleway]">
          {temperatureC}°<span>C</span>
        </p>
      </div>
    </div>
  );
};

export default CurrentLocation;
