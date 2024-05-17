import { useState, useEffect, useRef } from "react";
import Slider from "../components/Slider";
import { useNavigate } from "react-router-dom";

const AddHours = ({ addHoursSubmit }: any) => {
  const navigate = useNavigate();

  const fetchTotals = async () => {
    const res = await fetch("/api/totaal");
    const data = await res.json();
    return data;
  };

  // const data = fetchTotals().then((value) => {
  //   console.log("de data is er");
  //   // "We hebben de data ontvangen, werkt de console log in de globale scope nu wel?"
  // });

  // const danZo = async () => {
  //   try {
  //     const data
  //   }
  // }
  // const fakeData = [
  //   {
  //     id: "Geleerd",
  //     totaal: 3,
  //   },
  //   {
  //     id: "Gewerkt",
  //     totaal: 2,
  //   },
  //   {
  //     id: "Onderzocht",
  //     totaal: 1,
  //   },
  // ];

  let data: any;
  (async () => {
    try {
      data = await fetchTotals();
      console.log(data);
    } catch {
      console.log("unexpected error");
    }
  })();

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

  const switchDate = (date: number) => {
    switch (date) {
      case 1:
        return "Ma";
      case 2:
        return "Di";
      case 3:
        return "Wo";
      case 4:
        return "Do";
      case 5:
        return "Vr";
      case 6:
        return "Za";
      case 7:
        return "Zo";
      default:
        return "Go Cry TypeScript, also the world exploded because there is no day";
    }
  };

  const getDatum = () => {
    let today: Date | string = new Date();
    let date: number | string = today.getDay();
    date = switchDate(date);
    let dd: number | string = today.getDate();
    let mm: number | string = today.getMonth();
    let yyyy: number | string = today.getFullYear();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    today = yyyy + "/" + mm + "/" + dd;
    return [today, date];
  };

  const submitForm = (event: any) => {
    event.preventDefault();
    let urenArray = [];
    let urenTotaal = 0;
    let arrayCounter = 0;
    let obj;
    let ongeldigeData = false;

    // Dit is ook echt zo mega scuffed hahaha
    for (let i = 0; i < 6; i++) {
      let waardeUren: number = getParagraphValue(`slider${i + 1}`);
      if (waardeUren >= 0 && waardeUren <= 8) {
        urenTotaal = waardeUren;
      } else ongeldigeData = true;

      let waardeKwart = getParagraphValue(`slider${i + 2}`);
      if (waardeKwart >= 0 && waardeKwart <= 3) {
        urenTotaal += waardeKwart * 0.25;
      } else ongeldigeData = true;

      urenArray[arrayCounter] = urenTotaal;
      urenTotaal = 0;
      arrayCounter++;
      i++;
    }

    for (let i = 0; i < urenArray.length; i++) {
      urenTotaal += urenArray[i];

      data[i].totaal += urenArray[i];

      (async () => {
        await fetch(`/api/totaal/${data[i].id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data[i]),
        });
      })();
    }
    console.log(urenArray);
    console.log(data);

    const [today, date] = getDatum();

    ongeldigeData === false
      ? (obj = {
          datum: today,
          dag: date,
          uren: urenArray,
          totaal: urenTotaal,
        })
      : console.log("Niet vervalsen je data");

    if (!ongeldigeData) {
      addHoursSubmit(obj);
      return navigate("/");
    }
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
                accentColor="accent-pastelGroen"
                id="slider1"
                outputID="output-geleerd-uren"
                label="Geleerd"
                max={8}
              />

              <Slider
                name="kwart-geleerd"
                accentColor="accent-pastelGroen"
                id="slider2"
                outputID="output-geleerd-kwart"
                label="Geleerd"
                max={3}
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
                max={3}
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
                max={3}
              />

              <div className="col-span-2 flex place-content-center pt-10">
                <input
                  className="bg-pastelGoud opacity-70 pl-5 pr-5 pt-2.5 pb-2.5 hover:opacity-100 rounded-full  "
                  type="submit"
                  value="Toevoegen"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddHours;
