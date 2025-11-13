"use client";

import DashboardLayout from "./dashboard-layout";
import KpiCard from "./kpi-card";
import Chart from "./chart";
import { Leaf, Truck, Zap } from "lucide-react";
import "./kpi-card.css";
import "./chart.css";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <KpiCard title="CO₂ Saved" value="1,234 t" icon={Leaf} />
        <KpiCard title="Total Shipments" value="8,921" icon={Truck} />
        <KpiCard title="Energy Consumed" value="5,678 MWh" icon={Zap} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart title="CO₂ Emissions Over Time" />
        <Chart title="Shipment Status Distribution" />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
