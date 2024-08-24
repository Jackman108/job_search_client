// src/components/User/ProfileInfo.tsx
import React from 'react';
import styles from '../User/User.module.css';
import { UserInfoProps } from '../../Interfaces/InterfaceProfile.types';
import Button from '../../UI/Button/Button';
import { USER_TEXTS, BUTTON_TEXTS } from '../../config/formConfigs';
import Avatar from '../../UI/Avatar/Avatar';



const UserInfo: React.FC<UserInfoProps> = ({ userInfo, onEdit, onSignOut }) => (
  <div className={styles.profileInfo}>
    <Avatar src={userInfo.avatar} />
    <p><strong>{USER_TEXTS.firstNameLabel}:</strong> {userInfo.firstName}</p>
    <p><strong>{USER_TEXTS.lastNameLabel}:</strong> {userInfo.lastName}</p>
    <p><strong>{USER_TEXTS.balanceLabel}:</strong> {userInfo.balance}</p>
    <p><strong>{USER_TEXTS.spinCountLabel}:</strong> {userInfo.spinCount}</p>
    <p><strong>{USER_TEXTS.successfulResponsesLabel}:</strong> {userInfo.successfulResponsesCount}</p>
    <p><strong>{USER_TEXTS.currentStatusLabel}:</strong> {userInfo.currentStatus}</p>

    <Button variant="primary" onClick={onEdit}>
      {BUTTON_TEXTS.editButton}
    </Button>
    <Button variant="danger" onClick={onSignOut}>
      {BUTTON_TEXTS.signOutButton}
    </Button>
  </div>
);

export default UserInfo;
