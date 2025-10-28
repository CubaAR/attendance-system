import React from "react";
import { InsightCard } from "./InsightCard";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

export const MonthlyInsights = React.memo(({ insights }) => (
  
  <>
    <div className="monthly-insights">
      <h2>
        <Calendar size={20} />
        Monthly Insights
      </h2>

      <div className="attendance-grid">
        <InsightCard
          title="Present count"
          value={insights.totalP}
          color="green"
          icon={<CheckCircle size={20} />}
        />
        <InsightCard
          title="Absent count"
          value={insights.totalA}
          color="red"
          icon={<XCircle size={20} />}
        />
        <InsightCard
          title="OD count"
          value={insights.totalO}
          color="blue"
          icon={<Clock size={20} />}
        />
        <InsightCard
          title="Holidays"
          value={insights.totalH}
          color="gray"
          icon={<Calendar size={20} />}
        />
      </div>
    </div>
  </>
));
