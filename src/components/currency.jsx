import { useEffect, useState } from "react";
import moment from "moment/moment";
import { ChartComponent } from "./charts";

export default function Currency({ currency, className }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    async function getData() {
      if (!currency) return;
      const res = await fetch(`https://mindicador.cl/api/${currency.codigo}`);
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
      data.serie = serie;
      setInfo(data);
    }

    getData();
  }, [currency]);

  return (
    <div
      className={
        "bg-gray-800 text-white rounded border border-gray-900 shadow p-5 space-y-3 " +
        className
      }
    >
      <h2 className='font-medium text-xl'>
        {info?.nombre}
        <hr />
      </h2>
      <ChartComponent data={info?.serie ?? []} />
    </div>
  );
}
