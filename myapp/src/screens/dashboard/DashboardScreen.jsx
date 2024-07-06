import { AreaCards, AreaCharts, AreaTable, AreaTop } from "../../components";
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  return (
    <div className="content-area">
      <Helmet><title>Dashboard</title></Helmet>
      <AreaTop />
      <AreaCards />
      <AreaCharts />
      <AreaTable />
    </div>
  );
};

export default Dashboard;
