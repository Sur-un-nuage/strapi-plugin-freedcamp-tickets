import ChartCircle from "@strapi/icons/ChartCircle";
import CheckCircle from "@strapi/icons/CheckCircle";
import Clock from "@strapi/icons/Clock";

export const priorityOptions = [
  {
    label: "Basse",
    value: 1,
    background: "#C5F0C2",
  },
  {
    label: "Moyenne",
    value: 2,
    background: "#D9D8FF",
  },
  {
    label: "Haute",
    value: 3,
    background: "#F5C0B8",
  },
];

export const statusOptions = [
  {
    label: "Ouvert",
    value: "0",
    icon: ChartCircle,
  },
  {
    label: "En cours",
    value: "2",
    icon: Clock,
  },
  {
    label: "Terminé",
    value: "1",
    icon: CheckCircle,
  },
];

export const typeOptions = [
  {
    label: "Bug",
    value: "Bug",
  },
  {
    label: "Fonctionnalité",
    value: "Feature",
  },
  {
    label: "Tâche",
    value: "Task",
  },
  {
    label: "Cosmétique",
    value: "Cosmetics",
  },
  {
    label: "Exception",
    value: "Exception",
  },
  {
    label: "Utilisabilité",
    value: "Usability",
  },
  {
    label: "Performance",
    value: "Performance",
  },
  {
    label: "Auto-Rapporté",
    value: "Auto-Reported",
  },
];
