import './App.css';

export const InsightCard = ({ title, value, color, icon }) => (
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