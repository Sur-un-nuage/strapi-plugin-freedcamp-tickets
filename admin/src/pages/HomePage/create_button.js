import React from "react";

import { Button } from "@strapi/design-system";

import Plus from "@strapi/icons/Plus";

export default function ModalButton({ openModal }) {
  return (
    <>
      <Button startIcon={<Plus />} onClick={openModal}>
        Ajouter un ticket
      </Button>
    </>
  );
}
