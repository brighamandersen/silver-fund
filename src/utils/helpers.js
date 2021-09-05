export const getStatDecimal = () => {
  return Math.random().toFixed(3);
};

export const formatAsCurrency = (value) => {
  let prefix = "";
  if (value === 0) {
    return "$0";
  } else if (value < 0) {
    value = value * -1;
    prefix = "-$";
  } else {
    prefix = "$";
  }
  return prefix + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatAsPercentage = (value) => {
  if (value === 0) {
    return "0%";
  }
  return value.toFixed(2) + "%";
};

export const formatAsDecimal = (value) => value.toFixed(3);

/*
Returns back the array of dates that exist between two dates
*/
const getDateArray = (startDate, endDate) => {
  let dateArray = [];
  let currentDate = new Date(startDate);
  const stopDate = new Date(endDate);

  while (currentDate <= stopDate) {
    dateArray.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
};

export const getPrimColor = (colorNum, colors) => {
  if (colors < 1) colors = 1;
  return "hsl(" + ((colorNum * (360 / colors)) % 360) + ",90%,70%)";
};

export const getSecondColor = (colorNum, colors) => {
  if (colors < 1) colors = 1;
  return "hsl(" + ((colorNum * (360 / colors)) % 360) + ",85%,40%)";
};

export const convertToPercentage = (values) => {
  const add_abs = (a, b) => a + b;

  if (values.length === 0) {
    return values;
  } else {
    const sum = values.reduce(add_abs);

    return values.map((x) => 100 * (x / sum));
  }
};

export const formatTimeSeries = (
  filterData,
  chartData,
  startDate,
  stopDate,
  weight
) => {
  const add_abs = (a, b) => Math.abs(a) + Math.abs(b);
  let filteredTickers = [];
  let labels = [];
  let datasets = [];
  let timeSeriesData = [];

  filteredTickers = filterData.map(({ ticker }) => ticker);
  filteredTickers = [...new Set(filteredTickers)];
  labels = getDateArray(startDate, stopDate);

  // We fill our weights with one in case we want the $ value of each position
  let weights = [];
  let curr;

  // If we want portfolio weights
  if (weight === true) {
    for (let k = 0; k < labels.length; ++k) {
      curr = chartData.filter((item) => item.date === labels[k]);
      curr = curr.map(({ value }) => value);
      if (curr.length === 0) {
        weights.push(1);
      } else {
        weights.push(curr.reduce(add_abs));
      }
    }
  } else {
    weights = Array(labels.length).fill(1);
  }

  for (let i = 0; i < filteredTickers.length; i++) {
    let primcolor = getPrimColor(i, filteredTickers.length);
    let seccolor = getSecondColor(i, filteredTickers.length);
    let asset = {};
    asset.label = filteredTickers[i];
    asset.backgroundColor = seccolor;
    asset.borderColor = primcolor;
    asset.data = [];
    for (let j = 0; j < labels.length; j++) {
      let value = chartData.filter((item) => {
        return item.ticker === filteredTickers[i] && item.date === labels[j];
      });
      if (value.length === 0) {
        asset.data.push(0);
      } else {
        if (weight === true) {
          asset.data.push(((100 * value[0].value) / weights[j]).toFixed(2));
        } else {
          asset.data.push(value[0].value.toFixed(2));
        }
      }
    }
    asset.fill = false;
    datasets.push(asset);
  }
  timeSeriesData.push(labels);
  timeSeriesData.push(datasets);
  return timeSeriesData;
};

export const formatRiskTimeSeries = (data, GVT, RVT) => {
  let labels = data.map(({ date }) => date);
  let values;
  let realized_values;
  let exante_values;

  if (GVT === 0) {
    if (RVT === "total") {
      values = data.map(
        ({ ex_ante_portfolio_risk_total }) => ex_ante_portfolio_risk_total
      );
    } else {
      values = data.map(
        ({ ex_ante_portfolio_risk_active }) => ex_ante_portfolio_risk_active
      );
    }

    let datasets = [
      {
        label: "Exante-Risk", // Name the series
        data: values, // Specify the data values array
        fill: false,
        borderColor: "#2196f3", // Add custom color border (Line)
        backgroundColor: "#2196f3", // Add custom color background (Points and Fill)
        borderWidth: 1, // Specify bar border width
      },
    ];

    return [labels, datasets];
  }

  if (GVT === 1) {
    if (RVT === "total") {
      values = data.map(
        ({ realized_portfolio_risk_total }) => realized_portfolio_risk_total
      );
    } else {
      values = data.map(
        ({ realized_portfolio_risk_active }) => realized_portfolio_risk_active
      );
    }

    let datasets = [
      {
        label: "Realized Risk", // Name the series
        data: values, // Specify the data values array
        fill: false,
        borderColor: "#eb4034", // Add custom color border (Line)
        backgroundColor: "#eb4034", // Add custom color background (Points and Fill)
        borderWidth: 1, // Specify bar border width
      },
    ];

    return [labels, datasets];
  }

  if (GVT === 2) {
    if (RVT === "total") {
      realized_values = data.map(
        ({ realized_portfolio_risk_total }) => realized_portfolio_risk_total
      );
      exante_values = data.map(
        ({ ex_ante_portfolio_risk_total }) => ex_ante_portfolio_risk_total
      );
    } else {
      realized_values = data.map(
        ({ realized_portfolio_risk_active }) => realized_portfolio_risk_active
      );
      exante_values = data.map(
        ({ ex_ante_portfolio_risk_active }) => ex_ante_portfolio_risk_active
      );
    }

    let datasets = [
      {
        label: "Realized Risk", // Name the series
        data: realized_values, // Specify the data values array
        fill: false,
        borderColor: "#eb4034", // Add custom color border (Line)
        backgroundColor: "#eb4034", // Add custom color background (Points and Fill)
        borderWidth: 1, // Specify bar border width
      },
      {
        label: "Ex-Ante Risk", // Name the series
        data: exante_values, // Specify the data values array
        fill: false,
        borderColor: "#2196f3", // Add custom color border (Line)
        backgroundColor: "#2196f3", // Add custom color background (Points and Fill)
        borderWidth: 1, // Specify bar border width
      },
    ];

    return [labels, datasets];
  }

  if (GVT === 3) {
    if (RVT === "total") {
      values = data.map(
        ({ ex_ante_portfolio_benchmark_beta_active }) =>
          ex_ante_portfolio_benchmark_beta_active
      );
    } else {
      values = data.map(
        ({ ex_ante_portfolio_benchmark_beta_total }) =>
          ex_ante_portfolio_benchmark_beta_total
      );
    }

    let datasets = [
      {
        label: "Ex-Ante Beta to Benchmark", // Name the series
        data: values, // Specify the data values array
        fill: false,
        borderColor: "#2196f3", // Add custom color border (Line)
        backgroundColor: "#2196f3", // Add custom color background (Points and Fill)
        borderWidth: 1, // Specify bar border width
      },
    ];

    return [labels, datasets];
  }

  if (GVT === 4) {
    if (RVT === "total") {
      values = data.map(
        ({ realized_portfolio_benchmark_beta_active }) =>
          realized_portfolio_benchmark_beta_active
      );
    } else {
      values = data.map(
        ({ realized_portfolio_benchmark_beta_total }) =>
          realized_portfolio_benchmark_beta_total
      );
    }

    let datasets = [
      {
        label: "Realized Beta to Benchmark", // Name the series
        data: values, // Specify the data values array
        fill: false,
        borderColor: "#eb4034", // Add custom color border (Line)
        backgroundColor: "#eb4034", // Add custom color background (Points and Fill)
        borderWidth: 1, // Specify bar border width
      },
    ];

    return [labels, datasets];
  }

  if (GVT === 5) {
    if (RVT === "total") {
      console.log("HERE", data);
      realized_values = data.map(
        ({ realized_portfolio_benchmark_beta_total }) =>
          realized_portfolio_benchmark_beta_total
      );
      exante_values = data.map(
        ({ ex_ante_portfolio_benchmark_beta_total }) =>
          ex_ante_portfolio_benchmark_beta_total
      );
    } else {
      realized_values = data.map(
        ({ realized_portfolio_benchmark_beta_active }) =>
          realized_portfolio_benchmark_beta_active
      );
      exante_values = data.map(
        ({ ex_ante_portfolio_benchmark_beta_active }) =>
          ex_ante_portfolio_benchmark_beta_active
      );
    }

    let datasets = [
      {
        label: "Realized Beta to Benchmark", // Name the series
        data: realized_values, // Specify the data values array
        fill: false,
        borderColor: "#eb4034", // Add custom color border (Line)
        backgroundColor: "#eb4034", // Add custom color background (Points and Fill)
        borderWidth: 1, // Specify bar border width
      },
      {
        label: "Ex-Ante  Beta to Benchmark", // Name the series
        data: exante_values, // Specify the data values array
        fill: false,
        borderColor: "#2196f3", // Add custom color border (Line)
        backgroundColor: "#2196f3", // Add custom color background (Points and Fill)
        borderWidth: 1, // Specify bar border width
      },
    ];
    console.log("datasets", datasets);
    return [labels, datasets];
  } else {
    return [["A", "B", "C"], [{ label: "hi", data: [1, 2, 3] }]];
  }
};
