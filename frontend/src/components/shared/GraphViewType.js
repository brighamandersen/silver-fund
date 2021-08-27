import React from "react";
import Select from "react-select";
import { CUSTOM_SELECT_THEME } from "../../utils/constants";
import { InlineDescriptionLabel } from "./SharedStyles";
import styled from "styled-components";

const LocalWrapper = styled.div`
  width: 380px;
  float: right;
  margin: 10px;
`;

const SelectWrapper = styled.div`
  width: 380px;
`;

const GraphDescriptionLabel = styled(InlineDescriptionLabel)`
  padding-top: 7px;
`;

const GraphViewType = (props) => (
  <LocalWrapper>
    <GraphDescriptionLabel>Graph View Type:</GraphDescriptionLabel>
    <SelectWrapper>
      <Select
        theme={CUSTOM_SELECT_THEME}
        options={props.dropdownOptions}
        defaultValue={props.dropdownOptions[0]}
        onChange={(index) => props.setGraphVT(index.value)}
        maxMenuHeight="8"
        isOptionDisabled={(option) => option.disabled}
      />
    </SelectWrapper>
  </LocalWrapper>
);

export default GraphViewType;
