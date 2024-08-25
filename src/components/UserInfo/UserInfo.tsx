// src/components/User/ProfileInfo.tsx
import React from 'react';
import styles from './UserInfo.module.css';
import { UserInfoProps } from '../../Interfaces/InterfaceProfile.types';
import Button from '../../UI/Button/Button';
import { USER_TEXTS, BUTTON_TEXTS } from '../../config/formConfigs';
import Avatar from '../../UI/Avatar/Avatar';
import RenderRow from '../../UI/RenderRow/RenderRow';

const UserInfo: React.FC<UserInfoProps> = ({ userInfo, onEdit, onSignOut }) => (
  <div className={styles.profileInfo}>
    <Avatar src={userInfo.avatar} className={styles.avatar} />
    
    <div className={styles.infoContainer}>
      <RenderRow label={USER_TEXTS.firstNameLabel} value={userInfo.firstName} />
      <RenderRow label={USER_TEXTS.lastNameLabel} value={userInfo.lastName} />
      <RenderRow label={USER_TEXTS.balanceLabel} value={userInfo.balance} />
      <RenderRow label={USER_TEXTS.spinCountLabel} value={userInfo.spinCount} />
      <RenderRow label={USER_TEXTS.successfulResponsesLabel} value={userInfo.successfulResponsesCount} />
      <RenderRow label={USER_TEXTS.currentStatusLabel} value={userInfo.currentStatus} />
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

export default UserInfo;