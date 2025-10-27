import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AttendanceProvider } from "./Attendancecontext";

createRoot(document.getElementById("root")).render(
  <AttendanceProvider>
    <App />
  </AttendanceProvider>
);
