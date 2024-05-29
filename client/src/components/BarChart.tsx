import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";

const BarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/tijden");

        const jsonData = await response.json();
        // Slice laatste zeven registraties
        const lastSevenData = await jsonData.slice(-7);
        const transformedData = await lastSevenData.map((item: any) => ({
          // Slice "yyyy-" weg
          dag: item.datum.slice(5),
          Geleerd: item.uren[0],
          Gewerkt: item.uren[1],
          Onderzocht: item.uren[2],
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ height: "300px", width: "600px" }}>
      <ResponsiveBar
        data={data}
        keys={["Geleerd", "Gewerkt", "Onderzocht"]}
        indexBy="dag"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={["#1d8764", "#413FA3", "#D35879"]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Laatste zeven registraties",
          legendPosition: "middle",
          legendOffset: 32,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Uren",
          legendPosition: "middle",
          legendOffset: -40,
          truncateTickAt: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
      />
    </div>
  );
};

export default BarChart;
