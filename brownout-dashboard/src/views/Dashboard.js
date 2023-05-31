/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  CardImg,
  CardText,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
  clusterChart,
} from "variables/charts.js";

import { GetTime } from "variables/util.js"

function Dashboard(props) {
  const [clusterGraphLabel, setclusterGraphLabel] = React.useState("power");
  const setCGLabel = (name) => {
    setclusterGraphLabel(name);
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

  React.useEffect(() => {
    const ws = new WebSocket('ws://34.93.128.221:8000/metrics/power');
    ws.addEventListener('message', (event) => {
      let powerData = JSON.parse(event.data);
      setCPData(powerData);
    });
    return () => ws.close();
  },[]);

  const [clusterCPUData, setClusterCPUData] = React.useState({
    labels: clusterChart.cpuLabels, 
    datasets: [Object.assign({}, 
      clusterChart.cpu, 
      clusterChart.properties, 
      {data: clusterChart.cpuData}
      )],
    });

  return (
    <>
      <div className="content">
        <Row>
        <Card style={{width: '17rem', alignContent: 'center', alignItems: 'center', margin: '1rem'}}>
            <CardBody>
                <CardTitle>Brownout Controller</CardTitle>
                <Button color="success" style={{alignContent:'center', alignItems:'center'}}>Running</Button>
            </CardBody>
        </Card>
        <Card style={{width: '17rem', alignContent: 'center', alignItems: 'center', margin: '1rem'}}>
            <CardBody>
                <CardTitle>Battery Percentage</CardTitle>
                <Button color="danger" style={{alignContent:'center', alignItems:'center'}}>5%</Button>
            </CardBody>
        </Card>
        <Card style={{width: '17rem', alignContent: 'center', alignItems: 'center', margin: '1rem'}}>
            <CardBody>
                <CardTitle>Current Power Consumption</CardTitle>
                <Button color="info" style={{alignContent:'center', alignItems:'center'}}>343</Button>
            </CardBody>
        </Card>
        <Card style={{width: '17rem', alignContent: 'center', alignItems: 'center', margin: '1rem'}}>
            <CardBody>
                <CardTitle>Current CPU Util.</CardTitle>
                <Button color="info" style={{alignContent:'center', alignItems:'center'}}>434</Button>
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
                          CPU Utilization
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
                  <i className="tim-icons icon-send text-success" /> ASR  - 70%  
                  <br/>
                  <i className="tim-icons icon-send text-success" /> MASR - 60%
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="12">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Current Power Consumption</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  Node-wise Power Consumption
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="12">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Current CPU Utilization</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  Node-wise CPU Utilization
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Pod List</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Pod Name</th>
                      <th>Node</th>
                      <th>Current Power Consumption</th>
                      <th className="text-center">Current CPU Util.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-center">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-center">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-center">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-center">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-center">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-center">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-center">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
