import { days, months } from "../constants";

const dateBuilder = (d) => {
  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  let date = d.getDate();

  return `${day}, ${date} ${month} ${year}`;
};

export default dateBuilder;
