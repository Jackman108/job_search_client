import React, { FC } from 'react';
import { ProfileProps } from '../../Interfaces/InterfaceForm.types';
import { UserProfile } from '../../Interfaces/InterfaceProfile.types';
import Button from '../../UI/Button/Button';
import SignIn from '../../UI/SignIn/SignIn';
import SignUp from '../../UI/SignUp/SignUp';
import { FORM_BUTTONS, USER_TEXTS } from '../../config/formConfigs';
import { useProfileHandlers } from '../../hooks/useProfileHandlers';
import { useUserHandlers } from '../../hooks/useUserHandlers';
import UserChange from '../UserChange/UserChange';
import UserInfo from '../UserInfo/UserInfo';
import styles from './Profile.module.css';

const Profile: FC<ProfileProps> = () => {
  const {
    userProfile,
    isSign,
    setIsSign,
    formError,
    handleSignIn,
    handleRegister,
    handleSignOut,
    handleUpdateProfile,
    authLoading,
    authError,
  } = useProfileHandlers();

  const {
    isEditing,
    setIsEditing,
    handleSave,
    editProfile,
    avatarPreview,
    handleInputChange,
    handleAvatarChange,
  } = useUserHandlers(userProfile || {} as UserProfile);

  return (
    <section className={styles.sectionContainer}>
      {userProfile ? (
        <div className={styles.userContainer}>
          <h2>{USER_TEXTS.profileTitle}</h2>
          {isEditing ? (
            <UserChange
              userInfo={userProfile}
              onSave={() => handleSave(handleUpdateProfile)}
              onCancel={() => setIsEditing(false)}
              editProfile={editProfile}
              avatarPreview={avatarPreview}
              handleInputChange={handleInputChange}
              handleAvatarChange={handleAvatarChange}
              handleSave={handleSave}
            />
          ) : (
            <UserInfo
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
