"use strict";
const FormData = require("form-data");
const axios = require("axios").default;
const CryptoJS = require("crypto-js");

const api_key = process.env.FREEDCAMP_KEY;
const sec = process.env.FREEDCAMP_SECRET;

const timestamp = new Date().valueOf();
const hash = CryptoJS.HmacSHA1(api_key + timestamp, sec);
const hash_string = hash.toString();
const auth = `api_key=${api_key}&timestamp=${timestamp}&hash=${hash_string}`;

const instance = axios.create({
  baseURL: `https://freedcamp.com/api/v1`,
  timeout: 1000,
  headers: {
    // "X-API-KEY": process.env.FREEDCAMP_KEY,
    "Content-Type": "multipart/form-data",
  },
});

module.exports = {
  getMySession: async () => {
    try {
      const response = await instance.get(`/sessions/current/?${auth}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getMyIssues: async (projectId) => {
    try {
      const response = await instance.get(
        `/issues/?${auth}&project_id=${projectId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  upsertMyIssue: async (data, id) => {
    const formdata = new FormData();
    formdata.append("data", data);
    try {
      const response = axios({
        url: id
          ? `https://freedcamp.com/api/v1/issues/${id}/?${auth}`
          : `https://freedcamp.com/api/v1/issues/?${auth}`,
        method: "POST",
        data: formdata,
        headers: {
          // "X-API-KEY": process.env.FREEDCAMP_KEY,
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  deleteMyIssue: async (id) => {
    console.log("deleteMyIssue", id);
    try {
      const response = axios({
        url: `https://freedcamp.com/api/v1/issues/${id}/?${auth}`,
        method: "DELETE",
        headers: {
          // "X-API-KEY": process.env.FREEDCAMP_KEY,
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  attachMyFile: async (data) => {
    try {
      const response = axios({
        url: `https://freedcamp.com/api/v1/files/?${auth}`,
        method: "POST",
        data: data,
        headers: {
          // "X-API-KEY": process.env.FREEDCAMP_KEY,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.dir(error, { depth: null });
      return error;
    }
  },
  getMyComments: async (issueId) => {
    try {
      const response = await instance.get(`/issues/${issueId}/?${auth}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  upsertMyComment: async (data, id) => {
    const formdata = new FormData();
    formdata.append("data", data);
    try {
      const response = axios({
        url: id
          ? `https://freedcamp.com/api/v1/comments/${id}/?${auth}`
          : `https://freedcamp.com/api/v1/comments/?${auth}`,
        method: "POST",
        data: formdata,
        headers: {
          // "X-API-KEY": process.env.FREEDCAMP_KEY,
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
