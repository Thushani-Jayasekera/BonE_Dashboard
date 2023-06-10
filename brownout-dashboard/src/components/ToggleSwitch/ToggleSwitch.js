import React from "react";
import './ToggleSwitch.css';
import axios from 'axios';
import { master_ip, port } from "config/config";

const ToggleSwitch = () => {

  const HTTP_API_URL = `http://${master_ip}:${port}`;
  const WS_API_URL = `ws://${master_ip}:${port}`;

  const [isOn, setIsOn] = React.useState(false);
  const setBStatus = (data) => {
    setIsOn(prevRunningData => {
      const tempRunningData = data['brownout_active'];
      return tempRunningData;
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

  const handleToggle = () => {
    setIsOn(!isOn);
    if (isOn) {
      handleSwitchOff();
    } else {
      handleSwitchOn();
    }
  };

  const handleSwitchOn = async () => {
    try{
        await axios.post(`${HTTP_API_URL}/brownout/activate`);
        alert('Brownout is turned on');
    } catch (error) {
        alert('Brownout coould not be turned on');
        console.log(error);
    }

  };

  const handleSwitchOff = async () => {
    try {
        await axios.post(`${HTTP_API_URL}/brownout/deactivate`);
        alert('Brownout is turned off');
    } catch (error) {
        alert('Brownout could not be turned off');
        console.log(error);
    }

  };

  return (
    <div className={`toggle-switch ${isOn ? 'on' : 'off'}`} onClick={handleToggle}>
      <div className="slider"></div>
    </div>
  );
};

export default ToggleSwitch;