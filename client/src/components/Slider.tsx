import React from "react";

interface sliderProps {
  id: string;
  name: string;
  accentColor: string;
  outputID: string;
  label: string;
  max: number;
}

const handleUrenGelerdChange = (event: any, outputID: string, id: string) => {
  const newValue: string = event.target.value;
  const paragraph: HTMLParagraphElement | any =
    document.getElementById(outputID);
  paragraph.textContent = newValue;
};

const Slider = ({
  id,
  name,
  accentColor,
  outputID,
  label,
  max,
}: sliderProps) => {
  return (
    <>
    <div className="flex place-content-center">
      <label htmlFor={id} className="">
        {label}:
      </label>
      <input
        type="range"
        id={id}
        name={name}
        max={max}
        min={0}
        defaultValue={0}
        className={`ml-2 mr-2 mb-3 ${accentColor}`}
        onChange={(event) => {
          handleUrenGelerdChange(event, outputID, id);
        }}
      />
      
      <p id={outputID} className="inline ">
        0
      </p>
      </div>
    </>
  );
};

export default Slider;

// id = unieke slider naam dus bijvoorbeeld slider1

// naam = de data naam die je verstuurd dus stel je stuurt firstName en lastName door als Ken Ben: firstName=Ken&lastName=Ben wordt doorgestuurd.
// Voor de slider hanteren we: uren-geleerd, kwart-geleerd, uren-gewerkt, kwart-gewerkt, uren-onderzocht, kwart-onderzocht.

// Voor de outputID hanteren we: output-geleerd-uren, output-geleerd-kwart, output-gewerkt-uren, output-gewerkt-kwart, output-onderzocht-uren, output-onderzocht kwart
