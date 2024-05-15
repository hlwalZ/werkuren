import { ResponsiveRadar } from "@nivo/radar"


const SpiderChart = () => {

    const data = [
        {
          "soort": "geleerd",
          "totaal": 13.5,
          
        },
        {
          "soort": "gewerkt",
          "totaal": 4.25
        },
        {
          "soort": "onderzocht",
          "totaal": 3
        },
       
      ]

  return (

<div style={{height: "400px", width: "800px"}}>
    <ResponsiveRadar
        data={data}
        keys={[ 'totaal' ]}
        indexBy="soort"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: 'color' }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={["#DBBA02"]}
        blendMode="multiply"
        motionConfig="wobbly"
        // legends={[
        //     {
        //         anchor: 'top-left',
        //         direction: 'column',
        //         translateX: -50,
        //         translateY: -40,
        //         itemWidth: 80,
        //         itemHeight: 20,
        //         itemTextColor: '#999',
        //         symbolSize: 12,
        //         symbolShape: 'circle',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemTextColor: '#000'
        //                 }
        //             }
        //         ]
        //     }
        // ]}
    />
    </div>
  )
}

export default SpiderChart
