import { ReactNode } from "react";
import Modal from "react-bootstrap/Modal";

export function Modalize({
  children,
  show,
  onHide,
}: {
  children: ReactNode;
  show: boolean;
  onHide: () => void;
}) {
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={onHide}
      >
        {children}
      </Modal>
    </>
  );
}
