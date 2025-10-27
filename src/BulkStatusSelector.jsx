import React from 'react';
import './App.css';
import { STATUSES } from './constants';

export const BulkStatusSelector = React.memo(({ bulkStatus, onBulkStatusChange }) => (
  <div className="bulk-status-selector">
    <p>Set Status for Bulk Operations:</p>
    <div className="bulk-status-buttons">
      {Object.keys(STATUSES).map((key) => (
        <button
          key={key}
          className={`bulk-status-button status-${key} ${bulkStatus === key ? 'active' : ''}`}
          onClick={() => onBulkStatusChange(key)}
        >
          {key} - {STATUSES[key]}
        </button>
      ))}
    </div>
  </div>
));
