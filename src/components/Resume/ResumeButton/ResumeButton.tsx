import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {ResumeProps} from '../../../Interfaces/InterfaceResume.types';
import Button from '../../../UI/Button/Button';
import {useAuth} from '../../../context/useAuthContext';
import styles from './ResumeButton.module.css';
import UnauthorizedMessage from '../../../UI/UnauthorizedMessage/UnauthorizedMessage';
import {FORM_BUTTONS} from '../../../config/formConfigs';

const ResumeButton: FC<ResumeProps> = ({onClose}) => {
    const {token} = useAuth();
    const navigate = useNavigate();

    const handleGetClick = () => {
        navigate('/resume/');
    };

    if (!token) {
        return (
            <section className={styles.sectionContainer}>
                <UnauthorizedMessage/>
                <Button className={styles.closeButton} onClick={onClose} variant="secondary">
                    {FORM_BUTTONS.closeButton}
                </Button>
            </section>
        );
    }

    return (
        <section className={styles.resumeSection}>
            <div className={styles.resumeContainer}>
                <Button onClick={handleGetClick} variant="primary">
                    резюме
                </Button>

            </div>
            <Button className={styles.closeButton} onClick={onClose} variant="secondary">
                {FORM_BUTTONS.closeButton}
            </Button>
        </section>
    );
};

export default React.memo(ResumeButton);
