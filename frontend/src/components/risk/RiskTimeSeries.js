import React from "react";
import { Line } from "react-chartjs-2";

import {
  formatAsCurrency,
  formatAsPercentage,
  getPrimColor,
  getSecondColor,
} from "../../utils/helpers";
import LoadingSpinner from "../shared/LoadingSpinner";
import { COLORS } from "../../utils/constants";

export const RiskTimerSeries = (props) => (
  <div
    style={{
      backgroundColor: COLORS.white,
      padding: "40px",
      borderRadius: "15px",
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
            onClick: (e, legendItem) => {
              var index = legendItem.datasetIndex;
              var ci = this.chart;

              ci.data.datasets.forEach((e, i) => {
                var meta = ci.getDatasetMeta(i);

                if (i !== index) {
                  if (ci.data.datasets[i].backgroundColor !== "#6666") {
                    ci.data.datasets[i].backgroundColor = "#6666";
                    ci.data.datasets[i].borderColor = "#6666";
                    // meta.hidden = meta.hidden === null ? !meta.hidden : null;
                  } else {
                    ci.data.datasets[i].backgroundColor = getSecondColor(
                      ci.data.datasets.length,
                      i
                    );
                    ci.data.datasets[i].borderColor = getPrimColor(
                      ci.data.datasets.length,
                      i
                    );
                    // meta.hidden = true;
                  }
                } else if (i === index) {
                  meta.hidden = null;
                }
              });

              ci.update();
            },
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

export default RiskTimerSeries;
