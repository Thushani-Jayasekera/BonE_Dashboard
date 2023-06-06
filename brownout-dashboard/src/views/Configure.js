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
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Alert,
  UncontrolledAlert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form
} from "reactstrap";

import axios from 'axios';

function Configure() {

  const NORMAL_API_URL = "http://34.100.190.209:8000";

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
    setMASRModalOpen(!asrModalOpen);
  };

  const togglePolicyModal = () => {
    setPolicyModalOpen(!asrModalOpen);
  };

  const toggleUBModal = () => {
    setUpperBatteryModalOpen(!asrModalOpen);
  };

  const toggleLBModal = () => {
    setLowerBatteryModalOpen(!asrModalOpen);
  };

  const toggleSLALatencyModal = () => {
    setSLAViolationLatencyModalOpen(!asrModalOpen);
  };

  const toggleSLAIntervalModal = () => {
    setSLAIntervaModalOpen(!asrModalOpen);
  };

  // get ASR & AMSR value
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const asrResponse = await axios.get(`${NORMAL_API_URL}/brownout/variables/asr`);
        const asr = asrResponse.data;
        formValues.asr = asr;
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
        const amsrResponse = await axios.get(`${NORMAL_API_URL}/brownout/variables/amsr`);
        const amsr = amsrResponse.data;
        formValues.masr = amsr;
        setMASR(amsr);
      } catch (error) {
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
        const response = await axios.get(`${NORMAL_API_URL}/brownout/variables/policy`);
        const policy = response.data;
        formValues.policy = policy;
        setPolicy(policy);
      } catch (error) {
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
        const response = await axios.get(`${NORMAL_API_URL}/brownout/variables/batteryUpper`);
        const batteryUpper = response.data;
        formValues.batteryUpper = batteryUpper;
        setBatteryUpper(batteryUpper);
      } catch (error) {
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
        const response = await axios.get(`${NORMAL_API_URL}/brownout/variables/batteryLower`);
        const batteryLower = response.data;
        formValues.batteryLower = batteryLower;
        setBatteryLower(batteryLower);
      } catch (error) {
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
        const response = await axios.get(`${NORMAL_API_URL}/brownout/variables/slaViolationLatency`);
        const slaViolationLatency = response.data;
        formValues.slaViolationLatency = slaViolationLatency;
        setSLAViolationLatency(slaViolationLatency);
      } catch (error) {
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
        const response = await axios.get(`${NORMAL_API_URL}/brownout/variables/slaInterval`);
        const slaInterval = response.data;
        formValues.slaInterval = slaInterval;
        setSLAInterval(slaInterval);
      } catch (error) {
        console.error('error',error);
      }
    }
    fetchData();
    return
  },[]);

  const submitASR = async (event, newASR) => {
    try {
      event.preventDefault();
      await axios.post(`${NORMAL_API_URL}/brownout/variables/asr`, { 'value': newASR } )
      setASR(newASR);
      setASRModalOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  const submitMASR = async (event, newMASR) => {
    try {
      event.preventDefault();
      await axios.post(`${NORMAL_API_URL}/brownout/variables/masr`, { value: newMASR } )
      setMASR(newMASR);
      setMASRModalOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  const submitPolicy = async (event, newPolicy) => {
    try {
      event.preventDefault();
      await axios.post(`${NORMAL_API_URL}/brownout/variables/policy`, { value: newPolicy } )
      setMASR(newPolicy);
      setPolicyModalOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  const submitBatteryUpper = async (event, newBattery) => {
    try {
      event.preventDefault();
      await axios.post(`${NORMAL_API_URL}/brownout/variables/batteryUpper`, { value: newBattery } )
      setBatteryUpper(newBattery);
      setUpperBatteryModalOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  const submitSLAViolationLatency = async (event, newSLA) => {
    try {
      event.preventDefault();
      await axios.post(`${NORMAL_API_URL}/brownout/variables/slaViolationLatency`, { value: newSLA } )
      setSLAViolationLatency(newSLA);
      setSLAViolationLatencyModalOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  const submitSLAInterval = async (event, newSLA) => {
    try {
      event.preventDefault();
      await axios.post(`${NORMAL_API_URL}/brownout/variables/slaInterval`, { value: newSLA } )
      setSLAInterval(newSLA);
      setSLAIntervaModalOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  const submitBatteryLower = async (event, newBattery) => {
    try {
      event.preventDefault();
      await axios.post(`${NORMAL_API_URL}/brownout/variables/batteryLower`, { value: newBattery } )
      setBatteryLower(newBattery);
      setLowerBatteryModalOpen(false);
    } catch (error) {
      console.log(error)
    }
  }


  const notificationAlertRef = React.useRef(null);
  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Black Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  return (
    <>
      <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlertRef} />
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
                                <Input type="text" name="policy" value={formValues.policy} onChange={(event) => {
                                  setFormValues({...formValues, policy: event.target.value })
                                }} color="black"
                                /> 
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
                            Accepted success rate is a QoS paramter. The reccomended default value is 0.60
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
                            A threshold time to consider it a slow request. The default is 250ms. 
                            i.e. Requests taking more than 250ms to send response are slow requests
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
                                <Button onClick={(event) =>submitSLAInterval(event, formValues.batteryLower)}> Change </Button>
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
                                <Button onClick={(event) =>submitSLAInterval(event, formValues.batteryUpper)}> Change </Button>
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
