import React from "react";

import IssueItem from "./issueItem";

import { Box, Typography, Icon } from "@strapi/design-system";

export default function Column({
  items,
  name,
  icon,
  handleSelectedIssue,
  issues,
  setIssues,
  users,
  user_id,
}) {
  return (
    <div>
      <Box
        padding={6}
        background="neutral0"
        shadow="filterShadow"
        style={{ display: "flex" }}
      >
        <Icon
          width={`1.2rem`}
          height={`1.2rem`}
          color="primary500"
          as={icon}
          style={{ marginRight: 8 }}
        />
        <Typography variant="delta">{name}</Typography>
      </Box>
      <div style={{ marginTop: 12 }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{ cursor: "pointer", paddingLeft: 2, paddingRight: 2 }}
          >
            <IssueItem
              item={item}
              handleSelectedIssue={handleSelectedIssue}
              issues={issues}
              setIssues={setIssues}
              users={users}
              user_id={user_id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
