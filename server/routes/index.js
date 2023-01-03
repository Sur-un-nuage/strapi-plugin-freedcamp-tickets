module.exports = [
  {
    method: "GET",
    path: "/get-session",
    handler: "myController.getSession",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/get-issues/:project_id",
    handler: "myController.getIssues",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/create-issue",
    handler: "myController.upsertIssue",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "DELETE",
    path: "/delete-issue/:id",
    handler: "myController.deleteIssue",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/attach-file",
    handler: "myController.attachFile",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/get-comments/:issueId",
    handler: "myController.getComments",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/create-comment",
    handler: "myController.upsertComment",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "DELETE",
    path: "/delete-comment/:id",
    handler: "myController.deleteComment",
    config: {
      policies: [],
      auth: false,
    },
  },
];
