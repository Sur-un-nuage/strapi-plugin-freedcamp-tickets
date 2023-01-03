import React, { useState } from "react";
import useOnClickOutside from "use-onclickoutside";

export default function Contextual({ deleteIssue, item }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = React.useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));
  const manageOnClick = () => {
    deleteIssue(item);
    setIsOpen(false);
  };
  return (
    <div className="contextual" ref={ref}>
      <p className="contextual-dots" onClick={() => setIsOpen(true)}>
        ...
      </p>
      {isOpen && (
        <div className="contextual-container">
          <p className="contextual-text" onClick={manageOnClick}>
            Supprimer
          </p>
        </div>
      )}
    </div>
  );
}
