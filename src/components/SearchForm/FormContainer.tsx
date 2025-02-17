import React, {FC, ReactNode} from "react";
import styles from "./SearchForm.module.css";
import Button from "../../UI/Button/Button";
import UnauthorizedMessage from "../../UI/UnauthorizedMessage/UnauthorizedMessage";
import {FORM_BUTTONS} from "../../config/searchConfig";

interface FormContainerProps {
    token: string | null;
    onClose: () => void;
    children: ReactNode;
}

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