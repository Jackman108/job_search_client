import React from 'react';
import styles from './SubscriptionCard.module.css';
import {SubscriptionCardProps} from "@features/subscription/props/Subscription.props";

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({label, price, currency, isSelected, onClick}) => {
    return (
        <div className={`${styles.card} ${isSelected ? styles.selected : ''}`} onClick={onClick}>
            <h3>{label}</h3>
            <p className={styles.price}>{price} {currency}</p>
        </div>
    );
};

export default SubscriptionCard;