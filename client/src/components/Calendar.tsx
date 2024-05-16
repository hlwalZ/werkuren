import { ResponsiveCalendar } from "@nivo/calendar";
import styles from "../index.css";

const Calendar = () => {
  const data = [
    {
      value: 8,
      day: "2016-02-06",
    },
    {
      value: 12,
      day: "2016-12-05",
    },
    {
      value: 6,
      day: "2016-07-11",
    },
  ];

  return (
    <div className="calendar-container h-48 w-full mt-10">
      <ResponsiveCalendar
        data={data}
        from="2016-01-01"
        to="2016-12-31"
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
