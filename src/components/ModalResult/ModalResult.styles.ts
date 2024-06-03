import styled from "@emotion/styled";
import { Icon } from "../Icon";

interface IProps {
  wasSentSuccessfully: boolean;
}

export const ModalInfoContainer = styled.div`
  position: relative;
  width: 700px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #142d4c;
  border-radius: 10px;
  gap: 50px;
  padding-top: 10px;
`;

export const ModalInfoTitle = styled.h1<IProps>`
  color: ${({ wasSentSuccessfully }) =>
    wasSentSuccessfully ? "var(--accent-color)" : "--error-color"};
  font-size: 40px;
  text-align: center;
  font-weight: 700;
`;

export const IconCross = styled(Icon)`
  position: absolute;
  top: 20px;
  right: 20px;
  color: grey;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ffffff;
  }
`;
