import React from 'react';
import {Button, ImagePreview, ImageUploader, RenderInput} from '@ui';
import styles from './ProfileChange.module.css';
import {useTranslation} from "react-i18next";
import {UserChangeProps} from "@features/profile/props/Profile.props";

const ProfileChange: React.FC<UserChangeProps> = (
    {onSave, onCancel, editProfile, avatarPreview, handleInputChange, handleAvatarChange}
) => {
    const {t} = useTranslation('profile');

    return (
        <div className={styles.editForm}>
            <RenderInput
                label={t('row.firstName')}
                name='first_name'
                value={editProfile.first_name || ""}
                onChange={handleInputChange}
                isLoading={false}
                type="text"
                placeholder=''
            />
            <RenderInput
                label={t('row.lastName')}
                name='last_name'
                value={editProfile.last_name || ""}
                onChange={handleInputChange}
                isLoading={false}
                type="text"
                placeholder=''
            />
            <RenderInput
                label={t('row.avatar')}
                name='avatar'
                value={editProfile.avatar || ""}
                onChange={handleInputChange}
                isLoading={false}
                type="text"
                placeholder=''
            />
            <div className={styles.avatarContainer}>
                <ImageUploader onChange={handleAvatarChange}/>
                {avatarPreview && <ImagePreview src={avatarPreview}/>}
            </div>
            <div className={styles.buttonGroup}>
                <Button type="submit" variant="primary" onClick={onSave}>
                    {t('button.saveProfile')}
                </Button>
                <Button variant="secondary" onClick={onCancel}>
                    {t('button.cancelProfile')}
                </Button>
            </div>
        </div>
    );
};

export default ProfileChange;
