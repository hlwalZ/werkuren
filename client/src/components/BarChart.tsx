import { BarDatum, ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";

interface categorieWaarde extends BarDatum {
  dag: string;
  geleerd: number;
  gewerkt: number;
  onderzocht: number;
}

interface barData {
  data: categorieWaarde[];
}

const BarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Define an asynchronous function to fetch data
    async function fetchData() {
      try {
        // Fetch data from the API endpoint
        const response = await fetch("/api/tijden");
        // Parse the JSON response
        const jsonData = await response.json();
        const lastSevenData = await jsonData.slice(-7);
        // Update the component state with the fetched data

        const transformedData = await lastSevenData.map((item: any) => ({
          dag: item.dag, // Use the dag property from the original data
          Geleerd: item.uren[0], // First element of the uren array for Geleerd
          Gewerkt: item.uren[1], // Second element of the uren array for Gewerkt
          Onderzocht: item.uren[2], // Third element of the uren array for Onderzocht
        }));
        console.log(transformedData);
        setData(transformedData);
      } catch (error) {
        // Handle any errors that occur during data fetching
        console.error("Error fetching data:", error);
      }
    }

    // Call the fetchData function when the component mounts
    fetchData();

    // Since we only want to fetch data once when the component mounts,
    // we provide an empty dependency array to useEffect
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
        // defs={[
        //   {
        //     id: "dots",
        //     type: "patternDots",
        //     background: "inherit",
        //     color: "#38bcb2",
        //     size: 4,
        //     padding: 1,
        //     stagger: true,
        //   },
        //   {
        //     id: "lines",
        //     type: "patternLines",
        //     background: "inherit",
        //     color: "#eed312",
        //     rotation: -45,
        //     lineWidth: 6,
        //     spacing: 10,
        //   },
        // ]}
        // fill={[
        //   {
        //     match: {
        //       id: "fries",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "sandwich",
        //     },
        //     id: "lines",
        //   },
        // ]}
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
          legend: "Dag van de week",
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
        // legends={[
        //   {
        //     dataFrom: "keys",
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 120,
        //     translateY: 0,
        //     itemsSpacing: 2,
        //     itemWidth: 100,
        //     itemHeight: 20,
        //     itemDirection: "left-to-right",
        //     itemOpacity: 0.85,
        //     symbolSize: 20,
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
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
