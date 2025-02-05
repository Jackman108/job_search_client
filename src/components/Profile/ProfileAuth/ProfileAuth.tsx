// ProfileAuth.tsx
import React, {FC} from "react";
import styles from './ProfileAuth.module.css';
import Button from "../../../UI/Button/Button";
import {FORM_BUTTONS} from '../../../config/formConfigs';

const ProfileAuth: FC<{ isSign: boolean; setIsSign: (value: boolean) => void }> = ({isSign, setIsSign}) => (
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

export default ProfileAuth;
