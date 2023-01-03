import React, { useState, useEffect } from "react";

import myRequests from "../../api";
// import pluginId from "../../pluginId";

import { Loader } from "@strapi/design-system";

import Main from "./main";

function HomepageWithData({ user_id, users, project_id }) {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(async () => {
    fetchIssues();
  }, []);
  const fetchIssues = async () => {
    try {
      const response = await myRequests.getIssues(project_id);
      if (!response.data) {
        setIssues([]);
        setIsLoading(false);
        return;
      } else {
        const { issues } = response.data;
        setIssues(issues);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      console.log("error", error);
    }
  };
  if (isError) return <div>Erreur au chargement des tickets</div>;
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader></Loader>
      </div>
    );
  }
  return (
    <Main
      issues={issues}
      project_id={project_id}
      fetchIssues={fetchIssues}
      setIssues={setIssues}
      users={users}
      user_id={user_id}
    />
  );
}

export default function HomepageWithSession() {
  const [users, setUsers] = useState(null);
  const [user_id, setUser_id] = useState(null);
  const [project_id, setProject_id] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    try {
      const mySession = await myRequests.getSession();
      console.log("mySession data", mySession);
      if (mySession) {
        const { users, user_id, projects } = mySession;
        setUsers(users);
        setUser_id(user_id);
        const project_id = projects[0].project_id;
        setProject_id(project_id);
        setIsLoading(false);
      } else {
        setIsError(true);
        console.log("no mySession found", error);
      }
    } catch (error) {
      setIsError(true);
      console.log("error", error);
    }
  }, []);
  if (isError) return <div>Erreur au chargement de la session</div>;
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader></Loader>
      </div>
    );
  }
  return (
    // <div>Hello</div>
    <HomepageWithData users={users} user_id={user_id} project_id={project_id} />
  );
}
