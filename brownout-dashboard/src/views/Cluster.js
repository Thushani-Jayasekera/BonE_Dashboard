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

function Cluster() {
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
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>

                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>

                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>

                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>

                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>

                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>

                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>

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

export default Cluster;
