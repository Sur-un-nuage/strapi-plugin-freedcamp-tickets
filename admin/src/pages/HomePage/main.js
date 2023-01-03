import React, { useState } from "react";

import { ChartCircle, CheckCircle, Clock, Refresh } from "@strapi/icons";

import { BaseHeaderLayout, Box, Button } from "@strapi/design-system";

import CreateButton from "./create_button";
import Modal from "./modal";
import Column from "./column";

function getGetItemsByStatus(items, status) {
  const filteredItems = items.filter((item) => item.status === status);
  return filteredItems;
}

export default function Main({
  issues,
  setIssues,
  fetchIssues,
  users,
  user_id,
  project_id,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const openModal = () => {
    setIsVisible(true);
  };
  const closeModal = () => {
    setSelectedIssue(null);
    setIsVisible(false);
  };
  const handleSelectedIssue = (item) => {
    setSelectedIssue(item);
    setIsVisible(true);
  };
  const inProgress = getGetItemsByStatus(issues, 2);
  const completed = getGetItemsByStatus(issues, 1);
  const opened = getGetItemsByStatus(issues, 0);
  const columnNames = [
    {
      name: "Ouverts",
      items: opened,
      icon: ChartCircle,
    },
    {
      name: "En cours",
      items: inProgress,
      icon: Clock,
    },
    {
      name: "Terminés",
      items: completed,
      icon: CheckCircle,
    },
  ];
  return (
    <div>
      <Box background="neutral100">
        <BaseHeaderLayout
          primaryAction={<CreateButton openModal={openModal} />}
          secondaryAction={
            <Button
              variant="tertiary"
              startIcon={<Refresh />}
              onClick={fetchIssues}
            >
              Rafraîchir
            </Button>
          }
          title="Tickets"
          subtitle={`${
            issues && issues.length ? issues.length : 0
          } tickets trouvés`}
          as="h2"
        />
      </Box>
      <div
        style={{
          marginLeft: 30,
          marginRight: 25,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {columnNames.map((item) => (
          <div key={item.name} style={{ padding: 4 }}>
            <Column
              items={item.items}
              name={item.name}
              icon={item.icon}
              handleSelectedIssue={handleSelectedIssue}
              issues={issues}
              setIssues={setIssues}
              users={users}
              user_id={user_id}
            />
          </div>
        ))}
      </div>
      <Modal
        isVisible={isVisible}
        closeModal={closeModal}
        setIssues={setIssues}
        issues={issues}
        selectedIssue={selectedIssue}
        setSelectedIssue={setSelectedIssue}
        users={users}
        project_id={project_id}
        user_id={user_id}
      />
    </div>
  );
}
