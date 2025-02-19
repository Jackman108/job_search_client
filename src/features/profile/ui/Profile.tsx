import React, {FC} from 'react';
import {UserProfile} from '@features/profile/types/InterfaceProfile.types';
import {useAuthHandlers} from '@features/auth/hooks/useAuthHandlers';
import {useProfileFormHandlers} from '@features/profile/hooks/useProfileFormHandlers';
import {useProfileHandlers} from '@features/profile/hooks/useProfileHandlers';
import styles from '@features/profile/ui/Profile.module.css';
import ProfileChange from '@features/profile/ui/ProfileChange/ProfileChange';
import ProfileView from '@features/profile/ui/ProfileView/ProfileView';
import {USER_TEXTS} from "@features/profile/config/profileConfigs";
import Auth from "@features/auth/ui/Auth";
import {PanelProps} from "@shared/types/Component.types";


const Profile: FC<PanelProps> = () => {
    const {userProfile, handleUpdateProfile} = useProfileHandlers();
    const {handleSignOut} = useAuthHandlers();

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
                    <h2>{USER_TEXTS.profileTitle}</h2>
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

export default Profile;
