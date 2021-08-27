import React, { useState } from "react";
import Select from "react-select";

import { CUSTOM_SELECT_THEME } from "../../utils/constants";

export const RiskWhatIfStocksTable = (props) => {
  const [selectedStocks, setSelectedStocks] = useState([]);

  const allStocks = [
    { stockTicker: "ABC", presentAW: "X%", proposedAW: "" },
    { stockTicker: "QRS", presentAW: "Y%", proposedAW: "" },
    { stockTicker: "XYZ", presentAW: "Z%", proposedAW: "" },
  ];

  const onChangeAddStock = (value) => {
    props.setErrorMsg(null);

    const alreadyExists = selectedStocks.some(
      (el) => el.stockTicker === value.stockTicker
    );

    if (!alreadyExists) {
      setSelectedStocks([
        ...selectedStocks,
        {
          stockTicker: value.stockTicker,
          presentAW: value.presentAW,
          proposedAW: "",
        },
      ]);
    } else {
      props.setErrorMsg(
        "That stock has already been selected.  Try selecting a different one."
      );
    }
  };

  const removeStock = (value) => {
    props.setErrorMsg(null);

    const tempArrObj = selectedStocks.filter(
      (el) => el.stockTicker !== value.stockTicker
    );
    setSelectedStocks(tempArrObj);
  };

  const onProposedChange = (stockTicker, value) => {
    let tempArrObj = [...selectedStocks];
    tempArrObj.forEach((el) => {
      if (el.stockTicker === stockTicker) {
        el.proposedAW = value;
      }
    });
    setSelectedStocks(tempArrObj);
  };

  return (
    <>
      <table className="table-with-select">
        <thead>
          <tr>
            <th className="top-left-cell" style={{ width: "300px" }}>
              Stock Name
            </th>
            <th>Present Active Weight</th>
            <th className="top-right-cell">Proposed Active Weight</th>
            <th className="clear-cell" style={{ width: "100px" }} />
          </tr>
        </thead>
        <tbody>
          {selectedStocks.map((el) => (
            <tr key={el.stockTicker}>
              <td>{el.stockTicker}</td>
              <td>{el.presentAW}</td>
              <td>
                <input
                  type="number"
                  placeholder="Enter Decimal"
                  value={el.proposedAW}
                  onChange={(e) =>
                    onProposedChange(el.stockTicker, e.target.value)
                  }
                />
              </td>
              <td className="clear-cell">
                <button
                  className="btn delete-table-row-btn"
                  onClick={() => removeStock(el)}
                >
                  🞬
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="blank-cell btm-left-cell ticker-selector">
              <Select
                theme={CUSTOM_SELECT_THEME}
                options={allStocks}
                placeholder="Search for Stocks"
                isSearchable
                value={null}
                onChange={onChangeAddStock}
                getOptionLabel={(option) => `${option.stockTicker}`}
                noOptionsMessage={() => "All stocks have been selected."}
              />
            </td>
            <td className="blank-cell" />
            <td className="blank-cell btm-right-cell">
              <input disabled />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default RiskWhatIfStocksTable;
