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
  isSubmitSuccessful: boolean;
}

const ModalResult: FC<IModalResult> = ({
  isOpen,
  setIsOpen,
  isSubmitSuccessful,
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
          name={isSubmitSuccessful ? "icon-success" : "icon-error"}
          width={100}
          height={100}
        />
        <ModalInfoTitle
          wasSentSuccessfully={isSubmitSuccessful}
          className="text-[30px]"
        >
          {isSubmitSuccessful ? "Success" : "Error"}
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
