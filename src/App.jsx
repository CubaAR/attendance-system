import "./App.css";
import { useState, useMemo, useCallback } from "react";
import {
  getDaysInMonth,
  initialStudents,
  getInitialAttendance,
} from "./constants";
import { AttendanceTable } from "./AttendanceTable";
import { CalendarRange } from "lucide-react";

const App = () => {
  const currentDate = new Date();
  const daysInMonth = getDaysInMonth(currentDate);

  const [appState, setAppState] = useState({
    currentDate,
    daysInMonth,
    students: initialStudents,
    attendance: getInitialAttendance(initialStudents, daysInMonth),
    bulkStatus: "P",
  });

  const daysArray = Array.from(
    { length: appState.daysInMonth },
    (_, i) => i + 1
  );
  const currentMonthName = appState.currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // --------------- Handlers ----------------

  const handleCellChange = useCallback((regNo, day, slot, newStatus) => {
    setAppState((prev) => {
      const newAttendance = { ...prev.attendance }; // copies full attendance map
      newAttendance[regNo] = { ...newAttendance[regNo] }; // copies regNO
      newAttendance[regNo][day] = { ...newAttendance[regNo][day] }; //copies day
      newAttendance[regNo][day][slot] = newStatus; // chnages made and updated to newStatus (all the chnages are updated in newStatus and rest are same)
      return { ...prev, attendance: newAttendance }; // other states are same , no changes made
    });
  }, []);
  // some many copies due to immutabiltly , should not edit the state directlty

  // ---------------  Insights ----------------
  const insights = useMemo(() => {
    const { students, attendance, daysInMonth } = appState;
    const stats = {
      totalP: 0,
      totalA: 0,
      totalO: 0,
      totalH: 0,
      dailyPresentCounts: {},
      studentMonthlyTotals: {},
    };

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    days.forEach((day) => (stats.dailyPresentCounts[day] = 0));

    for (const student of students) {
      const regNo = student.regNo;
      stats.studentMonthlyTotals[regNo] = { P: 0, A: 0, O: 0, H: 0 };

      for (const day of days) {
        const dayRecord = attendance[regNo]?.[day];
        if (dayRecord) {
          const isPresent = dayRecord.M === "P" || dayRecord.A === "P";

          if (isPresent) {
            stats.totalP++;
            stats.dailyPresentCounts[day]++;
          }

          if (dayRecord.M === "A" && dayRecord.A === "A") {
            stats.totalA++;
            stats.studentMonthlyTotals[regNo].A++;
          }

          if (dayRecord.M === "OD" || dayRecord.A === "OD") {
            stats.totalO++;
          }
        }
      }
    }


    return stats;
  }, [appState.attendance, appState.students, appState.daysInMonth]);

  return (
    <div className="app-container">
      <h1 className="app-header">
        <CalendarRange size={32} style={{ marginRight: "0.5rem" }} />
        Attendance Register ({currentMonthName})
      </h1>

      <AttendanceTable
        appState={appState}
        daysArray={daysArray}
        insights={insights}
        handleCellChange={handleCellChange}
      />
    </div>
  );
};

export default App;
