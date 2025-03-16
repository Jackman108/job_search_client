import React, {FC} from 'react';
import {useAuthHandlers} from '@features/auth/hooks/useAuthHandlers';
import {useProfileFormHandlers} from '@features/profile/hooks/useProfileFormHandlers';
import {useProfileHandlers} from '@features/profile/hooks/useProfileHandlers';
import styles from '@shared/styles/Container.module.css';
import ProfileChange from '@features/profile/ui/ProfileChange/ProfileChange';
import ProfileView from '@features/profile/ui/ProfileView/ProfileView';
import Auth from "@features/auth/ui/Auth";
import {PanelProps} from "@type";
import {UserProfile} from "@entities/profile";
import {useTranslation} from "react-i18next";


const ProfileButton: FC<PanelProps> = () => {
    const {userProfile, handleUpdateProfile} = useProfileHandlers();
    const {handleSignOut} = useAuthHandlers();
    const {t} = useTranslation('profile');

    const {
        isEditing,
        editProfile,
        avatarPreview,
        setIsEditing,
        handleSave,
        handleInputChange,
        handleAvatarChange,
    } = useProfileFormHandlers(userProfile || ({} as UserProfile));

    return (
        <section className={styles.sectionContainer}>
            {userProfile ? (
                <div className={styles.userContainer}>
                    <h2>{t('row.profileTitle')}</h2>
                    {isEditing ? (
                        <ProfileChange
                            onSave={() => handleSave(handleUpdateProfile)}
                            onCancel={() => setIsEditing(false)}
                            editProfile={editProfile}
                            avatarPreview={avatarPreview}
                            handleInputChange={handleInputChange}
                            handleAvatarChange={handleAvatarChange}
                        />
                    ) : (
                        <ProfileView
                            userInfo={userProfile}
                            onEdit={() => setIsEditing(true)}
                            onSignOut={handleSignOut}
                        />
                    )}
                </div>
            ) : (
                <Auth/>
            )}
        </section>
    );
};

export default ProfileButton;
