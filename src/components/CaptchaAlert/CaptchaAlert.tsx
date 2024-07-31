import React from 'react';
import './CaptchaAlert.css';

interface CaptchaAlertProps {
    message: string;
    captchaSrc?: string;
    onClose: () => void;
}

const CaptchaAlert: React.FC<CaptchaAlertProps> = ({ message, captchaSrc, onClose }) => {
    return (
        <div className="captcha-alert">
            <span>{message}</span>
            {captchaSrc && <img src={captchaSrc} alt="Captcha" />}
            <button
                onClick={onClose}
                className="captcha-alert-close-button"
            >
                ×
            </button>
        </div>
    );
};

export default CaptchaAlert;
