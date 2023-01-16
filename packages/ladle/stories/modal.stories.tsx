import React, { useState } from "react";
import Button from "../../components/button";
import Modal from "../../components/modal";

export const DefaultConfig = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} label="Open modal" />
      <Modal
        isVisible={isOpen}
        onClose={() => setIsOpen(false)}
        acceptText="Accept Text"
        declineText="Decline Text"
      >
        Hay un costo de vida que debemos pagar. Una escena viva, te leo en
        imágenes y te veo en letras algo así parecido a la distancia.
      </Modal>
    </>
  );
};
