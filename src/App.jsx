import "./App.css";
import { useMemo } from "react";
import { useAttendance } from "./Attendancecontext";
import { AttendanceTable } from "./AttendanceTable";
import { CalendarRange } from "lucide-react";
import { BulkStatusSelector } from "./BulkStatusSelector";
import { MonthlyInsights } from "./MonthlyInsights";

const App = () => {
  const { state, dispatch } = useAttendance();

  const daysArray = Array.from({ length: state.daysInMonth }, (_, i) => i + 1);
  const currentMonthName = state.currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const handleCellChange = (regNo, day, slot, newStatus) => {
    dispatch({ type: "UPDATE_CELL", payload: { regNo, day, slot, value: newStatus } });
  };

  const handleBulkStatusChange = (newStatus) => {
    dispatch({ type: "SET_BULK_STATUS", payload: newStatus });
  };

  const applyBulkStatus = (status) => {
    if (!status) return;
    dispatch({ type: "BULK_MONTH_UPDATE", payload: { value: status } });
  };

  const handleDayBulkUpdate = (day, status) => {
    dispatch({ type: "BULK_DAY_UPDATE", payload: { day, value: status } });
  };

  const handleStudentBulkUpdate = (regNo, status) => {
    dispatch({ type: "BULK_STUDENT_UPDATE", payload: { regNo, value: status } });
  };

  const insights = useMemo(() => {
    const { students, attendance, daysInMonth } = state;
    const stats = {
      totalP: 0,
      totalA: 0,
      totalO: 0,
      totalH: 0,
      dailyPresentCounts: {},
      studentMonthlyTotals: {},
    };

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    days.forEach(day => (stats.dailyPresentCounts[day] = 0));

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
            stats.studentMonthlyTotals[regNo].P++;
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

    const holidayDays = new Set();
    for (const day of days) {
      let allHoliday = true;
      for (const student of students) {
        const record = attendance[student.regNo]?.[day];
        if (!(record?.M === "H" && record?.A === "H")) {
          allHoliday = false;
          break;
        }
      }
      if (allHoliday) holidayDays.add(day);
    }
    stats.totalH = holidayDays.size;

    return stats;
  }, [state.attendance, state.students, state.daysInMonth]);

  return (
    <div className="app-container">
      <h1 className="app-header">
        <CalendarRange size={32} style={{ marginRight: "0.5rem" }} />
        Attendance Register ({currentMonthName})
      </h1>

      <BulkStatusSelector
        bulkStatus={state.bulkStatus}
        onBulkStatusChange={handleBulkStatusChange}
        applyBulkStatus={applyBulkStatus}
      />

      <AttendanceTable
        appState={state}
        daysArray={daysArray}
        insights={insights}
        bulkStatus={state.bulkStatus}
        handleDayBulkUpdate={handleDayBulkUpdate}
        handleCellChange={handleCellChange}
        handleStudentBulkUpdate={handleStudentBulkUpdate}
        applyBulkStatus={applyBulkStatus}
      />

      <MonthlyInsights insights={insights} />
    </div>
  );
};

export default App;
