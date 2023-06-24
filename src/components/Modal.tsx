"use client";
import React, { PropsWithChildren } from "react";
import { Modal as Base } from "flowbite-react";
import Button from "./Button";

type Props = {
  show: boolean;
  title: string;
  onClose: () => void;
  onClick: () => void;
  onCancel: () => void;
  onOkLabel?: string;
  onCancelLabel?: string;
};

export const Modal = (props: PropsWithChildren<Props>) => {
  const { show, onClose, onClick, onOkLabel, onCancelLabel, title, onCancel } =
    props;
  return (
    <Base show={show} onClose={onClose} className="bg-[#181b34]">
      <Base.Header className=" bg-[#181b34]">
        <span className="text-white">{title}</span>
      </Base.Header>
      <Base.Body className="bg-[#181b34]">{props.children}</Base.Body>
      <Base.Footer className="bg-[#181B34] d-flex justify-end">
        <Button
          btnType="danger"
          label={onCancelLabel ?? "Cancel"}
          onClick={onCancel}
        />
        <Button
          btnType="primary"
          label={onOkLabel ?? "Save"}
          onClick={onClick}
        />
      </Base.Footer>
    </Base>
  );
};

export default Modal;
