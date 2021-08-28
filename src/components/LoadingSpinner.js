import React from "react";
import styled from "styled-components";

const Spinner = styled.div`
  border: 12px solid transparent;
  border-top: 12px solid white;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 0.7s linear infinite;
  margin: auto;
  margin-top: 100px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = () => <Spinner />;

export default LoadingSpinner;
