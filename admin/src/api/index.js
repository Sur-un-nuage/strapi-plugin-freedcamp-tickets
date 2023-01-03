import { request } from "@strapi/helper-plugin";

const myRequests = {
  getSession: async () => {
    return await request(`/freedcamp-tickets/get-session`, {
      method: "GET",
    });
  },
  getIssues: async (project_id) => {
    return await request(`/freedcamp-tickets/get-issues/${project_id}`, {
      method: "GET",
    });
  },
  upsertIssue: async (data) => {
    return await request(`/freedcamp-tickets/create-issue`, {
      method: "POST",
      body: data,
    });
  },
  deleteIssue: async (id) => {
    return await request(`/freedcamp-tickets/delete-issue/${id}`, {
      method: "DELETE",
    });
  },
  attachFile: async (data) => {
    return await request(`/freedcamp-tickets/attach-file`, {
      method: "POST",
      body: data,
    });
  },
  getComments: async (issueId) => {
    return await request(`/freedcamp-tickets/get-comments/${issueId}`, {
      method: "GET",
    });
  },
  upsertComment: async (data) => {
    return await request(`/freedcamp-tickets/create-comment`, {
      method: "POST",
      body: data,
    });
  },
  deleteComment: async (id) => {
    return await request(`/freedcamp-tickets/delete-comment/${id}`, {
      method: "DELETE",
    });
  },
};

export default myRequests;
