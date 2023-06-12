import Cluster from "views/Cluster";
import Configure from "views/Configure";
import Dashboard from "views/Dashboard.js";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/BonE",
  },
  {
    path: "/configure",
    name: "Configure",
    icon: "tim-icons icon-bell-55",
    component: <Configure />,
    layout: "/BonE",
  },
  {
    path: "/cluster",
    name: "Cluster",
    icon: "tim-icons icon-puzzle-10",
    component: <Cluster />,
    layout: "/BonE",
  },

];
export default routes;
