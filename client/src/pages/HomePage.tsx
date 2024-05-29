import BarChart from "../components/BarChart";
import SpiderChart from "../components/SpiderChart";
import Calendar from "../components/Calendar";
import { useState, useEffect } from "react";

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
