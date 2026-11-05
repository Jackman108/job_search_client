import React, {FC} from 'react';
import {useAuthHandlers} from '@features/auth/hooks/useAuthHandlers';
import {useProfileForm} from '@features/profile/hooks/useProfileForm';
import {useProfile} from '@features/profile/hooks/useProfile';
import styles from '@shared/styles/Container.module.css';
import ProfileChange from '@features/profile/ui/ProfileChange/ProfileChange';
import ProfileView from '@features/profile/ui/ProfileView/ProfileView';
import Auth from "@features/auth/ui/Auth";
import {PanelProps} from "@type";
import {UserProfile} from "@entities/profile";
import {useTranslation} from "react-i18next";
import {LoadingOrError} from "@ui";

const ProfileSection: FC<PanelProps> = () => {
    const {handleSignOut} = useAuthHandlers();
    const {t} = useTranslation('profile');
    const {userProfile, handleUpdateProfile, profileLoading, profileError} = useProfile();
    const {
        isEditing,
        editProfile,
        avatarPreview,
        setIsEditing,
        handleCancel,
        handleInputChange,
        handleAvatarChange,
        handleSave,
    } = useProfileForm(userProfile || ({} as UserProfile));

    return (
        <section className={styles.sectionContainer}>
            {userProfile ? (
                <div className={styles.userContainer}>
                    <h2>{t('row.profileTitle')}</h2>
                    {isEditing ? (
                        <ProfileChange
                            onSave={() => handleSave(handleUpdateProfile)}
                            onCancel={handleCancel}
                            editProfile={editProfile}
                            avatarPreview={avatarPreview}
                            handleInputChange={handleInputChange}
                            handleAvatarChange={handleAvatarChange}
                        />
                    ) : (
                        <ProfileView
                            userInfo={userProfile}
                            onEdit={setIsEditing}
                            onSignOut={handleSignOut}
                        />
                    )}
                    <LoadingOrError loading={profileLoading} error={profileError} t={t}/>

                </div>
            ) : (
                <Auth/>
            )}
        </section>
    );
};

export default ProfileSection;
