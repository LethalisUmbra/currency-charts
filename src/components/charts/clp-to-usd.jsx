import { useEffect, useState } from "react";
import { ChartComponent } from ".";
import moment from "moment/moment";

const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 22.68 },
  { time: "2018-12-31", value: 22.67 },
];

export default function CLPToUSD() {
  const [info, setInfo] = useState(null);

  async function getData() {
    const res = await fetch("https://mindicador.cl/api/dolar");
    const data = await res.json();
    if (!res.ok) {
      console.log(data);
      return;
    }
    const serie = [];
    data.serie.forEach((val) => {
      serie.push({
        time: moment(val.fecha).format("YYYY-MM-DD"),
        value: val.valor,
      });
    });
    serie.sort((a, b) => moment(a.time).unix() - moment(b.time).unix());
    console.log(serie);
    data.serie = serie;
    setInfo(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='bg-gray-800 text-white rounded border shadow p-5 space-y-3'>
      <h2 className='font-medium text-2xl'>
        {info?.nombre}
        <hr />
      </h2>
      <ChartComponent data={info?.serie ?? initialData} />
    </div>
  );
}
