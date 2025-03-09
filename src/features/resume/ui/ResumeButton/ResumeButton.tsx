import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '@app/providers/auth/useAuthContext';
import styles from './ResumeButton.module.css';
import {Button, FormContainer} from "@ui";
import {PanelProps} from "@type";

const ResumeButton: FC<PanelProps> = ({onClose}) => {
    const {token} = useAuth();
    const navigate = useNavigate();

    const handleGetClick = () => {
        navigate('/resume/');
    };

    return (
        <FormContainer token={token} onClose={onClose}>
            <section className={styles.resumeSection}>
                <div className={styles.resumeContainer}>
                    <Button onClick={handleGetClick} variant="primary">
                        резюме
                    </Button>
                </div>
            </section>
        </FormContainer>

    );
};

export default React.memo(ResumeButton);
