import { useEffect, useState } from "react";
import Currency from "./currency";

export default function Currencies() {
  const [currencies, setCurrencies] = useState();

  const getData = async () => {
    const res = await fetch("https://mindicador.cl/api");
    const data = await res.json();
    const { version, autor, fecha, ...values } = data;

    const temp = [];
    Object.keys(values).map((key) => {
      temp.push(values[key]);
    });
    setCurrencies(temp);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='grid grid-cols-3 gap-5'>
      {currencies?.map((currency) => (
        <Currency
          currency={currency}
          key={currency.codigo}
          className={"hover:scale-105 transition-all"}
        />
      ))}
    </div>
  );
}
