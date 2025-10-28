import './App.css';

// Resuable component for monthly insights

export const InsightCard = ({ color,value, icon, title }) => (
  <>
    <div className={`insight-card insight-${color}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          {value}
        </div>
          {icon}
      </div>
         <p>{title}</p>
    </div>
  </>
);