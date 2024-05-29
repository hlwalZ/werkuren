import { ResponsiveRadar } from "@nivo/radar";
import { useEffect, useState } from "react";
const SpiderChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/totaal");
      const resData = await res.json();
      setData(resData);
    })();
  }, []);

  return (
    <div style={{ height: "300px", width: "600px" }}>
      <ResponsiveRadar
        data={data}
        keys={["totaal"]}
        indexBy="id"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: "color" }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        colors={["#DBBA02"]}
        blendMode="multiply"
        motionConfig="wobbly"
      />
    </div>
  );
};

export default SpiderChart;
