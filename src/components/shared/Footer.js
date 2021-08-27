import React from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/constants";

const SFooter = styled.footer`
  text-align: center;
  color: ${COLORS.fade2};
  height: 50px;
  padding-top: 15px;
`;

export const Footer = () => (
  <SFooter>
    <p>&copy; Silver Fund | All Rights Reserved</p>
  </SFooter>
);

export default Footer;
