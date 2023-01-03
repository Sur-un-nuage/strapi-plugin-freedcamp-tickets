import React from "react";
import { Box, Typography, Divider } from "@strapi/design-system";
import Gravatar from "react-gravatar";

import { findMyEmail } from "../functions";

export default function ListComments({ comments, users }) {
  return (
    <Box>
      {comments &&
        comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment.id} style={{ marginTop: 20 }}>
            <div style={{ display: "flex", marginTop: 10 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                }}
              >
                <Gravatar
                  email={findMyEmail(comment.user_id, users)}
                  size={24}
                  style={{
                    borderRadius: "50%",
                    marginTop: -5,
                    marginRight: 8,
                  }}
                  default="identicon"
                />
              </div>
              <div style={{ width: "100%" }}>
                <Typography variant="pi" fontWeight="bold">
                  {comment.user_full_name}
                </Typography>
                <Typography variant="pi" style={{ opacity: 0.6 }}>
                  {comment.ts}
                </Typography>
                <Typography variant="pi">
                  <div
                    dangerouslySetInnerHTML={{ __html: comment.description }}
                    style={{ marginTop: 4 }}
                  />
                </Typography>
              </div>
            </div>
            <Divider style={{ marginTop: 12 }} />
          </div>
        ))}
    </Box>
  );
}
