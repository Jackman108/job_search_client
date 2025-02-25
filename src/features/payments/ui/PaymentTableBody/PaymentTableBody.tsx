import React from 'react';
import {PaymentTableBodyProps} from "@features/payments/types/Payment.types";
import Button from "@ui/Button/Button";
import {ACTION_TYPES} from "@config/actionTypes";

const PaymentTableBody: React.FC<PaymentTableBodyProps> = ({paymentData, handleEditClick, handleDelete}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Payment Method</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            {paymentData?.map(payment => (
                <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.userId}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.paymentStatus}</td>
                    <td>{payment.paymentMethod || 'N/A'}</td>
                    <td>{payment.createdAt}</td>
                    <td>{payment.updatedAt}</td>

                    <td>
                        <Button onClick={() => handleEditClick(ACTION_TYPES.PAYMENT, payment)}>Редактировать</Button>
                        <Button onClick={() => handleDelete(payment.id!)}>Удалить</Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default PaymentTableBody;