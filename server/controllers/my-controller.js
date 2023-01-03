"use strict";
const api = require("./freedcamp");

module.exports = ({ strapi }) => ({
  async getSession() {
    const response = await api.getMySession();
    return response.data ? response.data : response;
  },
  async getIssues(ctx) {
    const { project_id } = ctx.request.params;
    const response = await api.getMyIssues(project_id);
    return response;
  },
  async upsertIssue(ctx) {
    const { body } = ctx.request;
    const { id, ...rest } = body;
    const data = JSON.stringify({ ...rest });
    const response = await api.upsertMyIssue(data, id);
    return response.data;
  },
  async deleteIssue(ctx) {
    const { id } = ctx.request.params;
    const response = await api.deleteMyIssue(id);
    return response;
  },
  async attachFile(ctx) {
    const { body } = ctx.request;
    const response = await api.attachMyFile(body);
    return response;
  },
  async getComments(ctx) {
    const { issueId } = ctx.request.params;
    const response = await api.getMyComments(issueId);
    return response;
  },
  async upsertComment(ctx) {
    const { body } = ctx.request;
    const { id, ...rest } = body;
    const data = JSON.stringify({ ...rest });
    const response = await api.upsertMyComment(data, id);
    return response.data;
  },
  async deleteComment(ctx) {
    return [];
  },
});
