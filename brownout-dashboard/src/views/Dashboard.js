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

import axios from 'axios';
import ToggleSwitch from "components/ToggleSwitch/ToggleSwitch";

import { master_ip, port } from "../config/config";

function Dashboard(props) {

  const HTTP_API_URL = `http://${master_ip}:${port}`;
  const [clusterGraphLabel, setclusterGraphLabel] = React.useState("power");
  const setCGLabel = (name) => {
    setclusterGraphLabel(name);
  };
  const [asr, setASR] = React.useState(0);
  const [masr, setMASR] = React.useState(0);

  const running = props.running;
  const podCount = props.podCount;
  const nodeCount = props.nodeCount;
  const batteryPercentage = props.batteryPercentage;
  const clusterPowerData = props.clusterPowerData;
  const clusterCPUData = props.clusterCPUData;
  const successRateData = props.successRateData;
  const requestsData = props.requestsData;

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
