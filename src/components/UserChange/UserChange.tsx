// src/components/User/UserChange.tsx
import React from 'react';
import styles from '../User/User.module.css';
import { UserChangeProps } from '../../Interfaces/InterfaceProfile.types';
import Button from '../../UI/Button/Button';
import { USER_TEXTS, BUTTON_TEXTS } from '../../config/formConfigs';
import RenderInput from '../../UI/RenderInput/RenderInput';
import AvatarPreview from '../../UI/ImagePreview/ImagePreview';
import AvatarUploader from '../../UI/ImageUploader/ImageUploader';
import { useUserHandlers } from '../../hooks/useUserHandlers';



const UserChange: React.FC<UserChangeProps> = ({ userInfo, onSave, onCancel }) => {
  const {
    editProfile,
    avatarPreview,
    handleInputChange,
    handleAvatarChange,
    handleSave,
  } = useUserHandlers(userInfo);
 
  return (
    <div className={styles.editForm}>
      <RenderInput
        label={USER_TEXTS.firstNameLabel}
        name='firstName'
        value={editProfile.firstName}
        onChange={handleInputChange}
        error={undefined} 
        isLoading={false}
        type="text"
        placeholder={USER_TEXTS.firstNamePlaceholder}
      />
      <RenderInput
        label={USER_TEXTS.lastNameLabel}
        name='lastName'
        value={editProfile.lastName}
        onChange={handleInputChange}
        error={undefined} 
        isLoading={false}
        type="text"
        placeholder={USER_TEXTS.lastNamePlaceholder}
      />
      <RenderInput
        label={USER_TEXTS.avatarLabel}
        name='avatar'
        value={editProfile.avatar}
        onChange={handleInputChange}
        error={undefined} 
        isLoading={false}
        type="text"
        placeholder={USER_TEXTS.avatarPlaceholder}
      />
      <AvatarUploader onChange={handleAvatarChange} />
      {avatarPreview && <AvatarPreview src={avatarPreview} />}
      <Button variant="primary"  onClick={() => handleSave(onSave)}>
        {BUTTON_TEXTS.saveButton}
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        {BUTTON_TEXTS.cancelButton}
      </Button>
    </div>
  );
};

export default UserChange;
