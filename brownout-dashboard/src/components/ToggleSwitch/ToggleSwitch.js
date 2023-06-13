import React from "react";
import './ToggleSwitch.css';
import axios from 'axios';
import { master_ip, port } from "config/config";

// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

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
        notify('Brownout is turned on', 1);
    } catch (error) {
      notify('Brownout coould not be turned on',0);
        console.log(error);
    }

  };

  const handleSwitchOff = async () => {
    try {
        await axios.post(`${HTTP_API_URL}/brownout/deactivate`);
        notify('Brownout is turned off', 1);
    } catch (error) {
      notify('Brownout could not be turned off',0);
        console.log(error);
    }

  };

  const notificationAlertRef = React.useRef(null);
  const notify = (message , color) => {
    var type;
    switch (color) {
      case 1:
        type = "success";
        break;
      case 0:
        type = "danger";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: "tr",
      message: (
        <div>
          <div>
            {message}
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  }

  return (
    <>
    <div className="react-notification-alert-container">
    <NotificationAlert ref={notificationAlertRef} />
  </div>
    <div className={`toggle-switch ${isOn ? 'on' : 'off'}`} onClick={handleToggle}>
      <div className="slider"></div>
    </div>
    </>
  );
};

export default ToggleSwitch;