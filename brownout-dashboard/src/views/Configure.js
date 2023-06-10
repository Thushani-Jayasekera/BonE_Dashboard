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
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Input,
  Table,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Alert
} from "reactstrap";

import axios from 'axios';
import { master_ip, port } from "../config/config";


function Configure() {

  const HTTP_API_URL = `http://${master_ip}:${port}`;

  const [asr, setASR] = React.useState(0);
  const [asrModalOpen, setASRModalOpen] = React.useState(false);

  const [masr, setMASR] = React.useState(0);
  const [masrModalOpen, setMASRModalOpen] = React.useState(false);

  const [policy, setPolicy] = React.useState("");
  const [policyModalOpen, setPolicyModalOpen] = React.useState(false);

  const [batteryUpper, setBatteryUpper] = React.useState(90);
  const [batteryUpperModalOpen, setUpperBatteryModalOpen] = React.useState(false);

  const [batteryLower, setBatteryLower] = React.useState(0);
  const [batteryLowerModalOpen, setLowerBatteryModalOpen] = React.useState(false);

  const [slaViolationLatency, setSLAViolationLatency] = React.useState(0);
  const [slaViolationLatencyModalOpen, setSLAViolationLatencyModalOpen] = React.useState(false);

  const [slaInterval, setSLAInterval] = React.useState(0);
  const [slaIntervalModalOpen, setSLAIntervaModalOpen] = React.useState(false);

  const [formValues, setFormValues] = React.useState({
    asr: asr,
    masr: masr,
    policy:policy,
    batteryUpper:batteryUpper,
    batteryLower:batteryLower,
    slaViolationLatency: slaViolationLatency,
    slaInterval:slaInterval
  });

  const toggleASRModal = () => {
    setASRModalOpen(!asrModalOpen);
  };

  const toggleMASRModal = () => {
    setMASRModalOpen(!masrModalOpen);
  };

  const togglePolicyModal = () => {
    setPolicyModalOpen(!policyModalOpen);
  };

  const toggleUBModal = () => {
    setUpperBatteryModalOpen(!batteryUpperModalOpen);
  };

  const toggleLBModal = () => {
    setLowerBatteryModalOpen(!batteryLowerModalOpen);
  };

  const toggleSLALatencyModal = () => {
    setSLAViolationLatencyModalOpen(!slaViolationLatencyModalOpen);
  };

  const toggleSLAIntervalModal = () => {
    setSLAIntervaModalOpen(!slaIntervalModalOpen);
  };

  // get ASR & AMSR value
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const asrResponse = await axios.get(`${HTTP_API_URL}/brownout/variables/asr`);
        const asr = asrResponse.data;
        formValues.asr = asr;
        setASR(asr);
      } catch (error) {
        alert("Cannot load values. Try again later!");
        console.error('error',error);
      }
    }
    fetchData();
    return

  },[]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const amsrResponse = await axios.get(`${HTTP_API_URL}/brownout/variables/amsr`);
        const amsr = amsrResponse.data;
        formValues.masr = amsr;
        setMASR(amsr);
      } catch (error) {
        alert("Cannot load values. Try again later!");
        console.error('error',error);
      }
    }
    fetchData();
    return
  },[]);

  //get POLICY
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HTTP_API_URL}/brownout/variables/policy`);
        const policy = response.data;
        formValues.policy = policy;
        setPolicy(policy);
      } catch (error) {
        alert("Cannot load values. Try again later!");
        console.error('error',error);
      }
    }
    fetchData();
    return
  },[]);

  // get BATTERY_UPPER_THRESHOLD
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HTTP_API_URL}/brownout/variables/batteryUpper`);
        const batteryUpper = response.data;
        formValues.batteryUpper = batteryUpper;
        setBatteryUpper(batteryUpper);
      } catch (error) {
        alert("Cannot load values. Try again later!");
        console.error('error',error);
      }
    }
    fetchData();
    return
  },[]);

  // get BATTERY_LOWER_THRESHOLD
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HTTP_API_URL}/brownout/variables/batteryLower`);
        const batteryLower = response.data;
        formValues.batteryLower = batteryLower;
        setBatteryLower(batteryLower);
      } catch (error) {
        alert("Cannot load values. Try again later!");
        console.error('error',error);
      }
    }
    fetchData();
    return
  },[]);

  // get SLA_VIOLATION_LATENCY
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HTTP_API_URL}/brownout/variables/slaViolationLatency`);
        const slaViolationLatency = response.data;
        formValues.slaViolationLatency = slaViolationLatency;
        setSLAViolationLatency(slaViolationLatency);
      } catch (error) {
        alert("Cannot load values. Try again later!");
        console.error('error',error);
      }
    }
    fetchData();
    return
  },[]);

  // get SLA_INTERVAL
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HTTP_API_URL}/brownout/variables/slaInterval`);
        const slaInterval = response.data;
        formValues.slaInterval = slaInterval;
        setSLAInterval(slaInterval);
      } catch (error) {
        alert("Cannot load values. Try again later!");
        console.error('error',error);
      }
    }
    fetchData();
    return
  },[]);

  const submitASR = async (event, newASR) => {
    try {
      event.preventDefault();
      await axios.post(`${HTTP_API_URL}/brownout/variables/asr`, { 'value': newASR } )
      setASR(newASR);
      setASRModalOpen(false);
      alert(`ASR set to ${newASR}!`);
    } catch (error) {
      alert("Cannot set value. Try again later!")
      console.log(error)
    }
  }

  const submitMASR = async (event, newMASR) => {
    try {
      event.preventDefault();
      await axios.post(`${HTTP_API_URL}/brownout/variables/amsr`, { value: newMASR } )
      setMASR(newMASR);
      setMASRModalOpen(false);
      alert(`MASR set to ${newMASR}!`);
    } catch (error) {
      alert("Cannot set value. Try again later!")
      console.log(error)
    }
  }

  const submitPolicy = async (event, newPolicy) => {
    try {
      event.preventDefault();
      await axios.post(`${HTTP_API_URL}/brownout/variables/policy`, { value: newPolicy } )
      setPolicy(newPolicy);
      setPolicyModalOpen(false);
      alert(`Policy set to ${newPolicy}!`);
    } catch (error) {
      alert("Cannot set value. Try again later!")
      console.log(error)
    }
  }

  const submitBatteryUpper = async (event, newBattery) => {
    try {
      event.preventDefault();
      await axios.post(`${HTTP_API_URL}/brownout/variables/batteryUpper`, { value: newBattery } )
      setBatteryUpper(newBattery);
      setUpperBatteryModalOpen(false);
      alert(`Higher Battery Threshold set to ${newBattery}!`);
    } catch (error) {
      alert("Cannot set value. Try again later!")
      console.log(error)
    }
  }

  const submitSLAViolationLatency = async (event, newSLA) => {
    try {
      event.preventDefault();
      await axios.post(`${HTTP_API_URL}/brownout/variables/slaViolationLatency`, { value: newSLA } )
      setSLAViolationLatency(newSLA);
      setSLAViolationLatencyModalOpen(false);
      alert(`SLA Violation latency set to ${newSLA}!`);
    } catch (error) {
      alert("Cannot set value. Try again later!")
      console.log(error)
    }
  }

  const submitSLAInterval = async (event, newSLA) => {
    try {
      event.preventDefault();
      await axios.post(`${HTTP_API_URL}/brownout/variables/slaInterval`, { value: newSLA } )
      setSLAInterval(newSLA);
      setSLAIntervaModalOpen(false);
      alert(`SLA  Interval set to ${newSLA}!`);
    } catch (error) {
      alert("Cannot set value. Try again later!")
      console.log(error)
    }
  }

  const submitBatteryLower = async (event, newBattery) => {
    try {
      event.preventDefault();
      await axios.post(`${HTTP_API_URL}/brownout/variables/batteryLower`, { value: newBattery } )
      setBatteryLower(newBattery);
      setLowerBatteryModalOpen(false);
      alert(`Lower Battery Threshold set to ${newBattery}!`);
    } catch (error) {
      alert("Cannot set value. Try again later!")
      console.log(error)
    }
  }

  return (
    <>
      <div className="content">
        <div className="react-notification-alert-container">

        </div>
        <Row>
        <Col lg="12" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Configure Variables</h6>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                    <tr>
                        <td>
                          <p className="title">Policy</p>
                          <p className="text-muted">
                            The policy used in the brownout algorithm to select containers to deactivate
                          </p>
                        </td>
                        <td>
                        <Button
                            block
                            color="info"
                          >
                            {policy}
                        </Button>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                            onClick={togglePolicyModal}
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Change
                          </UncontrolledTooltip>
                        </td>
                        <Modal isOpen={policyModalOpen} toggle={togglePolicyModal} title="change Policy"  modalClassName="modal-info">
                            <ModalHeader toggle={togglePolicyModal}>Edit Policy Used</ModalHeader>
                            <ModalBody>
                    
                              <Form>
                                  <select className="form-control" color="black" value={formValues.policy} onChange={(event) => {
                                  setFormValues({...formValues, policy: event.target.value })
                                }} >
                                    <option value="NISP">NISP</option>
                                    <option value="LUCF">LUCF</option>
                                    <option value="HUCF">HUCF</option>
                                    <option value="RCSP">RCSP</option>
                                  </select>
                                <Button onClick={(event) =>submitPolicy(event, formValues.policy)}> Change </Button>
                              </Form>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </Modal>

                      </tr>
                      <tr>
                        <td>
                          <p className="title">Accepted Success Rate</p>
                          <p className="text-muted">
                            Accepted success rate is a QoS paramter. The reccomended default value is 0.70
                          </p>
                        </td>
                        <td>
                        <Button
                            block
                            color="info"
                          >
                            {asr}
                        </Button>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                            onClick={toggleASRModal}
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Change
                          </UncontrolledTooltip>
                        </td>
                        <Modal isOpen={asrModalOpen} toggle={toggleASRModal} title="change ASR"  modalClassName="modal-info">
                            <ModalHeader toggle={toggleASRModal}>Edit ASR Value</ModalHeader>
                            <ModalBody>
                              <Form>
                                <Input type="text" name="asr" value={formValues.asr} onChange={(event) => {
                                  setFormValues({...formValues, asr: event.target.value })
                                }} color="black"
                                /> 
                                <Button onClick={(event) =>submitASR(event, formValues.asr)}> Change </Button>
                              </Form>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </Modal>
                      </tr>
                      <tr>
                      <td>
                          <p className="title">Minimum Accepted Success Rate</p>
                          <p className="text-muted">
                            Accepted minimum success rate is a QoS paramter. The reccomended default value is 0.60
                          </p>
                        </td>
                        <td>
                        <Button
                            block
                            color="info"
                          >
                            {masr}
                        </Button>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                            onClick={toggleMASRModal}
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Change
                          </UncontrolledTooltip>
                        </td>
                        <Modal isOpen={masrModalOpen} toggle={toggleMASRModal} title="change MASR"  modalClassName="modal-info">
                            <ModalHeader toggle={toggleMASRModal}>Edit ASR Value</ModalHeader>
                            <ModalBody>
                              <Form>
                                <Input type="text" name="masr" value={formValues.masr} onChange={(event) => {
                                  setFormValues({...formValues, masr: event.target.value })
                                }} color="black"
                                /> 
                                <Button onClick={(event) =>submitMASR(event, formValues.masr)}> Change </Button>
                              </Form>
                            </ModalBody>
                            <ModalFooter>
                            
                            </ModalFooter>
                        </Modal>
                      </tr>
                      <tr>
                        <td>
                          <p className="title">Slow Request Response Time</p>
                          <p className="text-muted">
                            A threshold time to consider a request as a slow request. The default is 250ms. 
                            i.e. Requests taking more than 250ms to send response are slow requests.
                          </p>
                        </td>
                        <td>
                        <Button
                            block
                            color="info"
                          >
                            {slaViolationLatency}
                        </Button>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                            onClick={toggleSLALatencyModal}
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Change
                          </UncontrolledTooltip>
                        </td>
                        <Modal isOpen={slaViolationLatencyModalOpen} toggle={toggleSLALatencyModal} title="change SLA Latency Time"  modalClassName="modal-info">
                            <ModalHeader toggle={toggleSLALatencyModal}>Edit SLA Latency Time</ModalHeader>
                            <ModalBody>
                              <Form>
                                <Input type="text" name="slalatency" value={formValues.slaViolationLatency} onChange={(event) => {
                                  setFormValues({...formValues, slaViolationLatency: event.target.value })
                                }} color="black"
                                /> 
                                <Button onClick={(event) =>submitSLAViolationLatency(event, formValues.slaViolationLatency)}> Change </Button>
                              </Form>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </Modal>
                      </tr>
                      <tr>
                        <td>
                          <p className="title">SLA Interval</p>
                          <p className="text-muted">
                            The interval used to calculate the success rates.
                          </p>
                        </td>
                        <td>
                        <Button
                            block
                            color="info"
                          >
                            {slaInterval}
                        </Button>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                            onClick={toggleSLAIntervalModal}
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Change
                          </UncontrolledTooltip>
                        </td>
                        <Modal isOpen={slaIntervalModalOpen} toggle={toggleSLAIntervalModal} title="change SLA Latency Interval"  modalClassName="modal-info">
                            <ModalHeader toggle={toggleSLAIntervalModal}>Edit SLA Latency Interval</ModalHeader>
                            <ModalBody>
                              <Form>
                                <Input type="text" name="slalatency" value={formValues.slaInterval} onChange={(event) => {
                                  setFormValues({...formValues, slaInterval: event.target.value })
                                }} color="black"
                                /> 
                                <Button onClick={(event) =>submitSLAInterval(event, formValues.slaInterval)}> Change </Button>
                              </Form>
                            </ModalBody>
                            <ModalFooter>
                            
                            </ModalFooter>
                        </Modal>
                      </tr>
                      <tr>
                        <td>
                          <p className="title">Threshold Low Battery Percentage</p>
                          <p className="text-muted">
                          The battery percentage to automatically activate the brownoout controller
                          </p>
                        </td>
                        <td>
                        <Button
                            block
                            color="info"
                          >
                            {batteryLower}
                        </Button>
                        </td>
 
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                            onClick={toggleLBModal}
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Change
                          </UncontrolledTooltip>
                        </td>
                        <Modal isOpen={batteryLowerModalOpen} toggle={toggleLBModal} title="change Low Battery Threshold"  modalClassName="modal-info">
                            <ModalHeader toggle={toggleLBModal}>Edit Low Battery Threshold</ModalHeader>
                            <ModalBody>
                              <Form>
                                <Input type="text" name="batteryLower" value={formValues.batteryLower} onChange={(event) => {
                                  setFormValues({...formValues, batteryLower: event.target.value })
                                }} color="black"
                                /> 
                                <Button onClick={(event) =>submitBatteryLower(event, formValues.batteryLower)}> Change </Button>
                              </Form>
                            </ModalBody>
                            <ModalFooter>
                            
                            </ModalFooter>
                        </Modal>
                      </tr>
                      <tr>
                        <td>
                          <p className="title">High Battery Percentage</p>
                          <p className="text-muted">
                            Battery Percentage to stop the brownout controller automatically
                          </p>
                        </td>
                        <td>
                        <Button
                            block
                            color="info"
                          >
                            {batteryUpper}
                        </Button>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                            onClick={toggleUBModal}
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Change
                          </UncontrolledTooltip>
                        </td>
                        <Modal isOpen={batteryUpperModalOpen} toggle={toggleUBModal} title="change High Battery Threshold"  modalClassName="modal-info">
                            <ModalHeader toggle={toggleUBModal}>Edit High Battery Threshold</ModalHeader>
                            <ModalBody>
                              <Form>
                                <Input type="text" name="batteryUpper" value={formValues.batteryUpper} onChange={(event) => {
                                  setFormValues({...formValues, batteryUpper: event.target.value })
                                }} color="black"
                                /> 
                                <Button onClick={(event) =>submitBatteryUpper(event, formValues.batteryUpper)}> Change </Button>
                              </Form>
                            </ModalBody>
                            <ModalFooter>
                            
                            </ModalFooter>
                        </Modal>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
      </div>
    </>
  );
}

export default Configure;
