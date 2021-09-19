import React from "react";
import { Line } from "react-chartjs-2";

import {
  formatAsCurrency,
  formatAsPercentage,
  getPrimColor,
  getSecondColor,
} from "../utils/helpers";
import LoadingSpinner from "./LoadingSpinner";
import { COLORS, CORNER_ROUNDING } from "../utils/constants";

const PositionsTimeSeries = (props) => (
  <div
    style={{
      backgroundColor: COLORS.white,
      padding: "40px",
      borderRadius: CORNER_ROUNDING,
    }}
  >
    {props.data &&
    props.data.length > 0 &&
    !(
      props.data[1].length > 1 &&
      props.data[1].every(
        (v) => v.backgroundColor === props.data[1][0].backgroundColor
      )
    ) ? (
      <Line
        data={{
          labels: props.data[0],
          datasets: props.data[1],
        }}
        width={50}
        height={25}
        options={{
          responsive: true,
          bezierCurve: false,
          elements: {
            line: {
              tension: 0,
            },
          },
          legend: {
            display: true,
            onClick: (e) => e.stopPropagation()
          },
          tooltips: {
            multiKeyBackground: COLORS.black,
            mode: "index",
            intersect: false,
            bodyAlign: "right",
            itemSort: (a, b, tooltipItems) => b.yLabel - a.yLabel,
            callbacks: {
              label: (tooltipItems) => {
                if (props.isCurrency) {
                  return formatAsCurrency(tooltipItems.yLabel);
                } else {
                  return formatAsPercentage(tooltipItems.yLabel);
                }
              },
            },
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                display: true,
              },
            ],
            yAxes: [
              {
                ticks: {
                  callback: (tickValue) => {
                    if (props.isCurrency) {
                      // Remove currency but no decimals.
                      return formatAsCurrency(tickValue).slice(0, -3);
                    } else {
                      return tickValue + "%";
                    }
                  },
                },
                display: true,
              },
            ],
          },
        }}
      />
    ) : (
      <LoadingSpinner />
    )}
  </div>
);

export default PositionsTimeSeries;
