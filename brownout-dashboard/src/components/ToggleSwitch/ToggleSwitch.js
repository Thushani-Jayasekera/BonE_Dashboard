import React from "react";
import './ToggleSwitch.css';
import axios from 'axios';
import { master_ip, port } from "config/config";

const ToggleSwitch = () => {

  const HTTP_API_URL = `http://${master_ip}:${port}`;

  const [isOn, setIsOn] = React.useState(false);

  React.useEffect(()=> {
    const fetchData = async () => {
      try {
        // TODO
        const brownoutResponse = await axios.get(`${HTTP_API_URL}/`);
        console.log(brownoutResponse)
        const state = brownoutResponse.data;
        setIsOn(true);
      } catch (error) {
        console.error('error',error);
      }
    }
    fetchData();
    return
  });


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