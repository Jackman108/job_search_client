import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from "react-router-dom";

const PaymentError: FC = () => {
    const {t} = useTranslation('payments');
    return (
        <section>
            <Link to="/" className="home-button">🏠</Link>
            <h1>{t('payment.error.title')}</h1>
            <p>{t('payment.error.message')}</p>
        </section>
    );
};

export default PaymentError;