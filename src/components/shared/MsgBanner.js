import React from "react";
import styled from "styled-components";
import { useBanner } from "../../utils/BannerContext";

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

const MsgBanner = () => {
  const { isSuccess, msg, clearMsg } = useBanner();

  return (
    <>
      {msg && (
        <BannerWrapper success={isSuccess}>
          {msg}
          <CloseBannerX onClick={clearMsg}>🞬</CloseBannerX>
        </BannerWrapper>
      )}
    </>
  );
};
export default MsgBanner;
