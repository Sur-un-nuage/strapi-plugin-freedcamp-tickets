import { format } from "date-fns";

export function deleteAnIssue(issues, id, setIssues) {
  const newIssues = issues.filter((issue) => issue.id !== id);
  setIssues(newIssues);
  return;
}

export function updateIssuesWithUpdated(issues, newIssue, setIssues) {
  const newIssues = issues.map((issue) => {
    if (issue.id === newIssue.id) {
      return newIssue;
    }
    return issue;
  });
  setIssues(newIssues);
  return;
}

export function updateIssuesWithNew(issues, newIssue, setIssues) {
  const newIssues = [...issues, newIssue];
  setIssues(newIssues);
  return;
}

export function findMyEmail(id, users) {
  const found = users.find((user) => user.user_id === id);
  if (!found) return null;
  return found.email;
}

export function buildUserOptions(users) {
  const options = users.map((user) => {
    return {
      value: user.user_id,
      label: user.full_name,
      avatar: user.avatar_url,
      gravatar: user.email,
    };
  });
  return options;
}

export function getTs(date) {
  // Turn date picker date into a timestamp for the API
  if (!date) return undefined;
  const myDate = new Date(date);
  const year = myDate.getFullYear();
  const month = myDate.getMonth() + 1;
  const day = myDate.getDate();
  const formatted = `${year}-${month}-${day}`; // "2021-12-15"
  return formatted;
}

export function getDate(ts) {
  // Turn Freedcamp timestamp into a date for the date picker
  if (!ts) return undefined;
  const newDate = new Date(ts * 1000);
  return newDate;
}

export function getLegibleDate(ts) {
  // Turn Freedcamp timestamp into a legible date
  if (!ts) return undefined;
  const newDate = new Date(ts * 1000);
  const legible = format(newDate, "dd MMM yy");
  return legible;
}

export function getBorderColor(priority) {
  switch (priority) {
    case 1:
      return "success200";
    case 2:
      return "primary200";
    case 3:
      return "danger200";
    default:
      return "neutral200";
  }
}

export function getLabelForType(type) {
  switch (type) {
    case "Bug":
      return "Bug";
    case "Cosmetics":
      return "Cosmétique";
    case "Exception":
      return "Exception";
    case "Feature":
      return "Fonctionnalité";
    case "Task":
      return "Tâche";
    case "Usability":
      return "Utilisabilité";
    case "Performance":
      return "Performance";
    case "Auto-Reported":
      return "Auto-Rapporté";
    default:
      return "Autre";
  }
}

// UPDATE AN ISSUE (ALT)
// const index = issues.findIndex(
//   (issue) => issue.id === selectedIssue.id
// );
// const newIssues = [...issues];
// newIssues[index] = savedIssue;
// setIssues(newIssues);
