import React from "react";
import {
  // Stack,
  // Box,
  Typography,
  Select,
  Option,
  Icon,
} from "@strapi/design-system";

import Gravatar from "react-gravatar";

export default function MySelect({
  index = 10,
  options,
  label,
  value,
  onChange,
  canEdit,
}) {
  return (
    <Select
      value={value}
      id={`select${index}`}
      label={label}
      placeholder="Choisir..."
      onChange={onChange}
      selectButtonTitle="Carret Down Button"
      disabled={canEdit === true ? false : true}
    >
      {options.map((option) => (
        <Option key={option.label} value={option.value}>
          <div style={{ display: "flex", paddingTop: 2 }}>
            {option.icon ? (
              <div style={{ marginTop: 2 }}>
                <Icon
                  style={{ marginRight: 8 }}
                  width={`1rem`}
                  height={`1rem`}
                  color="secondary500"
                  as={option.icon}
                />
              </div>
            ) : null}
            {option.background ? (
              <div
                style={{
                  height: "12px",
                  width: "12px",
                  marginTop: 4,
                  marginRight: 8,
                  background: option.background,
                }}
              />
            ) : null}
            {option.gravatar ? (
              // <img
              //   src={option.avatar}
              //   alt={option.label}
              //   style={{
              //     height: "20px",
              //     width: "20px",
              //     borderRadius: "50%",
              //     marginTop: 0,
              //     marginRight: 8,
              //   }}
              // />
              <Gravatar
                email={option.gravatar}
                size={20}
                style={{
                  borderRadius: "50%",
                  marginTop: 0,
                  marginRight: 8,
                }}
                default="identicon"
              />
            ) : null}
            <Typography variant="omega">{option.label}</Typography>
          </div>
        </Option>
      ))}
    </Select>
  );
}

//   labelAction={<Earth />}
//   required
//   hint="Description line"
//   onClear={() => onChange(undefined)}
//   clearLabel="Clear the meal"
//   error={error}
