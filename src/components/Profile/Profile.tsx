import React, { FC } from 'react';
import { ProfileProps } from '../../Interfaces/InterfaceForm.types';
import { UserProfile } from '../../Interfaces/InterfaceProfile.types';
import Button from '../../UI/Button/Button';
import SignIn from '../../UI/SignIn/SignIn';
import SignUp from '../../UI/SignUp/SignUp';
import { FORM_BUTTONS, USER_TEXTS } from '../../config/formConfigs';
import { useAuthHandlers } from '../../hooks/useAuthHandlers';
import { useProfileFormHandlers } from '../../hooks/useProfileFormHandlers';
import { useProfileHandlers } from '../../hooks/useProfileHandlers';
import styles from './Profile.module.css';
import ProfileChange from './ProfileChange/ProfileChange';
import ProfileView from './ProfileView/ProfileView';

const Profile: FC<ProfileProps> = () => {
 
  const {  
    userProfile,
    handleUpdateProfile,
  } = useProfileHandlers();

  const {
    isSign,
    setIsSign,
    handleSignIn,
    handleRegister,
    handleSignOut,
    authLoading,
    authError,
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

  console.log(userProfile)
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
          <div className={styles.tabContainer}>
            <Button
              className={`${styles.tab} ${!isSign ? styles.activeTab : ''}`}
              onClick={() => setIsSign(false)}
              variant="primary"
              disabled={!isSign}
            >
              {FORM_BUTTONS.SignInButton}
            </Button>
            <Button
              className={`${styles.tab} ${isSign ? styles.activeTab : ''}`}
              onClick={() => setIsSign(true)}
              variant="danger"
              disabled={isSign}
            >
              {FORM_BUTTONS.SignUpButton}
            </Button>
          </div>
          {isSign ? (
            <SignUp onSignUp={handleRegister} error={authError} loading={authLoading} />
          ) : (
            <SignIn onSignIn={handleSignIn} error={authError} loading={authLoading} />
          )}          
        </>
      )}
    </section>
  );
};

export default React.memo(Profile);
