import { createChart, CrosshairMode } from "lightweight-charts";
import { useEffect, useRef } from "react";

const styles = {
  height: 200,
  layout: {
    background: {
      type: "solid",
      color: "#2B2B43",
    },
    lineColor: "#2B2B43",
    textColor: "#D9D9D9",
  },
  watermark: {
    color: "rgba(0, 0, 0, 0)",
  },
  grid: {
    vertLines: {
      color: "#2B2B43",
    },
    horzLines: {
      color: "#363C4E",
    },
  },
  crosshair: {
    mode: CrosshairMode.Normal,
    color: "#758696",
  },
  rightPriceScale: {
    borderColor: "rgba(197, 203, 206, 0.8)",
  },
  timeScale: {
    borderColor: "rgba(197, 203, 206, 0.8)",
  },
};
const areaOptions = {
  topColor: "rgba(32, 226, 47, 0.56)",
  bottomColor: "rgba(32, 226, 47, 0.04)",
  lineColor: "rgba(32, 226, 47, 1)",
  lineWidth: 2,
};

export const ChartComponent = ({ data, className }) => {
  // Create ref to point the chart
  const chartContainerRef = useRef();

  // Load the data into the chart
  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, styles);
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries(areaOptions);
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} className={className} />;
};
