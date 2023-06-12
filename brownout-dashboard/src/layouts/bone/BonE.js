import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

import { master_ip, port } from "../../config/config";
import { GetTime } from "variables/util.js";
import {
  batteryChart,
  clusterChart,
  srChart,
  requestsChart,
} from "variables/charts.js";

var ps;

function BonELayout(props) {
  const WS_API_URL = `ws://${master_ip}:${port}`;

  const [running, setRunning] = React.useState(false);
  const setBStatus = (data) => {
    setRunning(prevRunningData => {
      const tempRunningData = data['brownout_active'];
      return tempRunningData;
    });
  };

  const [batteryPercentage, setBatteryPercentage] = React.useState(batteryChart.chart);
  const setBPData = (data) => {
    setBatteryPercentage(prevBatteryData => {
      const tempBatteryData = {
        labels: [...prevBatteryData.labels],
        datasets: [
          Object.assign({}, prevBatteryData.datasets[0], {
            data: [...prevBatteryData.datasets[0].data],
          }),
        ],
      };
    
      tempBatteryData.labels.shift();
      tempBatteryData.labels.push(GetTime(data["timestamp"]));
      tempBatteryData.datasets[0].data.shift();
      tempBatteryData.datasets[0].data.push(data["battery"]);
    
      return tempBatteryData;
    });
  };

  const [nodeCount, setNodeCount] = React.useState(0);
  const setNC = (data) => {
    setNodeCount(data["nodes_active"].length);
  };

  const [podCount, setPodCount] = React.useState(0);
  const setPC = (data) => {
    setPodCount(data["count"]);
  };

  const [clusterCPUData, setClusterCPUData] = React.useState({
    labels: clusterChart.cpuLabels, 
    datasets: [Object.assign({}, 
      clusterChart.cpu, 
      clusterChart.properties, 
      {data: clusterChart.cpuData}
      )],
    });
  const setCCPUData = (data) => {
    setClusterCPUData(prevClusterCPUData => {
      const tempClusterCPUData = {
        labels: [...prevClusterCPUData.labels],
        datasets: [
          Object.assign({}, prevClusterCPUData.datasets[0], {
            data: [...prevClusterCPUData.datasets[0].data],
          }),
        ],
      };
      
      tempClusterCPUData.labels.shift();
      tempClusterCPUData.labels.push(GetTime(data["timestamp"]));
      tempClusterCPUData.datasets[0].data.shift();
      tempClusterCPUData.datasets[0].data.push(data["cpu_total"]);
      
      return tempClusterCPUData;
    });
  };

  const [clusterPowerData, setClusterPowerData] = React.useState({
    labels: clusterChart.powerLabels, 
    datasets: [Object.assign({}, 
      clusterChart.power, 
      clusterChart.properties, 
      {data: clusterChart.powerData}
      )],
    });
  const setCPData = (data) => {
    setClusterPowerData(prevClusterPowerData => {
      const tempClusterPowerData = {
        labels: [...prevClusterPowerData.labels],
        datasets: [
          Object.assign({}, prevClusterPowerData.datasets[0], {
            data: [...prevClusterPowerData.datasets[0].data],
          }),
        ],
      };
    
      tempClusterPowerData.labels.shift();
      tempClusterPowerData.labels.push(GetTime(data["timestamp"]));
      tempClusterPowerData.datasets[0].data.shift();
      tempClusterPowerData.datasets[0].data.push(data["power"]);
    
      return tempClusterPowerData;
    });
  };

  const [successRateData, setSuccessRateData] = React.useState(srChart.chart);
  const setSRData = (data) => {
    setSuccessRateData(prevSRData => {
      const tempSRData = {
        labels: [...prevSRData.labels],
        datasets: [
          Object.assign({}, prevSRData.datasets[0], {
            data: [...prevSRData.datasets[0].data],
          }),
        ],
      };
    
      tempSRData.labels.shift();
      tempSRData.labels.push(GetTime(data["timestamp"]));
      tempSRData.datasets[0].data.shift();
      tempSRData.datasets[0].data.push(data["sla_success"] * 100);
    
      return tempSRData;
    });
  };

  const [requestsData, setRequestsData] = React.useState(requestsChart.chart);
  const setReqData = (data) => {
    setRequestsData(prevReqData => {
      const tempReqData = {
        labels: [...prevReqData.labels],
        datasets: [
          Object.assign({}, prevReqData.datasets[0], {
            data: [...prevReqData.datasets[0].data], 
          }),
          Object.assign({}, prevReqData.datasets[1], {
            data: [...prevReqData.datasets[1].data], 
          }),
          Object.assign({}, prevReqData.datasets[2], {
            data: [...prevReqData.datasets[2].data], 
          }),
        ],
      };
    
      tempReqData.labels.shift();
      tempReqData.labels.push(GetTime(data["timestamp"]));
      tempReqData.datasets[0].data.shift();
      tempReqData.datasets[0].data.push(data["tot_req"]);
      tempReqData.datasets[1].data.shift();
      tempReqData.datasets[1].data.push(data["slow_req"]);
      tempReqData.datasets[2].data.shift();
      tempReqData.datasets[2].data.push(data["err_req"]);
    
      return tempReqData;
    });
  };

  React.useEffect(() => {
    const ws = new WebSocket(`${WS_API_URL}/brownout/status`);
    ws.addEventListener('message', (event) => {
      let brownoutData = JSON.parse(event.data);
      setBStatus(brownoutData);
    });
    return () => ws.close();
  },[]);

  React.useEffect(() => {
    const ws = new WebSocket(`${WS_API_URL}/metrics/battery`);
    ws.addEventListener('message', (event) => {
      let batteryData = JSON.parse(event.data);
      setBPData(batteryData);
    });
    return () => ws.close();
  },[]);

  React.useEffect(() => {
    const ws = new WebSocket(`${WS_API_URL}/metrics/nodes/list`);
    ws.addEventListener('message', (event) => {
      let nodeData = JSON.parse(event.data);
      setNC(nodeData);
    });
    return () => ws.close();
  },[]);

  React.useEffect(() => {
    const ws = new WebSocket(`${WS_API_URL}/metrics/pods`);
    ws.addEventListener('message', (event) => {
      let podData = JSON.parse(event.data);
      setCCPUData(podData);
      setPC(podData);
    });
    return () => ws.close();
  },[]);

  React.useEffect(() => {
    const ws = new WebSocket(`${WS_API_URL}/metrics/power`);
    ws.addEventListener('message', (event) => {
      let powerData = JSON.parse(event.data);
      setCPData(powerData);
    });
    return () => ws.close();
  },[]);
  
  React.useEffect(() => {
    const ws = new WebSocket(`${WS_API_URL}/metrics/sla`);
    ws.addEventListener('message', (event) => {
      try {
        let srData = JSON.parse(event.data);
        setSRData(srData);
        setReqData(srData);
      } catch (error) {
        console.log("Error parsing JSON:", error);
      }
    });
    return () => ws.close();
  },[]);

  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes, values) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/BonE") {
        return (
          <Route 
            path={prop.path} 
            element={
              <prop.component 
                batteryPercentage={values[0]} 
                nodeCount={values[1]} 
                running={values[2]} 
                podCount={values[3]} 
                clusterCPUData={values[4]}
                successRateData={values[5]}
                requestsData={values[6]}
                clusterPowerData={values[7]}
              />
            }
            key={key} 
            exact
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <Sidebar
              routes={routes}
              logo={{
                outterLink: "",
                text: "BonE",
                imgSrc: logo,
              }}
              toggleSidebar={toggleSidebar}
            />
            <div className="main-panel" ref={mainPanelRef} data={color}>
              <AdminNavbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />
              <Routes>
                {getRoutes(routes, [
                  batteryPercentage, 
                  nodeCount, 
                  running, 
                  podCount, 
                  clusterCPUData,
                  successRateData,
                  requestsData,
                  clusterPowerData
                ])}
                <Route
                  path="/"
                  element={<Navigate to="/BonE/dashboard" replace />}
                />
              </Routes>
              {
                // we don't want the Footer to be rendered on map page
                location.pathname === "/admin/maps" ? null : <Footer fluid />
              }
            </div>
          </div>
          <FixedPlugin bgColor={color} handleBgClick={changeColor} />
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default BonELayout;
