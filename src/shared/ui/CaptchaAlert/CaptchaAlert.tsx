import { FC } from 'react';
import './CaptchaAlert.css';
import { CaptchaAlertProps } from '@shared/types/Component.types';

const CaptchaAlert: FC<CaptchaAlertProps> = ({ message, captchaSrc, onClose }) => {
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
