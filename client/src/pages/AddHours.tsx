import { useState, useEffect } from "react";

const submitForm = (data: any) => {
  console.log(data);
};

const AddHours = () => {
  // we hadden ook useState kunnen gebruiken voor het updaten van de pagina, alleen render je opnieuw daarmee een volledig component, nu voege
  useEffect(() => {
    const rangeInput: any = document.getElementById("uren-geleerd");
    const outputParagraph: any = document.getElementById("output-geleerd");
    const rangeInputLeer: any = document.getElementById("uren-gewerkt");
    const outputParagraphLeer: any = document.getElementById("output-gewerkt");

    const handleRangeChange = (event: any, nummer: number) => {
      if (nummer == 0) {
        outputParagraph.textContent = event.target.value;
      } else {
        outputParagraphLeer.textContent = event.target.value;
      }
    };

    rangeInput.addEventListener("input", (event: any) =>
      handleRangeChange(event, 0)
    );
    rangeInputLeer.addEventListener("input", (event: any) =>
      handleRangeChange(event, 1)
    );

    // Cleanup function to remove event listener when changing page by router, since we're using SPA.
    return () => {
      rangeInput.removeEventListener("input", handleRangeChange);
    };
    // return in useEffect weergeeft niets op de pagina, kan een beetje raar voelen maar dit is gewoon cleanup.
  }, []);
  // We gebruiken een lege array om te zeggen tegen React dat het useEffect maar één keer hoeft te worden gebruikt OOIT, zelfs als useState het volledige component opnieuw probeert te laden.
  // https://dev.to/csituma/why-we-use-empty-array-with-useeffect-iok
  // Als we de array niet neerzetten zal dat bijvoorbeeld problemen kunnen geven als je in je useEffect data fetched van een API en later met useState probeert te updaten want useState zou het volledige component opnieuw laten renderen waardoor de useState fetch onnodig zou worden.

  return (
    <>
      <section className="bg-indigo-300 flex">
        <div className=" m-auto ">
          <div>
            <h1 className="text-center">Hoeveel uren heb je gewerkt?</h1>
            <form className="grid grid-cols-2">
              <div className="m-0">
                <label htmlFor="uren-geleerd" className="">
                  Uren geleerd:
                </label>
                <input
                  type="range"
                  id="uren-geleerd"
                  name="uren-geleerd"
                  max="12"
                  min="0"
                  defaultValue="0"
                  className="accent-orange-600"
                />
                <p id="output-geleerd" className="inline">
                  0
                </p>
              </div>

              <div>
                <label htmlFor="uren-gewerkt" className="">
                  Uren gewerkt
                </label>
                <input
                  type="range"
                  id="uren-gewerkt"
                  name="uren-gewerkt"
                  min="0"
                  max="12"
                  defaultValue="0"
                  className="accent-purple-600"
                />
                <p id="output-gewerkt" className="inline ">
                  0
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddHours;
