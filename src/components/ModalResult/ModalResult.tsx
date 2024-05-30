import { Modal } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";
import {
  IconCross,
  ModalInfoContainer,
  ModalInfoTitle,
} from "./ModalResult.styles";

interface IModalResult {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  wasSentSuccessfully: boolean;
}

const ModalResult: FC<IModalResult> = ({
  isOpen,
  setIsOpen,
  wasSentSuccessfully,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ModalInfoContainer>
        <Icon
          name={wasSentSuccessfully ? "icon-success" : "icon-error"}
          width={100}
          height={100}
        />
        <ModalInfoTitle
          wasSentSuccessfully={wasSentSuccessfully}
          className="text-[30px]"
        >
          {wasSentSuccessfully ? "Success" : "Error"}
        </ModalInfoTitle>
        <IconCross
          onClick={() => setIsOpen(false)}
          name="icon-cross"
          width={20}
          height={20}
        />
      </ModalInfoContainer>
    </Modal>
  );
};

export default ModalResult;
