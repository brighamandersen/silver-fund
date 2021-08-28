import React from "react";
import { HorizontalBar } from "react-chartjs-2";

import { formatAsCurrency, formatAsPercentage } from "../../utils/helpers";
import LoadingSpinner from "../LoadingSpinner";
import { COLORS } from "../../utils/constants";

const PositionsBarChart = (props) => (
  <>
    {props.tickerData && props.tickerData.length > 0 ? (
      <div
        style={{
          backgroundColor: COLORS.white,
          paddingRight: "35px",
          paddingBottom: "10px",
          border: `5px solid ${COLORS.silver}`,
          borderRadius: "15px",
        }}
        className="mt-0 mb-4"
      >
        <HorizontalBar
          data={{
            labels: props.tickerData,
            datasets: [
              {
                label: props.tool_tip_label,
                data: props.valuesData,
                backgroundColor: "#3f5f80",
                barPercentage: 0.5,
                hoverBackgroundColor: COLORS.navy,
              },
            ],
          }}
          width={50}
          height={50}
          options={{
            title: {
              display: true,
              fontsize: 40,
              fontColor: COLORS.black,
            },
            tooltips: {
              multiKeyBackground: COLORS.black,
              mode: "index",
              intersect: false,
              callbacks: {
                label: (tooltipItems) => {
                  if (props.isCurrency) {
                    return formatAsCurrency(tooltipItems.xLabel);
                  } else {
                    return formatAsPercentage(tooltipItems.xLabel);
                  }
                },
              },
            },
            legend: {
              display: false,
              position: "right",
              labels: {
                fontColor: COLORS.black,
              },
            },
            layout: {
              padding: {
                left: 50,
                right: 0,
                bottom: 0,
                top: 0,
              },
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    callback: (value) => {
                      if (props.isCurrency) {
                        // Remove currency but no decimals.
                        return formatAsCurrency(value).slice(0, -3);
                      } else {
                        return value + "%";
                      }
                    },
                  },
                  stacked: true,
                  scaleLabel: {
                    display: true,
                    labelString: props.x_label,
                    fontSize: 20,
                    fontColor: COLORS.black,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    fontColor: COLORS.black,
                    fontSize: 14,
                  },
                },
              ],
            },
          }}
        />
      </div>
    ) : (
      <LoadingSpinner />
    )}
  </>
);

export default PositionsBarChart;
