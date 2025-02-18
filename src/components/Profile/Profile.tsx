import React, {FC} from 'react';
import {ProfileProps} from '../../Interfaces/InterfaceForm.types';
import {UserProfile} from '../../Interfaces/InterfaceProfile.types';
import SignIn from '../../UI/SignIn/SignIn';
import SignUp from '../../UI/SignUp/SignUp';
import {USER_TEXTS} from '../../config/formConfigs';
import {useAuthHandlers} from '../../hooks/useAuthHandlers';
import {useProfileFormHandlers} from '../../hooks/useProfileFormHandlers';
import {useProfileHandlers} from '../../hooks/useProfileHandlers';
import styles from './Profile.module.css';
import ProfileChange from './ProfileChange/ProfileChange';
import ProfileView from './ProfileView/ProfileView';
import ProfileAuth from "./ProfileAuth/ProfileAuth";

const Profile: FC<ProfileProps> = () => {

    const {userProfile, handleUpdateProfile} = useProfileHandlers();

    const {
        isSign,
        setIsSign,
        handleSignIn,
        handleRegister,
        handleSignOut,
        authLoading,
        authError,
        formError
    } = useAuthHandlers();

    const {
        isEditing,
        editProfile,
        avatarPreview,
        setIsEditing,
        handleSave,
        handleInputChange,
        handleAvatarChange,
    } = useProfileFormHandlers(userProfile || ({} as UserProfile));

    const error = formError || (authError ? authError.message : null);
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
                <>
                    <ProfileAuth isSign={isSign} setIsSign={setIsSign}/>
                    {isSign ? (
                        <SignUp onSignUp={handleRegister} error={error} loading={authLoading}/>
                    ) : (
                        <SignIn onSignIn={handleSignIn} error={error} loading={authLoading}/>
                    )}
                </>
            )}
        </section>
    );
};

export default Profile;
