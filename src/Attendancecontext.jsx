import React, { createContext, useContext, useReducer } from "react";
import { getDaysInMonth, getInitialAttendance, initialStudents } from "./constants";

const AttendanceContext = createContext();

const currentDate = new Date();

export const initialState = {
  currentDate,
  daysInMonth: getDaysInMonth(currentDate),
  students: initialStudents,
  attendance: getInitialAttendance(initialStudents, getDaysInMonth(currentDate)),
  bulkStatus: "P",
};

export const attendanceReducer = (state, action) => {
  switch (action.type) {
    case "SET_BULK_STATUS":
      return { ...state, bulkStatus: action.payload };

    case "UPDATE_CELL": {
      const { regNo, day, slot, value } = action.payload;
      const updatedAttendance = { ...state.attendance };
      updatedAttendance[regNo] = { ...updatedAttendance[regNo] };
      updatedAttendance[regNo][day] = { ...updatedAttendance[regNo][day], [slot]: value };
      return { ...state, attendance: updatedAttendance };
    }

    case "BULK_DAY_UPDATE": {
      const { day, value } = action.payload;
      const updatedAttendance = { ...state.attendance };
      state.students.forEach(student => {
        updatedAttendance[student.regNo] = { ...updatedAttendance[student.regNo] };
        updatedAttendance[student.regNo][day] = { M: value, A: value };
      });
      return { ...state, attendance: updatedAttendance };
    }

    case "BULK_STUDENT_UPDATE": {
      const { regNo, value } = action.payload;
      const updatedAttendance = { ...state.attendance };
      for (let day in updatedAttendance[regNo]) {
        updatedAttendance[regNo][day] = { M: value, A: value };
      }
      return { ...state, attendance: updatedAttendance };
    }

    case "BULK_MONTH_UPDATE": {
      const { value } = action.payload;
      const updatedAttendance = { ...state.attendance };
      state.students.forEach(student => {
        for (let day in updatedAttendance[student.regNo]) {
          const date = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), day);
          if (date.getDay() === 0) continue;
          updatedAttendance[student.regNo][day] = { M: value, A: value };
        }
      });
      return { ...state, attendance: updatedAttendance };
    }

    default:
      return state;
  }
};

export const AttendanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(attendanceReducer, initialState);
  return (
    <AttendanceContext.Provider value={{ state, dispatch }}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);
