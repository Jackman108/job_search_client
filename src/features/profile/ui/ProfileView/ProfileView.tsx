// src/components/User/ProfileInfo.tsx
import React from 'react';
import {UserInfoProps} from '../../types/InterfaceProfile.types';
import Avatar from '@ui/Avatar/Avatar';
import Button from '@ui/Button/Button';
import RenderRow from '@ui/RenderRow/RenderRow';
import styles from './ProfileView.module.css';
import {USER_TEXTS, BUTTON_TEXTS} from "@features/profile/config/profileConfigs";

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
