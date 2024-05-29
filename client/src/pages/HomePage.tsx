import BarChart from "../components/BarChart";
import SpiderChart from "../components/SpiderChart";
import Calendar from "../components/Calendar";

const HomePage = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <BarChart />
        <SpiderChart />
      </div>
      <div className="flex items-center justify-center">
        <Calendar />
      </div>
    </>
  );
};

export default HomePage;
