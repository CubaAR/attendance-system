import "./App.css";
import { useMemo } from "react";
import { AttendanceTable } from "./AttendanceTable";
import { BulkStatusSelector } from "./BulkStatusSelector";
import { MonthlyInsights } from "./MonthlyInsights";
import { CalendarRange } from "lucide-react";
import { useAttendanceStore } from "./AttendanceStore";

const App = () => {
  const {
    currentDate,
    daysInMonth,
    students,
    attendance,
    bulkStatus,
    setBulkStatus,
    updateCell,
    bulkDayUpdate,
    bulkStudentUpdate,
    bulkMonthUpdate,
  } = useAttendanceStore();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const currentMonthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const applyBulkStatus = (status) => {
    if (!status) return;
    bulkMonthUpdate(status);
  };

  // --------------- Insights ---------------
  const insights = useMemo(() => {
    const stats = {
      totalP: 0,
      totalA: 0,
      totalO: 0,
      totalH: 0,
      dailyPresentCounts: {},
      studentMonthlyTotals: {},
    };

    daysArray.forEach((day) => (stats.dailyPresentCounts[day] = 0));

    for (const student of students) {
      stats.studentMonthlyTotals[student.regNo] = { P: 0, A: 0, O: 0, H: 0 };
      
      for (const day of daysArray) {
        const dayRecord = attendance[student.regNo]?.[day];
        if (!dayRecord) continue;

        const isPresent = dayRecord.M === "P" || dayRecord.A === "P";
        if (isPresent) {
          stats.totalP++;
          stats.dailyPresentCounts[day]++;
          stats.studentMonthlyTotals[student.regNo].P++;
        }

        if (dayRecord.M === "A" && dayRecord.A === "A") {
          stats.totalA++;
          stats.studentMonthlyTotals[student.regNo].A++;
        }

        if (dayRecord.M === "OD" || dayRecord.A === "OD") {
          stats.totalO++;
        }
      }
    }

    // Holds unique items 
    const holidayDays = new Set();
    for (const day of daysArray) {
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
    // size = number of unique items 

    return stats;
  }, [attendance, students, daysArray]);

  return (
    <div className="app-container">
      <h1 className="app-header">
        <CalendarRange size={32} style={{ marginRight: "0.5rem" }} />
        Attendance Register ({currentMonthName})
      </h1>

      <BulkStatusSelector
        bulkStatus={bulkStatus} // imported from store
        onBulkStatusChange={setBulkStatus}
        applyBulkStatus={applyBulkStatus}
      />

      <AttendanceTable
        appState={{ currentDate, daysInMonth, students, attendance, bulkStatus }}
        daysArray={daysArray}
        insights={insights}
        handleCellChange={updateCell} // imported from store
        handleDayBulkUpdate={bulkDayUpdate}
        handleStudentBulkUpdate={bulkStudentUpdate}
        applyBulkStatus={applyBulkStatus}
        bulkStatus={bulkStatus}
      />

      <MonthlyInsights insights={insights} />
    </div>
  );
};

export default App;
