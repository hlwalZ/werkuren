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

  let data: any;
  (async () => {
    try {
      data = await fetchTotals();
    } catch {
      console.log("unexpected error");
    }
  })();
  // Async functie die andere functie called (vind ik niet fijn om mee te werken)

  const getParagraphValue = (id: string) => {
    return parseInt(
      (document.getElementById(`${id}`) as HTMLInputElement).value
    );
  };

  const switchDate = (date: number) => {
    switch (date) {
      case 0:
        return "Zo";
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
      default:
        return "Go Cry TypeScript, also the world exploded because there is no day";
    }
  };

  const getDatum = () => {
    let today: Date | string = new Date();
    let date: number | string = today.getDay();
    date = switchDate(date); // Called functie hierboven om de dag te sturen als abbr
    let dd: number | string = today.getDate();
    let mm: number | string = today.getMonth();
    let yyyy: number | string = today.getFullYear();
    mm++;
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    today = yyyy + "-" + mm + "-" + dd;
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

    const [today, date] = getDatum();

    ongeldigeData === false
      ? (obj = {
          datum: today,
          dag: date,
          uren: urenArray,
          totaal: urenTotaal,
        })
      : console.log("Niet vervalsen je data");
    // Ja we doen hier aan data validatie op de frontend want we zijn te lui om een API te schrijven.

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
