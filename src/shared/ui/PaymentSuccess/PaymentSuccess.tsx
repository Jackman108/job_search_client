import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from "react-router-dom";

const PaymentSuccess: FC = () => {

    const {t} = useTranslation('payments');
    return (

        <section>
            <Link to="/" className="home-button">🏠</Link>
            <h1>{t('payment.success.title')}</h1>
            <p>{t('payment.success.message')}</p>
        </section>
    );
};

export default PaymentSuccess;