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

  const NORMAL_API_URL = "http://34.100.218.112:8000";

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
    setASRModalOpen(!asrModalOpen);
  };

  const togglePolicyModal = () => {
    setASRModalOpen(!asrModalOpen);
  };

  const toggleUBModal = () => {
    setASRModalOpen(!asrModalOpen);
  };

  const toggleLBModal = () => {
    setASRModalOpen(!asrModalOpen);
  };

  const toggleSLALatencyModal = () => {
    setASRModalOpen(!asrModalOpen);
  };

  const toggleSLAIntervalModal = () => {
    setASRModalOpen(!asrModalOpen);
  };

  // get ASR & AMSR value
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const asrResponse = await axios.get(`${NORMAL_API_URL}/brownout/variables/asr`);
        const asr = asrResponse.body;
        console.log(asr);
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
        const amsr = amsrResponse.body;
        console.log(amsr);
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
        const policy = response.body;
        console.log(policy);
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
        const batteryUpper = response.body;
        console.log(batteryUpper);
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
        const batteryLower = response.body;
        console.log(batteryLower);
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
        const slaViolationLatency = response.body;
        console.log(slaViolationLatency);
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
        const slaInterval = response.body;
        console.log(slaInterval);
        setSLAInterval(slaInterval);
      } catch (error) {
        console.error('error',error);
      }
    }
    fetchData();
    return
  },[]);

  const submitASR = async (newASR) => {
    try {
      await axios.post(`${NORMAL_API_URL}/brownout/variables/asr`, { value: newASR } )
      setASR(newASR);
      console.log("success");
      setASRModalOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  const submitMASR = async (newMASR) => {
    try {
      await axios.post(`${NORMAL_API_URL}/brownout/variables/masr`, { value: newMASR } )
      setMASR(newMASR);
      console.log("success");
      setMASRModalOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  const submitPolicy = async (newPolicy) => {
    try {
      await axios.post(`${NORMAL_API_URL}/brownout/variables/policy`, { value: newPolicy } )
      setMASR(newPolicy);
      console.log("success");
      setPolicyModalOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  const submitBatteryUpper = async (newBattery) => {
    try {
      await axios.post(`${NORMAL_API_URL}/brownout/variables/batteryUpper`, { value: newBattery } )
      setBatteryUpper(newBattery);
      console.log("success");
      setUpperBatteryModalOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  const submitSLAViolationLatency = async (newSLA) => {
    try {
      await axios.post(`${NORMAL_API_URL}/brownout/variables/slaViolationLatency`, { value: newSLA } )
      setSLAViolationLatency(newSLA);
      console.log("success");
      setSLAViolationLatencyModalOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  const submitSLAInterval = async (newSLA) => {
    try {
      await axios.post(`${NORMAL_API_URL}/brownout/variables/slaInterval`, { value: newSLA } )
      setSLAInterval(newSLA);
      console.log("success");
      setSLAIntervaModalOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  const submitBatteryLower = async (newBattery) => {
    try {
      await axios.post(`${NORMAL_API_URL}/brownout/variables/batteryLower`, { value: newBattery } )
      setBatteryUpper(newBattery);
      console.log("success");
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
                        <Modal isOpen={asrModalOpen} toggle={toggleASRModal} title="change ASR">
                            <ModalHeader toggle={toggleASRModal}>EDIT ASR</ModalHeader>
                            <ModalBody>
                              <Form>
                                <input type="text" name="asr" value={formValues.asr} onChange={(event) => {
                                  setFormValues({...formValues, asr: event.target.value })
                                }}
                                />  
                                <button onClick={submitASR(formValues.asr)}> Change </button>
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
