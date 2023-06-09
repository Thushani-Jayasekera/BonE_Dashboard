import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import { GetDifferenceArray } from "variables/util.js";

function Cluster() {
  const [deploymentList, setDeploymentList] = React.useState([{"Name": "No deployments", "Replicas": 0,}]);
  const setDeploymentData = (data) => {
    setDeploymentList(prevDepData => {
      const tempDepData = data["deployment_list"];
    
      return tempDepData;
    });
  };

  const [nodeList, setNodeList] = React.useState({active: ["No Active Nodes"], idle: ["No Idle Nodes"],});
  const setNodeData = (data) => {
    setNodeList(prevNodeData => {
      const tempNodeData = {
        active: data["nodes_active"],
        idle: GetDifferenceArray(data["nodes_all"], data["nodes_active"]),
      };
    
      return tempNodeData;
    });
  };

  React.useEffect(() => {
    const ws = new WebSocket('ws://34.100.218.112:8000/metrics/nodes/list');
    ws.addEventListener('message', (event) => {
      let nodeData = JSON.parse(event.data);
      setNodeData(nodeData);
    });
    return () => ws.close();
  },[]);

  React.useEffect(() => {
    const ws = new WebSocket('ws://34.100.218.112:8000/metrics/deployments');
    ws.addEventListener('message', (event) => {
      let depData = JSON.parse(event.data);
      setDeploymentData(depData)
    });
    return () => ws.close();
  },[]);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Deployments</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Deployment Name</th>
                      <th>Number of Replicas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deploymentList.map((deployment, index) => (
                      <tr>
                        <td>{deployment["Name"]}</td>
                        <td>{deployment["Replicas"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cluster Nodes</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Node Name</th>
                      <th>Active Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nodeList.active.map((node, index) => (
                      <tr>
                        <td>{node}</td>
                        <td>Active</td>
                      </tr>
                    ))}
                      {nodeList.idle.map((node, index) => (
                      <tr>
                        <td>{node}</td>
                        <td>Idle</td>
                      </tr>
                    ))}
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

export default Cluster;
