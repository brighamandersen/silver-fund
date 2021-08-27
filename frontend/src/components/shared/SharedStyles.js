import styled from "styled-components";
import { COLORS } from "../../utils/constants";

export const Content = styled.div`
  background-color: ${COLORS.silver};
  min-height: 81vh;
  color: ${COLORS.navy};
  padding: 2vw;
`;

export const DescriptionLabel = styled.label`
  display: block;
  font-size: medium;
  font-weight: 500;
`;

export const InlineDescriptionLabel = styled(DescriptionLabel)`
  float: left;
  padding-top: 2px;
  padding-right: 10px;
`;

export const RadioOptionLabel = styled.label`
  display: inline-block;
  font-size: medium;
  padding: 0 15px;
`;

export const RadioInput = styled.input.attrs({ type: "radio" })`
  display: block;
  margin: auto;
  height: 25px;
  width: 100%;
`;

export const DateInput = styled.input.attrs({ type: "date" })`
  float: right;
  width: 150px;
`;

export const FixMeWrapper = styled.div`
  height: 500px;
  background: repeating-linear-gradient(
    45deg,
    #bdbdbd,
    #bdbdbd 10px,
    #9c9c9c 10px,
    #9c9c9c 20px
  );
`;

export const TwoColWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SnapshotTwoColWrapper = styled(TwoColWrapper)`
  flex-wrap: wrap-reverse;
`;

export const LeftCol = styled.div`
  flex: 1;
  float: left;
  margin-right: 50px;
`;

export const RightCol = styled.div`
  flex: 1;
  float: right;
`;
