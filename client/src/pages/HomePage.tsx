import BarChart from "../components/BarChart";
import { useState, useEffect } from "react";

const HomePage = () => {
  const data2 = () => {
    const getData = async () => {
      const res = await fetch("/api/tijden");
      const data = await res.json();
      return data;
    };
    getData();
  };

  const data = [
    { category: "A", value: 10 },
    { category: "B", value: 20 },
    { category: "C", value: 30 },
  ];

  return (
    <>
      <div>Dit is de home page</div>
      <BarChart data={data} />
    </>
  );
};

export default HomePage;
