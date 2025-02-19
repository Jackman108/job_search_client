// components/UnauthorizedMessage.tsx
import React from 'react';
import {Link} from 'react-router-dom';
import styles from './UnauthorizedMessage.module.css';

const UnauthorizedMessage: React.FC = () => {
    return (
        <section>
            <Link to="/" className="home-button"> 🏠 </Link>
            <div className={styles.errorMessage}>Пользователь не авторизован</div>
        </section>
    );
};

export default UnauthorizedMessage;
