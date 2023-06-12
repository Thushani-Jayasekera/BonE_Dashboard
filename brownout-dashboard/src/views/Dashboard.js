import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  batteryChart,
  clusterChart,
  srChart,
  requestsChart,
} from "variables/charts.js";

import { GetTime } from "variables/util.js";
import axios from 'axios';
import ToggleSwitch from "components/ToggleSwitch/ToggleSwitch";

import { master_ip, port } from "../config/config";
import { ToastContainer } from "react-toastify";

function Dashboard() {

  const WS_API_URL = `ws://${master_ip}:${port}`;
  const HTTP_API_URL = `http://${master_ip}:${port}`;
  const [clusterGraphLabel, setclusterGraphLabel] = React.useState("power");
  const setCGLabel = (name) => {
    setclusterGraphLabel(name);
  };

  const [podCount, setPodCount] = React.useState(0);
  const setPC = (data) => {
    setPodCount(data["count"]);
  };

  const [asr, setASR] = React.useState(0);
  const [masr, setMASR] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const setBStatus = (data) => {
    setRunning(prevRunningData => {
      const tempRunningData = data['brownout_active'];
      return tempRunningData;
    });
  };

  const [nodeCount, setNodeCount] = React.useState(0);
  const setNC = (data) => {
    setNodeCount(data["nodes_active"].length);
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
    const ws = new WebSocket(`${WS_API_URL}/metrics/battery`);
    ws.addEventListener('message', (event) => {
      let batteryData = JSON.parse(event.data);
      setBPData(batteryData);
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
    const ws = new WebSocket(`${WS_API_URL}/metrics/pods`);
    ws.addEventListener('message', (event) => {
      let podData = JSON.parse(event.data);
      setCCPUData(podData);
      setPC(podData);
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

  React.useEffect(() => {
    const ws = new WebSocket(`${WS_API_URL}/metrics/nodes/list`);
    ws.addEventListener('message', (event) => {
      let nodeData = JSON.parse(event.data);
      setNC(nodeData);
    });
    return () => ws.close();
  },[]);

  // get ASR & AMSR value
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const asrResponse = await axios.get(`${HTTP_API_URL }/brownout/variables/asr`);
        const asr = asrResponse.data;
        setASR(asr);
      } catch (error) {
        console.error('error',error);
      }
    }
    fetchData();
    return

  },[]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const amsrResponse = await axios.get(`${HTTP_API_URL }/brownout/variables/amsr`);
        const amsr = amsrResponse.data;
        setMASR(amsr);
      } catch (error) {
        console.error('error',error);
      }
    }
    fetchData();
    return
  },[]);

  React.useEffect(() => {
    const ws = new WebSocket(`${WS_API_URL}/brownout/status`);
    ws.addEventListener('message', (event) => {
      let brownoutData = JSON.parse(event.data);
      setBStatus(brownoutData);
    });
    return () => ws.close();
  },[]);

  const [color, setcolor] = React.useState("navbar-transparent");

  return (
    <>
      <div className="content">
       
        <Row>
        <Card style={{width: '17rem', alignContent: 'center', alignItems: 'center', margin: '1rem'}}>
            <CardBody>
                <CardTitle>Brownout Controller</CardTitle>
                <ToggleSwitch />
            </CardBody>
        </Card>
        <Card style={{width: '17rem', alignContent: 'center', alignItems: 'center', margin: '1rem'}}>
            <CardBody>
                <CardTitle>Brownout Status</CardTitle>
                <Button color="success" style={{alignContent:'center', alignItems:'center'}}>{ running ? "Running" : "Stopped"}</Button>
            </CardBody>
        </Card>
        <Card style={{width: '17rem', alignContent: 'center', alignItems: 'center', margin: '1rem'}}>
            <CardBody>
                <CardTitle>Battery Percentage</CardTitle>
                <Button color="danger" style={{alignContent:'center', alignItems:'center'}}>{batteryPercentage.datasets[0].data[batteryPercentage.datasets[0].data.length - 1]} %</Button>
            </CardBody>
        </Card>
        <Card style={{width: '17rem', alignContent: 'center', alignItems: 'center', margin: '1rem'}}>
            <CardBody>
                <CardTitle>Current Power Consumption</CardTitle>
                <Button color="info" style={{alignContent:'center', alignItems:'center'}}>{clusterPowerData.datasets[0].data[clusterPowerData.datasets[0].data.length - 1].toFixed(2)} W</Button>
            </CardBody>
        </Card>
        <Card style={{width: '17rem', alignContent: 'center', alignItems: 'center', margin: '1rem'}}>
            <CardBody>
                <CardTitle>Current Continer CPU Util. Sum</CardTitle>
                <Button color="info" style={{alignContent:'center', alignItems:'center'}}>{clusterCPUData.datasets[0].data[clusterCPUData.datasets[0].data.length - 1].toFixed(2)} nc</Button>
            </CardBody>
        </Card>
        <Card style={{width: '17rem', alignContent: 'center', alignItems: 'center', margin: '1rem'}}>
            <CardBody>
                <CardTitle>Current Success Rate</CardTitle>
                <Button color="info" style={{alignContent:'center', alignItems:'center'}}>{successRateData.datasets[0].data[successRateData.datasets[0].data.length - 1].toFixed(2)} %</Button>
            </CardBody>
        </Card>
        <Card style={{width: '17rem', alignContent: 'center', alignItems: 'center', margin: '1rem'}}>
            <CardBody>
                <CardTitle>Active Pod Count</CardTitle>
                <Button color="info" style={{alignContent:'center', alignItems:'center'}}>{podCount}</Button>
            </CardBody>
        </Card>
        <Card style={{width: '17rem', alignContent: 'center', alignItems: 'center', margin: '1rem'}}>
            <CardBody>
                <CardTitle>Active Node Count</CardTitle>
                <Button color="info" style={{alignContent:'center', alignItems:'center'}}>{nodeCount}</Button>
            </CardBody>
        </Card>
        </Row>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Metrics</h5>
                    <CardTitle tag="h2">Edge Cluster</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: clusterGraphLabel === "power",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setCGLabel("power")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Power Consumption
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: clusterGraphLabel === "cpu",
                        })}
                        onClick={() => setCGLabel("cpu")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Cluster CPU Utilization
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={clusterGraphLabel === "power" ? clusterPowerData: clusterCPUData}
                    options={clusterChart.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col lg="12">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Success Rate</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> ASR  - {asr}
                  <br/>
                  <i className="tim-icons icon-send text-success" /> MASR - {masr}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={successRateData}
                    options={srChart.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="12">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Number of Requests</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  Total, Slow and Error Requests
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={requestsData}
                    options={requestsChart.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="12">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Battery</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  Battery Percentage
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={batteryPercentage}
                    options={batteryChart.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
