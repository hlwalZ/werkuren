import { useState, useEffect, useRef } from "react";
import Slider from "../components/Slider";

const AddHours = () => {
  // we hadden ook useState kunnen gebruiken voor het updaten van de pagina, alleen render je opnieuw daarmee een volledig component, nu voeger
  // useEffect(() => {
  //   const rangeInput: any = document.getElementById("uren-geleerd");
  //   const outputParagraph: any = document.getElementById("output-geleerd");
  //   const rangeInputLeer: any = document.getElementById("uren-gewerkt");
  //   const outputParagraphLeer: any = document.getElementById("output-gewerkt");

  //   const handleRangeChange = (event: any, nummer: number) => {
  //     if (nummer == 0) {
  //       outputParagraph.textContent = event.target.value;
  //     } else {
  //       outputParagraphLeer.textContent = event.target.value;
  //     }
  //   };

  //   rangeInput.addEventListener("input", (event: any) =>
  //     handleRangeChange(event, 0)
  //   );
  //   rangeInputLeer.addEventListener("input", (event: any) =>
  //     handleRangeChange(event, 1)
  //   );

  //   // Cleanup function to remove event listener when changing page by router, since we're using SPA.
  //   return () => {
  //     rangeInput.removeEventListener("input", handleRangeChange);
  //   };
  //   // return in useEffect weergeeft niets op de pagina, kan een beetje raar voelen maar dit is gewoon cleanup.
  // }, []);
  // We gebruiken een lege array om te zeggen tegen React dat het useEffect maar één keer hoeft te worden gebruikt OOIT, zelfs als useState het volledige component opnieuw probeert te laden.
  // https://dev.to/csituma/why-we-use-empty-array-with-useeffect-iok
  // Als we de array niet neerzetten zal dat bijvoorbeeld problemen kunnen geven als je in je useEffect data fetched van een API en later met useState probeert te updaten want useState zou het volledige component opnieuw laten renderen waardoor de useState fetch onnodig zou worden.

  // const dynamischRef: any = useRef(null);

  // <div className="flex place-content-center items-center items-stretch">
  //                 {/* <p id="output-geleerd" className="inline " ref={dynamischRef}> */}
  //                 <p id="output-geleerd" className="inline">
  //                   0
  //                 </p>
  //               </div>

  // De waarde van een HTMLInputElement wordt altijd gezien als een string, zelfs als je input type gezet is naar nummer! Jammer dan maar gewoon een praseInt gebruiken, je kan als tweede waarde met parseInt een base meegeven zoals 1 of 10

  // Er is vast een betere manier maar ik heb geen zin erin om dit te automatiseren

  const getParagraphValue = (id: string) => {
    return parseInt(
      (document.getElementById(`${id}`) as HTMLInputElement).value
    );
  };

  const getDay = () => {
    let today: Date | string = new Date();
    let dd: number | string = today.getDate();
    let mm: number | string = today.getMonth();
    let yyyy: number | string = today.getFullYear();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  };

  const submitForm = (event: any) => {
    event.preventDefault();
    let dataUren = [];
    let dataKwart = [];
    let obj;
    let ongeldigeData = false;

    // Dit is ook echt zo mega scuffed hahaha
    for (let i = 1; i < 7; i++) {
      let waarde: number = getParagraphValue(`slider${i}`);
      waarde >= 0 && waarde <= 8
        ? dataUren.push(waarde)
        : (ongeldigeData = true);
      i++;
      waarde = getParagraphValue(`slider${i}`);
      waarde >= 0 && waarde <= 8
        ? dataKwart.push(waarde)
        : (ongeldigeData = true);
    }

    ongeldigeData === false
      ? (obj = {
          dag: `${getDay()}`,
          uren: `${dataUren}`,
          kwartieren: `${dataKwart}`,
        })
      : console.log("Niet vervalsen je data");

    if (!ongeldigeData) console.log(obj);
  };

  return (
    <>
      <section className=" flex ">
        <div className=" bg-indigo-100 m-auto w-2/3 rounded-xl">
          <div className="mb-10">
            <h1 className="text-center text-3xl mb-10 mt-10">
              Hoeveel uren heb je besteed?
            </h1>

            <div className="grid grid-cols-2 overflow-hidden">
              <p className="flex place-content-center">Uren</p>
              <p className="flex place-content-center">Kwartieren</p>
            </div>

            <form
              onSubmit={submitForm}
              className="grid grid-cols-2 overflow-hidden"
            >
              <Slider
                name="uren-geleerd"
                accentColor="accent-pastelGoud"
                id="slider1"
                outputID="output-geleerd-uren"
                label="Geleerd"
                max={8}
              />

              <Slider
                name="kwart-geleerd"
                accentColor="accent-pastelGoud"
                id="slider2"
                outputID="output-geleerd-kwart"
                label="Geleerd"
                max={4}
              />

              <Slider
                name="uren-gewerkt"
                accentColor="accent-pastelRoze"
                id="slider3"
                outputID="output-gewerkt-uren"
                label="Gewerkt"
                max={8}
              />

              <Slider
                name="kwart-gewerkt"
                accentColor="accent-pastelRoze"
                id="slider4"
                outputID="output-gewerkt-kwart"
                label="Gewerkt"
                max={4}
              />

              <Slider
                name="uren-onderzocht"
                accentColor="accent-pastelBlauw"
                id="slider5"
                outputID="output-onderzocht-uren"
                label="Onderzocht"
                max={8}
              />

              <Slider
                name="kwart-onderzocht"
                accentColor="accent-pastelBlauw"
                id="slider6"
                outputID="output-onderzocht-kwart"
                label="Onderzocht"
                max={4}
              />

              <div className="col-span-2 flex place-content-center pt-10">
                <button
                  className="bg-pastelGroen opacity-70 pl-5 pr-5 pt-2.5 pb-2.5 hover:opacity-100 rounded-full  "
                  type="button"
                  onClick={submitForm}
                >
                  Versturen
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddHours;
