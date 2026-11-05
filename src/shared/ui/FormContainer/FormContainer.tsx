import React, {FC} from "react";
import styles from "@shared/ui/FormContainer/FormContainer.module.css";
import {Button, UnauthorizedMessage} from "@ui";
import {FormContainerProps} from "@type";
import {useTranslation} from "react-i18next";

const FormContainer: FC<FormContainerProps> = ({token, onClose, children}) => {
    const {t} = useTranslation('auth');

    if (!token) {
        return (
            <section className={styles.sectionContainer}>
                <UnauthorizedMessage/>
                <Button className={styles.closeButton} onClick={onClose} variant="secondary">
                    {t('button.close')}
                </Button>
            </section>
        );
    }

    return (
        <section className={styles.sectionContainer}>
            <Button className={styles.closeButton} onClick={onClose} variant="secondary">
                {t('button.close')}
            </Button>
            {children}
        </section>
    );
};

export default FormContainer;