import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import PropTypes from "prop-types";
import styled from "styled-components";
import { formatAsCurrency, formatAsPercentage } from "../utils/helpers";
import LoadingSpinner from "./LoadingSpinner";
import { COLORS, CORNER_ROUNDING } from "../utils/constants";

const Wrapper = styled.div`
  background: ${COLORS.white};
  padding-right: 35px;
  padding-bottom: 10px;
  border: 5px solid ${COLORS.silver};
  border-radius: ${CORNER_ROUNDING};
`;

const PositionsBarChart = (props) => {
  const { tickerData, valuesData, xLabel, tooltipLabel, isCurrency } = props;

  return (
    <>
      {tickerData && tickerData.length > 0 ? (
        <Wrapper className="mt-0 mb-4">
          <HorizontalBar
            data={{
              labels: tickerData,
              datasets: [
                {
                  label: tooltipLabel,
                  data: valuesData,
                  backgroundColor: COLORS.fadeNavy,
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
                    if (isCurrency) {
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
                        if (isCurrency) {
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
                      labelString: xLabel,
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
        </Wrapper>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

PositionsBarChart.propTypes = {
  tickerData: PropTypes.arrayOf(PropTypes.string).isRequired,
  valuesData: PropTypes.arrayOf(PropTypes.number).isRequired,
  xLabel: PropTypes.string.isRequired,
  tooltipLabel: PropTypes.string.isRequired,
  isCurrency: PropTypes.bool,
};

PositionsBarChart.defaultProps = {
  isCurrency: false,
};

export default PositionsBarChart;
