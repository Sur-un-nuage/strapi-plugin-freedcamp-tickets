import React from "react";
import { Box, Typography, Divider } from "@strapi/design-system";

import Comment from "./comment";
import Gravatar from "react-gravatar";

export default function AddComment({
  me,
  addCommentMode,
  issueId,
  closeCommentMode,
  setAddCommentMode,
  manageUpsertComment,
  style,
}) {
  return (
    <div style={{ display: "flex", ...style }}>
      {me ? (
        <div
          style={{
            width: 40,
            height: 40,
            paddingTop: 5,
          }}
        >
          {/* <img
            src={me.avatar_url}
            alt="avatar"
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              marginRight: 12,
            }}
          /> */}
          <Gravatar
            email={me.email}
            size={30}
            style={{
              borderRadius: "50%",
              marginRight: 12,
            }}
            default="identicon"
          />
        </div>
      ) : null}
      <div style={{ width: "100%", marginTop: 4 }}>
        {addCommentMode ? (
          <Comment
            issueId={issueId}
            closeCommentMode={closeCommentMode}
            manageUpsertComment={manageUpsertComment}
          />
        ) : (
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => setAddCommentMode(true)}
          >
            <Typography variant="pi" style={{ opacity: 0.6 }}>
              Ajouter un commentaire...
            </Typography>
            <Divider style={{ marginTop: 8 }} />
          </Box>
        )}
      </div>
    </div>
  );
}
