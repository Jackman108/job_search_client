import React from 'react';
import styles from './User.module.css';
import { UserProps } from '../../Interfaces/InterfaceProfile.types';
import { USER_TEXTS } from '../../config/formConfigs';
import { useUserHandlers } from '../../hooks/useUserHandlers';
import UserChange from '../UserChange/UserChange';
import UserInfo from '../UserInfo/UserInfo';
const User: React.FC<UserProps> = ({ userInfo, onSignOut, onUpdateProfile }) => {
  const {
    isEditing,
    setIsEditing,
    handleSave,
    editProfile,
    avatarPreview,
    handleInputChange,
    handleAvatarChange,
  } = useUserHandlers(userInfo);

  return (
    <div className={styles.userContainer}>
      <h2>{USER_TEXTS.profileTitle}</h2>
      {isEditing ? (
        <UserChange
        userInfo={userInfo}
        onSave={() => handleSave(onUpdateProfile)}
        onCancel={() => setIsEditing(false)}
        editProfile={editProfile}
        avatarPreview={avatarPreview}
        handleInputChange={handleInputChange}
        handleAvatarChange={handleAvatarChange}
        handleSave={handleSave}
        />
      ) : (
        <UserInfo
          userInfo={userInfo}
          onEdit={() => setIsEditing(true)}
          onSignOut={onSignOut}
        />
      )}
    </div>
  );
};

export default User;
