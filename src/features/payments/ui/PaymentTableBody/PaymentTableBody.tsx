import React from 'react';
import {PaymentTableBodyProps} from "@features/payments/types/Payment.types";
import Button from "@ui/Button/Button";
import {ACTION_TYPES} from "@config/actionTypes";
import {useTranslation} from "react-i18next";

const PaymentTableBody: React.FC<PaymentTableBodyProps> = ({paymentData, handleEditClick, handleDelete}) => {
    const {t} = useTranslation('payments');
    return (
        <table>
            <thead>
            <tr>
                <th>{t('tableHeaders.id')}</th>
                <th>{t('tableHeaders.userId')}</th>
                <th>{t('tableHeaders.amount')}</th>
                <th>{t('tableHeaders.paymentStatus')}</th>
                <th>{t('tableHeaders.paymentMethod')}</th>
                <th>{t('tableHeaders.createdAt')}</th>
                <th>{t('tableHeaders.updatedAt')}</th>
                <th>{t('tableHeaders.actions')}</th>
            </tr>
            </thead>
            <tbody>
            {paymentData?.map(payment => (
                <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.user_id}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.payment_status}</td>
                    <td>{payment.payment_method || 'N/A'}</td>
                    <td>{payment.created_at}</td>
                    <td>{payment.updated_at}</td>

                    <td>
                        <Button onClick={() => handleEditClick(ACTION_TYPES.PAYMENT, payment)}>
                            {t('payments.actions.edit')}
                        </Button>
                        <Button onClick={() => handleDelete(payment.id!)}>
                            {t('payments.actions.delete')}
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default PaymentTableBody;