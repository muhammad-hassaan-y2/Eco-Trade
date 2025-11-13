import { FC, ReactNode } from "react";
import "./styles.css";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="eco-dashboard">
      <header className="eco-header">
        <h1>ECO-TRA</h1>
        <p>Sustainable Supply Chain Management</p>
      </header>
      <main className="eco-main">{children}</main>
    </div>
  );
};

export default DashboardLayout;
