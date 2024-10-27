// src/components/User/UserChange.tsx
import React from 'react';
import { UserChangeProps } from '../../../Interfaces/InterfaceProfile.types';
import Button from '../../../UI/Button/Button';
import ImagePreview from '../../../UI/ImagePreview/ImagePreview';
import ImageUploader from '../../../UI/ImageUploader/ImageUploader';
import RenderInput from '../../../UI/RenderInput/RenderInput';
import { BUTTON_TEXTS, USER_TEXTS } from '../../../config/formConfigs';
import styles from '../ProfileChange/ProfileChange.module.css';

const ProfileChange: React.FC<UserChangeProps> = ({
  onSave,
  onCancel,
  editProfile,
  avatarPreview,
  handleInputChange,
  handleAvatarChange
}) => {

  return (
    <div className={styles.editForm}>
      <RenderInput
        label={USER_TEXTS.firstNameLabel}
        name='firstName'
        value={editProfile.firstName || ""}
        onChange={handleInputChange}
        isLoading={false}
        type="text"
        placeholder=''
      />
      <RenderInput
        label={USER_TEXTS.lastNameLabel}
        name='lastName'
        value={editProfile.lastName || ""}
        onChange={handleInputChange}
        isLoading={false}
        type="text"
        placeholder=''
      />
      <RenderInput
        label={USER_TEXTS.avatarLabel}
        name='avatar'
        value={editProfile.avatar || ""}
        onChange={handleInputChange}
        isLoading={false}
        type="text"
        placeholder=''
      />
      <div className={styles.avatarContainer}>
        <ImageUploader onChange={handleAvatarChange} />
        {avatarPreview && <ImagePreview src={avatarPreview} />}
      </div>
      <div className={styles.buttonGroup}>
        <Button type="submit" variant="primary" onClick={onSave}>
          {BUTTON_TEXTS.saveButton}
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          {BUTTON_TEXTS.cancelButton}
        </Button>
      </div>
    </div>
  );
};

export default ProfileChange;
