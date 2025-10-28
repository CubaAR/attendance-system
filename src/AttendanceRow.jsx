// import React from 'react';
import { Plus } from 'lucide-react';
import './App.css';
import { STATUSES } from './constants';

export const AttendanceRow = React.memo(
  ({ student, daysArray, attendance, studentTotalP, onCellChange, bulkStatus, onStudentBulkUpdate }) => (
    <tr>

      <td
        className="sticky-left"
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '0 0.5rem',
          minWidth: '80px'
        }}
      >
        {student.regNo}
      </td>

      <td className="sticky-left" style={{ textAlign: 'center', minWidth: '120px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ lineHeight: '1.2rem' }}>
            <div>{student.name}</div>
          </div>

          {/* Bulk selection per student */}
          <button
          title={`Bulk set ${student.name} to ${STATUSES[bulkStatus]} for full month`}
            onClick={() => onStudentBulkUpdate(student.regNo, bulkStatus)}
            style={{
              padding: '0.25rem',
              borderRadius: '50%',
              cursor: 'pointer',
              backgroundColor: '#eef2ff'
            }}
          >
            <Plus size={14} />
          </button>
        </div>
      </td>

      {daysArray.map((day) =>
        ['M', 'A'].map((slot) => {
          const date = new Date();
          date.setDate(day);
          const isSunday = date.getDay() === 0;
          const currentStatus = attendance[student.regNo]?.[day]?.[slot] || 'P';

          return (
            <td
              key={`${student.regNo}-${day}-${slot}`}
              className={`status-${currentStatus}`}
              style={{ textAlign: "center" }}
            >
              <select
                value={currentStatus}
                disabled={isSunday}
                onChange={(e) => !isSunday && onCellChange(student.regNo, day, slot, e.target.value)}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  fontWeight: 'bold',
                  backgroundColor: isSunday ? '#f3f4f6' : 'inherit',
                  cursor: isSunday ? 'not-allowed' : 'pointer',
                  opacity: isSunday ? 0.6 : 1
                }}
              >
                {Object.keys(STATUSES).map((key) => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </td>
          );
        })
      )}

      <td style={{ fontWeight: 'bold', backgroundColor: '#e0e7ff', color: '#4338ca', textAlign: 'center' }}>
        {studentTotalP}
      </td>

    </tr>
  )
);
