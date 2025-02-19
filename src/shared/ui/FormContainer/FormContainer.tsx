import React, {FC} from "react";
import styles from "@shared/ui/FormContainer/FormContainer.module.css";
import Button from "@ui/Button/Button";
import UnauthorizedMessage from "@ui/UnauthorizedMessage/UnauthorizedMessage";
import {FORM_BUTTONS} from "@config/defaultConfig";
import {FormContainerProps} from "@shared/types/FormContainer.props";

const FormContainer: FC<FormContainerProps> = ({token, onClose, children}) => {
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
        <section className={styles.sectionContainer}>
            <Button className={styles.closeButton} onClick={onClose} variant="secondary">
                {FORM_BUTTONS.closeButton}
            </Button>
            {children}
        </section>
    );
};

export default FormContainer;