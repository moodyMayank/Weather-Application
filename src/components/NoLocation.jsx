import loader from "../assets/WeatherIcons.gif";
const NoLocation = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10 p-1 pb-8  max-w-5xl mx-auto shadow-2xl shadow-[#537FE7]">
        <div>
          <img src={loader} alt="" />
        </div>
        <h3 className="text-white text-4xl  font-semibold">
          Detecting your location
        </h3>
        <h3 className="text-white mt-8 text-center">
          Your current location will be displayed on the App <br /> & used for
          calculating real time weather.
        </h3>
      </div>
    </>
  );
};
export default NoLocation;
