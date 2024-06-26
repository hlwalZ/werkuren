import { ResponsiveCalendar } from "@nivo/calendar";
import { useState } from "react";

const Calendar = () => {
  const [data, setData] = useState([]);

  (async () => {
    const res = await fetch("/api/tijden");
    const resData = await res.json();

    const transformedData = await resData.map((item: any) => ({
      value: item.totaal,
      day: item.datum,
    }));
    setData(transformedData);
  })();
  // IIFE i.p.v. async functie maken en achteraf callen.

  return (
    <div className="calendar-container h-48 w-full mt-10">
      <ResponsiveCalendar
        data={data}
        from="2024-01-01"
        to="2024-12-31"
        emptyColor="rgba(255, 255, 255, 0)"
        colors={["#1d8764", "#413FA3", "#D35879"]}
        margin={{ top: 40, right: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="rgba(255, 255, 255)"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  );
};

export default Calendar;
