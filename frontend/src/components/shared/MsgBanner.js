import React from "react";
import styled from "styled-components";

import { COLORS } from "../../utils/constants";

const BannerWrapper = styled.div`
  background-color: ${(props) =>
    props.success ? COLORS.successGreen : COLORS.errorRed};
  padding-left: 20px;
  min-height: 25px;
`;

const CloseBannerX = styled.span`
  margin-left: 20px;
  cursor: pointer;

  &:hover {
    color: ${COLORS.silver};
  }
`;

export const MsgBanner = (props) => (
  <>
    {props.msg && (
      <BannerWrapper success={props.success}>
        {props.msg}
        <CloseBannerX onClick={() => props.setMsg(null)}>🞬</CloseBannerX>
      </BannerWrapper>
    )}
  </>
);

export default MsgBanner;
