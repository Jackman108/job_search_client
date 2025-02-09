// src/components/User/ProfileInfo.tsx
import React from 'react';
import {UserInfoProps} from '../../../Interfaces/InterfaceProfile.types';
import Avatar from '../../../UI/Avatar/Avatar';
import Button from '../../../UI/Button/Button';
import RenderRow from '../../../UI/RenderRow/RenderRow';
import {BUTTON_TEXTS, USER_TEXTS} from '../../../config/formConfigs';
import styles from './ProfileView.module.css';

const ProfileView: React.FC<UserInfoProps> = ({userInfo, onEdit, onSignOut}) => (
    <div className={styles.profileInfo}>
        <Avatar src={userInfo.avatar} className={styles.avatar}/>

        <div className={styles.infoContainer}>
            <RenderRow label={USER_TEXTS.firstNameLabel} value={userInfo.first_name}/>
            <RenderRow label={USER_TEXTS.lastNameLabel} value={userInfo.last_name}/>
            <RenderRow label={USER_TEXTS.balanceLabel} value={userInfo.balance}/>
            <RenderRow label={USER_TEXTS.spinCountLabel} value={userInfo.spin_count}/>
            <RenderRow label={USER_TEXTS.successfulResponsesLabel} value={userInfo.successful_responses_count}/>
            <RenderRow label={USER_TEXTS.currentStatusLabel} value={userInfo.current_status}/>
        </div>

        <div className={styles.buttonGroup}>
            <Button variant="primary" onClick={onEdit}>
                {BUTTON_TEXTS.editButton}
            </Button>
            <Button variant="danger" onClick={onSignOut}>
                {BUTTON_TEXTS.signOutButton}
            </Button>
        </div>
    </div>
);

export default ProfileView;
