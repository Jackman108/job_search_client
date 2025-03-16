import React, {FC} from "react";
import styles from './AuthSwitch.module.css';
import {Button} from "@ui";
import {AuthSwitchProps} from "@features/auth/types/Auth.props";
import {useTranslation} from "react-i18next";

const AuthSwitch: FC<AuthSwitchProps> = ({isSign, setIsSign}) => {
    const {t} = useTranslation('auth');

    return (
        <div className={styles.tabContainer}>
            <Button
                className={`${styles.tab} ${!isSign ? styles.activeTab : ''}`}
                onClick={() => setIsSign(false)}
                variant="primary"
                disabled={!isSign}
            >
                {t('button.SignIn')}
            </Button>
            <Button
                className={`${styles.tab} ${isSign ? styles.activeTab : ''}`}
                onClick={() => setIsSign(true)}
                variant="danger"
                disabled={isSign}
            >
                {t('button.SignUp')}
            </Button>
        </div>
    )
};

export default AuthSwitch;
