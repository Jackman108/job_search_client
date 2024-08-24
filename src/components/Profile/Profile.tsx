import React, { FC } from 'react';
import styles from './Profile.module.css';
import User from '../User/User';
import SignIn from '../../UI/SignIn/SignIn';
import SignUp from '../../UI/SignUp/SignUp';
import { useProfileHandlers } from '../../hooks/useProfileHandlers';
import Button from '../../UI/Button/Button';
import {FORM_BUTTONS} from '../../config/formConfigs';
import { ProfileProps } from '../../Interfaces/InterfaceProfile.types';

const Profile: FC<ProfileProps> = ({ onClose }) => {
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

  return (
    <section className={styles.sectionContainer}>
      {userProfile ? (
        <User
          userInfo={userProfile}
          onSignOut={handleSignOut}
          onUpdateProfile={handleUpdateProfile}
        />
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
          {formError && <p className={styles.error}>{formError}</p>}
        </>
      )}
    </section>
  );
};

export default React.memo(Profile);
