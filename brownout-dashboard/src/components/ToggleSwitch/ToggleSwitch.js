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
        await axios.post(`${HTTP_API_URL}/activate`);
        console.log('Brownout is turned on');
    } catch (error) {
        console.log(error);
    }

  };

  const handleSwitchOff = async () => {
    try {
        await axios.post(`${HTTP_API_URL}/deactivate`);
        console.log('Brownout is turned off');
    } catch (error) {
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