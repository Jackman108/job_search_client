import React from 'react';
import styles from './SubscriptionOption.module.css';
import {SubscriptionOptionProps} from "@features/subscription/props/Subscription.props";

const SubscriptionOption: React.FC<SubscriptionOptionProps> = ({label, price, currency, isSelected, onClick}) => {
    return (
        <article
            className={`${styles.card} ${isSelected ? styles.selected : ''}`}
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            onKeyDown={(e) => e.key === 'Enter' && onClick()}
        >
            <h3 className={styles.label}>{label}</h3>
            <p className={styles.price}>{price} {currency}</p>
        </article>
    );
};

export default SubscriptionOption;