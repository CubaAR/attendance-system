import { create } from "zustand";
import { getDaysInMonth, initialStudents, getInitialAttendance } from "./constants";

const currentDate = new Date();

export const useAttendanceStore = create((set, get) => ({
  currentDate,
  daysInMonth: getDaysInMonth(currentDate),
  students: initialStudents,
  attendance: getInitialAttendance(initialStudents, getDaysInMonth(currentDate)),
  bulkStatus: "P",

  // Set bulk status
  setBulkStatus: (status) => set({ bulkStatus: status }),

  // Update single cell
  updateCell: (regNo, day, slot, value) => {
    const newAttendance = { ...get().attendance };
    newAttendance[regNo] = { ...newAttendance[regNo] };
    newAttendance[regNo][day] = { ...newAttendance[regNo][day], [slot]: value };
    set({ attendance: newAttendance });
  },

  // Bulk update per day
  bulkDayUpdate: (day, value) => {
    const newAttendance = { ...get().attendance };
    get().students.forEach((student) => {
      newAttendance[student.regNo] = { ...newAttendance[student.regNo] };
      newAttendance[student.regNo][day] = { M: value, A: value };
    });
    set({ attendance: newAttendance });
  },

  // Bulk update per student
  bulkStudentUpdate: (regNo, value) => {
    const newAttendance = { ...get().attendance };
    for (let day = 1; day <= get().daysInMonth; day++) {
      const date = new Date(get().currentDate.getFullYear(), get().currentDate.getMonth(), day);
      if (date.getDay() === 0) continue; 
      newAttendance[regNo][day] = { M: value, A: value };
    }
    set({ attendance: newAttendance });
  },

  // Bulk update entire month
  bulkMonthUpdate: (value) => {
    const newAttendance = { ...get().attendance };
    get().students.forEach((student) => {
      for (let day = 1; day <= get().daysInMonth; day++) {
        const date = new Date(get().currentDate.getFullYear(), get().currentDate.getMonth(), day);
        if (date.getDay() === 0) continue;
        newAttendance[student.regNo][day] = { M: value, A: value };
      }
    });
    set({ attendance: newAttendance });
  },
}));
