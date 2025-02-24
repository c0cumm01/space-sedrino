import { linkOptions } from "@tanstack/react-router";
import {
  Ticket,
  List,
  Plus,
  Radar,
  Activity,
  History,
} from "lucide-react";

export const navSections = [
  {
    title: "Tickets",
    icon: Ticket,
    items: [
      {
        title: "All Tickets",
        icon: List,
        link: linkOptions({ to: "/tickets" }),
      },
      {
        title: "New Ticket",
        icon: Plus,
        link: linkOptions({ to: "/tickets/new" }),
      },
    ],
  },
  {
    title: "System Observation",
    icon: Radar,
    items: [
      {
        title: "Real-Time",
        icon: Activity,
        link: linkOptions({ to: "/system-observation" }),
      },
      {
        title: "Historical",
        icon: History,
        link: linkOptions({ to: "/system-observation/historical" }),
      },
    ],
  },
];