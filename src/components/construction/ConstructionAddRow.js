import React from "react";
import Select from "react-select";

import { CUSTOM_SELECT_THEME } from "../../utils/constants";

export const ConstructionAddRow = (props) => {
  const onChangeAddTicker = (value) => {
    props.setErrorMsg(null);

    const alreadyExists = props.paperTarget.some(
      (el) => el.ticker === value.ticker
    );

    if (!alreadyExists) {
      props.setPaperTarget([
        ...props.paperTarget,
        {
          asset: value.asset_id,
          ticker: value.ticker,
          model_er: "-",
          annualized_er: "",
          beta_to_b: "-",
          alpha: "-",
          oa_weight: "-",
          b_weight: "-",
          c_weight: "-",
          backlog: "-",
          backlog_risk: "-",
          current_holding: value.current_holding,
        },
      ]);
      props.setHasProcessed(false);
    } else {
      props.setErrorMsg(
        "That position is already an active position.  Try selecting a different one."
      );
    }
  };

  return (
    <tr>
      <td className="blank-cell btm-left-cell">
        <Select
          theme={CUSTOM_SELECT_THEME}
          options={props.apiSecurities}
          noOptionsMessage={() => "No matches found.  Try again."}
          placeholder="Add New (Type to Search)"
          value={null}
          onChange={onChangeAddTicker}
          isSearchable
          getOptionLabel={(option) => `${option.ticker} - ${option.comnam}`}
        />
      </td>
      <td className="blank-cell" />
      <td className="blank-cell">
        <input disabled />
      </td>
      <td className="blank-cell" />
      <td className="blank-cell" />
      <td className="blank-cell" />
      <td className="blank-cell" />
      <td className="blank-cell" />
      <td className="blank-cell" />
      <td className="blank-cell btm-right-cell" />
    </tr>
  );
};

export default ConstructionAddRow;
