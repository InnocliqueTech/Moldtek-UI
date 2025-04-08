import React from 'react';

interface DailyPlanProps {
  title?: string;
}

const DailyPlan: React.FC<DailyPlanProps> = ({ title = 'Daily Plan' }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default DailyPlan;