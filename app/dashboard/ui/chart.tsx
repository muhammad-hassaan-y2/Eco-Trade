import { FC } from "react";

interface ChartProps {
  title: string;
}

const Chart: FC<ChartProps> = ({ title }) => {
  return (
    <div className="eco-chart">
      <h3 className="eco-chart-title">{title}</h3>
      <div className="eco-chart-placeholder">
        <p>Chart Placeholder</p>
      </div>
    </div>
  );
};

export default Chart;
