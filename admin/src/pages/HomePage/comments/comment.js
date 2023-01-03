import React, { useState } from "react";

import { Typography, Button } from "@strapi/design-system";

import BareEditor from "../editor/bare";

export default function Comment({ closeCommentMode, manageUpsertComment }) {
  const [value, setValue] = useState("");
  const handleCommentChange = (value) => {
    setValue(value);
  };
  const managaOnClick = () => {
    manageUpsertComment(value);
  };
  return (
    <div>
      <BareEditor handleCommentChange={handleCommentChange} comment={value} />
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}
      >
        <Typography
          variant="pi"
          style={{
            opacity: 0.8,
            marginTop: 15,
            marginRight: 12,
            cursor: "pointer",
          }}
          onClick={closeCommentMode}
        >
          Annuler
        </Typography>
        <Button variant="success-light" size="S" onClick={managaOnClick}>
          Envoyer
        </Button>
      </div>
    </div>
  );
}
