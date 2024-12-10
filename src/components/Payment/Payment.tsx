import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Payment.module.css';
import useFetchPayment from "../../hooks/fetch/useFetchPayment";

const Payment = () => {
    const { paymentData, loading, error } = useFetchPayment();

    return (
        <div className={styles.container}>
            <Link to="/" className="home-button">🏠</Link>
            <h1>Оплаты</h1>
            {loading && <p>Загрузка...</p>}
            {error && <p>Ошибка: {error}</p>}
            {paymentData ? (
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
                    </tr>
                    </thead>
                    <tbody>
                    {paymentData.map(payment => (
                        <tr key={payment.id}>
                            <td>{payment.id}</td>
                            <td>{payment.userId}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.paymentStatus}</td>
                            <td>{payment.paymentMethod || 'N/A'}</td>
                            <td>{payment.createdAt}</td>
                            <td>{payment.updatedAt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                !loading && !error && <p>Нет данных по оплатам.</p>
            )}
        </div>
    );
};

export default Payment;
