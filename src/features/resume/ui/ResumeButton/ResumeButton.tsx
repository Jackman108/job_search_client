import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '@app/providers/auth/useAuthContext';
import styles from '@shared/styles/Container.module.css';
import {Button, FormContainer} from "@ui";
import {PanelProps} from "@type";
import ResumeSection from "@features/resume/ui/ResumeSection/ResumeSection";

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
                    <ResumeSection/>
                </div>
            </section>
        </FormContainer>

    );
};

export default React.memo(ResumeButton);
