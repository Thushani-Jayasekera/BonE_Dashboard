import React from "react";
import './ToggleSwitch.css';
import axios from 'axios';

const ToggleSwitch = () => {

  const NORMAL_API_URL = "http://34.100.218.112:8000";

  const [isOn, setIsOn] = React.useState(false);

  React.useEffect(()=> {
    const fetchData = async () => {
      try {
        const brownoutResponse = await axios.get(`${NORMAL_API_URL}/`);
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
        await axios.post(`${NORMAL_API_URL}/activate`);
        console.log('Brownout is turned on');
    } catch (error) {
        console.log(error);
    }

  };

  const handleSwitchOff = async () => {
    try {
        await axios.post(`${NORMAL_API_URL}/deactivate`);
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