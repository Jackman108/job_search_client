import React, {FC} from "react";
import styles from './AuthSwitch.module.css';
import Button from "@ui/Button/Button";
import {AuthSwitchProps} from "@features/auth/types/Auth.props";
import {FORM_BUTTONS} from "@config/defaultConfig";

const AuthSwitch: FC<AuthSwitchProps> = ({isSign, setIsSign}) => (
    <div className={styles.tabContainer}>
        <Button
            className={`${styles.tab} ${!isSign ? styles.activeTab : ''}`}
            onClick={() => setIsSign(false)}
            variant="primary"
            disabled={!isSign}
        >
            {FORM_BUTTONS.SignInButton}
        </Button>
        <Button
            className={`${styles.tab} ${isSign ? styles.activeTab : ''}`}
            onClick={() => setIsSign(true)}
            variant="danger"
            disabled={isSign}
        >
            {FORM_BUTTONS.SignUpButton}
        </Button>
    </div>
);

export default AuthSwitch;
