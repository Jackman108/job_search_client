import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Subscription.module.css';
import useFetchSubscription from "../hooks/useFetchSubscription";

const Subscription = () => {
    const {subscriptionData, loading, error} = useFetchSubscription();

    return (
        <div className={styles.container}>
            <Link to="/" className="home-button">🏠</Link>
            <h1>Подписки</h1>
            {loading && <p>Загрузка...</p>}
            {error && <p>Ошибка: {error.message}</p>}
            {subscriptionData ? (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Subscription Type</th>
                        <th>Price</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {subscriptionData.map(subscription => (
                        <tr key={subscription.id}>
                            <td>{subscription.id}</td>
                            <td>{subscription.userId}</td>
                            <td>{subscription.subscriptionType}</td>
                            <td>{subscription.price}</td>
                            <td>{subscription.startDate}</td>
                            <td>{subscription.endDate || 'N/A'}</td>
                            <td>{subscription.createdAt}</td>
                            <td>{subscription.updatedAt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                !loading && !error && <p>Нет данных по подпискам.</p>
            )}
        </div>
    );
};

export default Subscription;
