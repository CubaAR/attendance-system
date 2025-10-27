import { Plus } from 'lucide-react';
import './App.css';
import { AttendanceRow } from './AttendanceRow';

export const AttendanceTable = ({
  appState,
  daysArray,
  insights,
  handleCellChange,
  bulkStatus,
  handleDayBulkUpdate,
  handleStudentBulkUpdate
}) => (
  <div className="attendance-table-container">
    <table className="attendance-table">
      <thead>
        <tr>
          <th className="sticky-left header-indigo" rowSpan="2">Reg No</th>
          <th className="sticky-left header-indigo" rowSpan="2">Students Name</th>

          {daysArray.map((day) => {
            const date = new Date(
              appState.currentDate.getFullYear(),
              appState.currentDate.getMonth(),
              day
            );
            const isSunday = date.getDay() === 0;

            return (
              // Day and date
              <th
                key={day}
                colSpan="2"
                style={{
                  backgroundColor: isSunday ? "#fee2e2" : "#e0e7ff",
                  color: isSunday ? "#b91c1c" : "#111827"
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', alignItems: 'center' }}>
                  <span>{day.toString().padStart(2, '0')}</span>
                  <small style={{ fontSize: '0.7rem' }}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </small>
                  {/* Disable editings in sundays */}
                  {!isSunday && (
                    <button
                      title={`Bulk update - ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}`}
                      onClick={() => handleDayBulkUpdate(day, bulkStatus)}
                      style={{
                        padding: '0.25rem',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        color: 'white',
                        backgroundColor: '#4f46e5'
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </div>
              </th>
            );
          })}
          {/* Total present for entire month per students */}
          <th className="header-indigo" rowSpan="2">Total P</th>
        </tr>
        {/* Morning and afteroon slots */}
        <tr>
          {daysArray.map((day) =>
            ['M', 'A'].map((slot) => (
              <th key={`${day}-${slot}`} className="sub-header-indigo">
                {slot}
              </th>
            ))
          )}
        </tr>
      </thead>
      {/* Attendance handling */}
      <tbody>
        {appState.students.map((student) => (
          <AttendanceRow
            key={student.regNo}
            student={student}
            daysArray={daysArray}
            attendance={appState.attendance}
            onCellChange={handleCellChange}
            studentTotalP={insights.studentMonthlyTotals[student.regNo]?.P || 0}
            bulkStatus={bulkStatus}
            onStudentBulkUpdate={handleStudentBulkUpdate}
            
          />
        ))}
        </tbody>
        {/* Total present per day */}
        <tfoot>
            <tr>
                <th className="sticky-left" colSpan="2">Total Present (P)</th>
                {daysArray.map((day) => (
                <th key={`footer-${day}`} colSpan="2" style={{ textAlign: 'center', backgroundColor: '#e0e7ff', fontWeight: 'bold', color: '#4338ca' }}>
                    {insights.dailyPresentCounts[day] || 0}
                </th>
                ))}
                <th></th>
            </tr>
        </tfoot>
    </table>
  </div>
);
