import React from "react";

import { Box, Typography, Icon } from "@strapi/design-system";
// import ExternalLink from "@strapi/icons/ExternalLink";
import Discuss from "@strapi/icons/Discuss";
import Gravatar from "react-gravatar";
// import Avatar from "./avatar";
import Contextual from "./contextual";

import {
  getLabelForType,
  getBorderColor,
  getLegibleDate,
  findMyEmail,
} from "./functions";

// import myRequests from "../../api";

export default function IssueItem({
  item,
  handleSelectedIssue,
  users,
  // issues,
  // setIssues,
  // user_id,
}) {
  const {
    title,
    type,
    due_ts,
    priority,
    comments_count,
    // url,
    assigned_to_id,
    created_by_id,
    created_by_fullname,
  } = item;
  const deleteIssue = async (item) => {
    alert(
      "Désolé, il n'est pas encore possible de supprimer un ticket depuis Strapi"
    );
    // const { id } = item;
    // try {
    //   await myRequests.deleteIssue(id);
    //   const newIssues = issues.filter((issue) => issue.id !== id);
    //   setIssues(newIssues);
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <Box
      style={{ marginTop: 8 }}
      background={getBorderColor(priority)}
      shadow="filterShadow"
      hasRadius
      borderColor={getBorderColor(priority)}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Contextual item={item} deleteIssue={deleteIssue} />
      </div>
      <div onClick={() => handleSelectedIssue(item)}>
        <div style={{ backgroundColor: "white", padding: 12 }}>
          <div style={{ display: "flex", marginBottom: 8 }}>
            <Gravatar
              email={findMyEmail(created_by_id, users)}
              size={20}
              style={{
                borderRadius: "50%",
                marginRight: 6,
                marginTop: -3,
              }}
              default="identicon"
            />
            {/* <Avatar user_id={created_by_id} users={users} /> */}
            <Typography variant="pi" style={{ opacity: 0.7 }}>
              {created_by_fullname}
            </Typography>
          </div>
          <Typography variant="epsilon">{title}</Typography>
        </div>
        <Box background="neutral100" style={{ padding: 4, paddingLeft: 12 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 2,
            }}
          >
            <Box>
              <Typography variant="pi" style={{ color: "grey", opacity: 0.7 }}>
                {getLabelForType(type)}
              </Typography>
              {due_ts && (
                <Typography
                  variant="pi"
                  style={{ color: "grey", opacity: 0.7 }}
                >
                  {" "}
                  | échue le {getLegibleDate(due_ts)}
                </Typography>
              )}
            </Box>
            <div style={{ display: "flex" }}>
              {comments_count > 0 && (
                <div style={{ display: "flex" }}>
                  <Typography
                    variant="pi"
                    style={{ color: "grey", opacity: 0.7 }}
                  >
                    {comments_count}
                  </Typography>
                  <Icon
                    width={`0.9rem`}
                    height={`0.9rem`}
                    color="primary500"
                    as={Discuss}
                    style={{
                      marginLeft: 4,
                      marginTop: 1,
                      marginRight: 7,
                      opacity: 0.8,
                    }}
                  />
                </div>
              )}
              <div style={{ display: "flex" }}>
                {assigned_to_id && assigned_to_id !== "0" ? (
                  <div style={{ display: "flex" }}>
                    <Typography
                      variant="pi"
                      style={{ color: "grey", opacity: 0.7 }}
                    >
                      Att. à{" "}
                    </Typography>
                    <Gravatar
                      email={findMyEmail(assigned_to_id, users)}
                      size={16}
                      style={{
                        borderRadius: "50%",
                        marginLeft: 8,
                        marginRight: 8,
                      }}
                      default="identicon"
                    />
                  </div>
                ) : null}
                {/* <a href={url} target="_blank">
                  <Icon
                    width={`0.6rem`}
                    height={`0.6rem`}
                    color="primary500"
                    as={ExternalLink}
                    style={{ margin: 4, opacity: 0.8 }}
                  />
                </a> */}
              </div>
            </div>
          </div>
        </Box>
      </div>
    </Box>
  );
}
