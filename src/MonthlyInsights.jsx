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
          title="Total Present"
          value={insights.totalP}
          color="green"
          icon={<CheckCircle size={20} />}
        />
        <InsightCard
          title="Total Absent"
          value={insights.totalA}
          color="red"
          icon={<XCircle size={20} />}
        />
        <InsightCard
          title="Total OD in this month"
          value={insights.totalO}
          color="blue"
          icon={<Clock size={20} />}
        />
        <InsightCard
          title="Total Holidays"
          value={insights.totalH}
          color="gray"
          icon={<Calendar size={20} />}
        />
      </div>
    </div>
  </>
));
