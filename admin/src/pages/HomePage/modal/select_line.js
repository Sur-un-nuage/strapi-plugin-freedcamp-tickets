import React from "react";
import { Box } from "@strapi/design-system";
import MySelect from "./select";
import { typeOptions, statusOptions, priorityOptions } from "./options";
import { buildUserOptions } from "../functions";

export default function SelectLine({
  handlePriorityChange,
  handleStatusChange,
  handleTypeChange,
  priority,
  status,
  type,
  handleUserChange,
  assignedToId,
  users,
  where,
  canEdit,
}) {
  const selectsTop = [
    {
      label: "Type",
      options: typeOptions,
      value: type,
      onChange: (value) => {
        handleTypeChange(value);
      },
    },
    {
      label: "Priorité",
      options: priorityOptions,
      value: priority,
      onChange: (value) => {
        handlePriorityChange(value);
      },
    },
  ];
  const selectsBottom = [
    {
      label: "Attribué à",
      options: buildUserOptions(users),
      value: assignedToId,
      onChange: (value) => {
        handleUserChange(value);
      },
    },
    {
      label: "Statut",
      options: statusOptions,
      value: status,
      onChange: (value) => {
        handleStatusChange(value);
      },
    },
  ];
  let selects = where === "top" ? selectsTop : selectsBottom;
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: where === "top" ? "flex-start" : "space-between",
        marginBottom: 20,
      }}
    >
      {selects.map((sel, index) => (
        <div
          key={sel.label}
          style={{
            width: "100%",
            marginLeft: index !== 0 && 4,
            marginRight: index !== 2 && 4,
          }}
        >
          <MySelect
            label={sel.label}
            options={sel.options}
            onChange={sel.onChange}
            value={sel.value}
            index={index}
            canEdit={canEdit}
          />
        </div>
      ))}
    </div>
  );
}
