// src/components/User/UserChange.tsx
import React from 'react';
import { UserChangeProps } from '../../types/InterfaceProfile.types';
import Button from '@ui/Button/Button';
import ImagePreview from '@ui/ImagePreview/ImagePreview';
import ImageUploader from '@ui/ImageUploader/ImageUploader';
import RenderInput from '@ui/RenderInput/RenderInput';
import styles from './ProfileChange.module.css';
import {BUTTON_TEXTS, USER_TEXTS} from "@features/profile/config/profileConfigs";

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
        name='first_name'
        value={editProfile.first_name || ""}
        onChange={handleInputChange}
        isLoading={false}
        type="text"
        placeholder=''
      />
      <RenderInput
        label={USER_TEXTS.lastNameLabel}
        name='last_name'
        value={editProfile.last_name || ""}
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
