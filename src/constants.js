import './App.css';

export const STATUSES = {
  P: 'Present',
  A: 'Absent',
  OD: 'On Duty',
  H: 'Holiday',
};

export const initialStudents = [
  { regNo: '001', name: 'Che Guevara' },
  { regNo: '002', name: 'Fidel Castro' },
  { regNo: '003', name: 'Karl Marx' },
  { regNo: '004', name: 'Diana Prince' },
  { regNo: '005', name: 'Ethan Hunt' },
  { regNo: '006', name: 'Aleida March' },
  { regNo: '007', name: 'Celia Guevara' },
  { regNo: '008', name: 'Hilda Gadea' },
  { regNo: '009', name: 'Vladimir Lenin' },
  { regNo: '010', name: 'Joseph Stalin' },
];

export const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const getInitialAttendance = (students, daysInMonth) => {
  const attendance = {};
  for (const student of students) {
    attendance[student.regNo] = {};
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(new Date().getFullYear(), new Date().getMonth(), day);
      
      const isSunday = date.getDay() === 0;

      attendance[student.regNo][day] = {
        M: isSunday ? 'H' : 'P',
        A: isSunday ? 'H' : 'P'
      };

    }
    console.log("comment")
    console.log(attendance[student.regNo])
  }
  return attendance;
};