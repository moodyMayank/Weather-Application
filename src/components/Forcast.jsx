import { Search } from "@mui/icons-material";
import ReactAnimatedWeather from "react-animated-weather";

const defaults = {
  color: "white",
  size: 150,
  animate: true,
};

const Forcast = ({ icon, weather }) => {
  console.log(weather);
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
          className="flex flex-grow bg-transparent text-lg outline-none cursor-pointer "
        />
        <span className="rounded-full m-1 p-1 bg-slate-900 text-white cursor-pointer">
          <Search style={{ color: "white", fontSize: "30px" }} />
        </span>
      </div>

      <div className="pt-5 w-[80%]">
        <ul>
          <li className="flex justify-between">
            Temperature
            <span>32C</span>
          </li>
          <div className="border-b w-[100%] my-3" />
          <li className="flex justify-between">
            Temperature
            <span>32C</span>
          </li>
          <div className="border-b w-[100%] my-3" />
          <li className="flex justify-between">
            Temperature
            <span>32C</span>
          </li>
          <div className="border-b w-[100%] my-3" />
          <li className="flex justify-between">
            Temperature
            <span>32C</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Forcast;
