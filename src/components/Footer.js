import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/constants";

const Wrapper = styled.footer`
  text-align: center;
  color: ${COLORS.fade2};
  height: 50px;
  padding-top: 15px;
`;

const Footer = () => (
  <Wrapper>
    <p>&copy; Silver Fund | All Rights Reserved</p>
  </Wrapper>
);

export default Footer;
