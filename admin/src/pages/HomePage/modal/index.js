import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import {
  Button,
  Typography,
  DatePicker,
  Box,
  TextInput,
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Divider,
  // Loader,
} from "@strapi/design-system";

import Editor from "../editor";
import SelectLine from "./select_line";
import Comments from "../comments";
import Medialib from "./medialib";
import Thumbnails from "./thumbnails";

import myRequests from "../../../api";
import {
  getTs,
  getDate,
  updateIssuesWithNew,
  updateIssuesWithUpdated,
  // deleteAnIssue,
} from "../functions";

export default function Modal({
  isVisible,
  closeModal,
  issues,
  setIssues,
  setSelectedIssue,
  selectedIssue,
  users,
  project_id,
  user_id,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState(1);
  const [status, setStatus] = useState(0);
  const [type, setType] = useState("Task");
  const [assignedToId, setAssignedToId] = useState(null);
  const [files, setFiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(async () => {
    if (selectedIssue) {
      console.log("selectedIssue is:", selectedIssue);
      const {
        title,
        description,
        due_ts,
        priority,
        status,
        type,
        assigned_to_id,
      } = selectedIssue;
      setTitle(title);
      setDescription(description);
      buildAttachedFilesArray(description);
      setDate(getDate(due_ts));
      setPriority(priority);
      setStatus(status.toString());
      setType(type);
      setAssignedToId(assigned_to_id);
    }
  }, [isVisible]);

  const canEdit = selectedIssue ? selectedIssue.can_edit : true;

  const reinitializeStateBeforeClosing = () => {
    setTitle("Nouveau ticket");
    setDescription(null);
    setDate(null);
    setPriority(1);
    setStatus("0");
    setType("Task");
    setAssignedToId(null);
    setFiles([]);
    closeModal();
  };

  const buildAttachedFilesArray = (receivedDescription) => {
    const parsed = parse(receivedDescription);
    if (parsed) {
      if (parsed.type && parsed.type === "img") {
        const newFile = {
          url: parsed.props.src,
          alt: parsed.props.alt,
        };
        setFiles([newFile]);
      } else if (Array.isArray(parsed)) {
        let newFiles = [];
        parsed.forEach((item) => {
          if (!item.type) return;
          if (item.type === "img") {
            newFiles.push({
              url: item.props.src,
              alt: item.props.alt,
            });
          }
          setFiles(newFiles);
        });
      }
    }
  };
  const handleTitleChange = (value) => {
    setTitle(value);
  };
  const handleEditorChange = (value) => {
    setDescription(value);
    // console.log("value", value);
  };
  const handlePriorityChange = (value) => {
    setPriority(value);
  };
  const handleStatusChange = (value) => {
    setStatus(value);
  };
  const handleTypeChange = (value) => {
    setType(value);
  };
  const handleUserChange = (value) => {
    setAssignedToId(value);
  };
  const openLibrary = () => {
    setIsOpen(true);
  };
  const closeLibrary = () => {
    setIsOpen(false);
  };
  const onFileChange = (newFiles) => {
    let baseString = "";
    newFiles.forEach((newFile) => {
      baseString += `<img src='${newFile.url}' alt='${newFile.alt}'/>`;
    });
    handleEditorChange(`${description}${baseString}`);
    if (files.length === 0) {
      setFiles(newFiles);
    } else {
      setFiles([...files, ...newFiles]);
    }
    closeLibrary();
  };
  if (!isVisible) return null;
  const handlePostIssue = async () => {
    const issueToSend = {
      title,
      description,
      priority,
      status: parseInt(status),
      type,
      due_date: getTs(date),
      assigned_to_id: assignedToId,
      project_id,
    };
    if (selectedIssue) {
      Object.assign(issueToSend, { id: selectedIssue.id });
    }
    try {
      const res = await myRequests.upsertIssue(issueToSend);
      const savedIssue = res.data.issues[0];
      console.log("savedIssue", savedIssue);
      if (selectedIssue) {
        updateIssuesWithUpdated(issues, savedIssue, setIssues);
        reinitializeStateBeforeClosing();
      } else {
        updateIssuesWithNew(issues, savedIssue, setIssues);
        reinitializeStateBeforeClosing();
      }
    } catch (err) {
      console.log(err, "error sending:", issueToSend);
    }
  };
  return (
    <ModalLayout onClose={reinitializeStateBeforeClosing} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h1" id="title">
          {title ? title : "Nouveau ticket"}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <div style={{ display: "flex", width: "100%" }}>
          <SelectLine
            handlePriorityChange={handlePriorityChange}
            handleStatusChange={handleStatusChange}
            handleTypeChange={handleTypeChange}
            priority={priority}
            status={status}
            type={type}
            users={users}
            assignedToId={assignedToId}
            handleUserChange={handleUserChange}
            where="top"
            canEdit={canEdit}
          />
          <DatePicker
            onChange={setDate}
            selectedDate={date}
            label="Échéance"
            name="datepicker"
            size="S"
            clearLabel="Clear the datepicker"
            onClear={() => setDate(undefined)}
            selectedDateLabel={(formattedDate) =>
              `Date picker, current is ${formattedDate}`
            }
            disabled={canEdit === true ? false : true}
          />
        </div>
        <Box paddingBottom={4}>
          {canEdit === true ? (
            <TextInput
              placeholder="Choisissez un titre"
              label="Titre"
              name="title"
              required
              onChange={(e) => handleTitleChange(e.target.value)}
              value={title}
              disabled={canEdit === true ? false : true}
            />
          ) : (
            <div>
              <Typography
                variant="beta"
                fontWeight="bold"
                textColor="neutral800"
                as="h1"
                id="title"
                style={{ marginBottom: 10 }}
              >
                {title ? title : "Nouveau ticket"}
              </Typography>
              <Divider />
            </div>
          )}
        </Box>
        <div style={{ marginBottom: 24 }}>
          {canEdit === true ? (
            <div
              style={{
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              }}
            >
              <Editor
                handleEditorChange={handleEditorChange}
                description={description}
              />
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: description }}
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 10,
                paddingRight: 10,
                color: "#767794",
                lineHeight: 1.5,
                fontSize: 14,
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              }}
            />
          )}
        </div>
        <SelectLine
          handlePriorityChange={handlePriorityChange}
          handleStatusChange={handleStatusChange}
          handleTypeChange={handleTypeChange}
          priority={priority}
          status={status}
          type={type}
          users={users}
          assignedToId={assignedToId}
          handleUserChange={handleUserChange}
          where="bottom"
          canEdit={canEdit}
        />
        {selectedIssue ? (
          <Comments
            setSelectedIssue={setSelectedIssue}
            selectedIssue={selectedIssue}
            users={users}
            setIssues={setIssues}
            issues={issues}
            user_id={user_id}
          />
        ) : null}
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={reinitializeStateBeforeClosing} variant="tertiary">
            Annuler
          </Button>
        }
        endActions={
          <>
            <Thumbnails files={files} />
            <Button
              variant="secondary"
              onClick={openLibrary}
              disabled={canEdit === true ? false : true}
            >
              Ajouter une pièce jointe
            </Button>
            <Button
              onClick={handlePostIssue}
              disabled={canEdit === true ? false : true}
            >
              Enregistrer
            </Button>
          </>
        }
      />
      <Medialib
        isOpen={isOpen}
        closeLibrary={closeLibrary}
        onFileChange={onFileChange}
      />
    </ModalLayout>
  );
}

// const sendFile = async (formdata) => {
//   // console.log("formdata File", formdata.getAll("file"));
//   // console.log("formdata Data", formdata.getAll("data"));
//   try {
//     const fileSent = await myRequests.attachFile(formdata);
//     console.log("fileSent", fileSent);
//   } catch (err) {
//     console.log(err);
//   }
// };
// const onFileChange = (e) => {
//   const file = e.target.files[0];
//   const metadata = {
//     application_id: "13",
//     item_id: selectedIssue.id,
//     project_id,
//     temporary: 0,
//   };
//   const stringified = JSON.stringify(metadata);
//   const formdata = new FormData();
//   formdata.append("file", file);
//   formdata.append("data", stringified);
//   sendFile(formdata);
// };
