// CaptchaAlert.tsx
import React, { useEffect, useState } from 'react';
import './CaptchaAlert.css';

interface CaptchaAlertProps {
  wsUrl: string;
}

const CaptchaAlert: React.FC<CaptchaAlertProps> = ({ wsUrl }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const messageData = event.data;
            
      try {
        const message = JSON.parse(messageData);

        if (message.type === 'captcha') {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 5000); // Убирает алерт через 5 секунд
        }
      } catch (error) {
        // Если сообщение не является JSON, просто игнорируем его или логируем
        console.log('Received non-JSON message:', messageData);
      }
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [wsUrl]);

  if (!showAlert) {
    return null;
  }

  return (
    <div className="captcha-alert">
      CAPTCHA detected, please solve it on the website!
    </div>
  );
};

export default CaptchaAlert;
