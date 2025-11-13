import { ElementType, FC } from "react";

interface KpiCardProps {
  title: string;
  value: string;
  icon: ElementType;
}

const KpiCard: FC<KpiCardProps> = ({ title, value, icon: Icon }) => {
  return (
    <div className="eco-kpi-card">
      <div className="eco-kpi-card-header">
        <Icon className="eco-kpi-card-icon" />
        <h3 className="eco-kpi-card-title">{title}</h3>
      </div>
      <p className="eco-kpi-card-value">{value}</p>
    </div>
  );
};

export default KpiCard;
