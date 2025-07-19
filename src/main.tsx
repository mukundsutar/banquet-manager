import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { ThemeProvider } from "@mui/material";
import { theme } from "../lib/functions/theme-generator.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>

    <ToastContainer
      icon={({ type }) => {
        switch (type) {
          case "info":
            return <InfoOutlineIcon className="text-[#2f94c1]" />;
          case "error":
            return <ErrorOutlineIcon className="text-[#cb3a30]" />;
          case "success":
            return <TaskAltIcon className="text-[#5daa62]" />;
          case "warning":
            return <WarningAmberIcon className="text-[#d68d23]" />;
          default:
            return null;
        }
      }}
    />
  </StrictMode>,
);
