import BarChart from "../components/BarChart";
import SpiderChart from "../components/SpiderChart";
import { useState, useEffect } from "react";

const HomePage = () => {
  const data2 = async () => {
    const getData = async () => {
      const res = await fetch("/api/tijden");
      if (!res.ok) {
        throw new Error("Iets met het netwerk ging fout")
      }
      const data = await res.json();
      // console.log(data)
      return data;
    };
    return await getData();
  };
  const antwoord = data2()
    

  const data = [
    { dag: "13/04/2024", geleerd: 4, gewerkt: 2, onderzocht: 1},
    { dag: "14/04/2024", geleerd: 6, gewerkt: 1.25, onderzocht: 0},
    { dag: "15/04/2024", geleerd: 3.5, gewerkt: 1, onderzocht: 2},
  ];
  data.forEach((element) => { console.log(element)})
  return (
    <>
      <BarChart data={data} />
      <SpiderChart data={data} />
    </>
  );
};

export default HomePage;
