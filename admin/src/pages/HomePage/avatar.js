import React from "react";

export default function Avatar({ users, user_id }) {
  const found = users.find((user) => user.user_id === user_id);
  return (
    <img
      src={`https://ui-avatars.com/api/?name=${found.first_name}+${found.last_name}&color=ff0000&background=random&bold=true`}
      //   src={`https://evatar.io/${found.email}`}
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        marginRight: 6,
        marginTop: -3,
      }}
    />
  );
}
