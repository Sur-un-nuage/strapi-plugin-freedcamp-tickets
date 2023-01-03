import React, { useState, useEffect } from "react";
import myRequests from "../../../api";
import { Box, Typography, Divider, Loader } from "@strapi/design-system";

import AddComment from "./add_comment";
import ListComments from "./list_comments";

import { updateIssuesWithUpdated } from "../functions";

export default function Comments({
  setSelectedIssue,
  selectedIssue,
  issues,
  setIssues,
  users,
  user_id,
}) {
  const [addCommentMode, setAddCommentMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(async () => {
    console.log("useEffect from comments");
    if (selectedIssue.comments_count === 0) return;
    if (!selectedIssue.comments || !selectedIssue.comments.length) {
      fetchComments();
      return;
    }
    if (selectedIssue.comments_count !== selectedIssue.comments.length) {
      console.log(
        "I will fetch issue again",
        "count is" + selectedIssue.comments_count,
        "length is" + selectedIssue.comments.length
      );
      fetchComments();
    }
  }, []);
  const issueId = selectedIssue.id;
  const me = users.find((user) => user.user_id === user_id);
  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const coms = await myRequests.getComments(issueId);
      const updatedIssue = coms.data.issues[0];
      updateIssuesWithUpdated(issues, updatedIssue, setIssues);
      setSelectedIssue(updatedIssue);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  const closeCommentMode = () => {
    setAddCommentMode(false);
  };
  const manageUpsertComment = async (value) => {
    const newComment = {
      description: value,
      app_id: "13",
      item_id: issueId,
    };
    // console.log("newComment", newComment);
    // console.log("selectedIssue.comments", selectedIssue.comments);
    try {
      const savedComment = await myRequests.upsertComment(newComment);
      const newComments =
        selectedIssue.comments && selectedIssue.comments.length
          ? [...selectedIssue.comments, ...savedComment.data.comments]
          : savedComment.data.comments;
      // console.log("newComments", newComments);
      const updatedIssue = Object.assign(selectedIssue, {
        comments: newComments,
        comments_count: newComments.length,
      });
      updateIssuesWithUpdated(issues, updatedIssue, setIssues);
      // setSelectedIssue(updatedIssue); // not necessary ?
      closeCommentMode();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Box style={{ marginBottom: 24 }}>
      <Typography variant="omega" fontWeight="semiBold">
        Commentaires
      </Typography>
      <Divider style={{ marginTop: 4 }} />
      <Box style={{ marginTop: 12 }}>
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Loader />
          </div>
        ) : (
          <ListComments comments={selectedIssue.comments} users={users} />
        )}
        <AddComment
          me={me}
          issueId={issueId}
          closeCommentMode={closeCommentMode}
          addCommentMode={addCommentMode}
          setAddCommentMode={setAddCommentMode}
          style={{ marginTop: 20 }}
          manageUpsertComment={manageUpsertComment}
        />
      </Box>
    </Box>
  );
}
