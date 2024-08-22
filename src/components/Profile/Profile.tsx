// src/components/Profile/Profile.tsx

import React, { FC, useCallback, useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { ProfileProps } from '../../Interfaces/Interface.types';
import useFetchAuth from '../../hooks/useFetchAuth';
import User from '../../UI/User/User';
import SignIn from '../../UI/SignIn/SignIn';
import SignUp from '../../UI/SignUp/SignUp';
import SignOut from '../../UI/SignOut/SignOut';
import { UserProfile } from '../../Interfaces/InterfaceProfile.types';
import useFetchUserProfile from '../../hooks/useFetchUserProfile';

const Profile: FC<ProfileProps> = ({ onClose, isOpen }) => {
  const { login, register, logout, error, loading } = useFetchAuth();
  const { userProfile, fetchUserProfile, loading: profileLoading, error: profileError } = useFetchUserProfile();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!userProfile);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSignIn = useCallback(async (email: string, password: string) => {
    setFormError(null);
    try {
      await login(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      setFormError('Ошибка при входе: неверный email или пароль');
    }
  }, [login]);

  const handleRegister = useCallback(async (email: string, password: string, passwordRepeat: string) => {
    setFormError(null);
    try {
      await register(email, password, passwordRepeat);
      setIsLoggedIn(true);
    } catch (error) {
      setFormError('Ошибка при регистрации: проверьте правильность введенных данных');
    }
  }, [register]);

  const handleSignOut = useCallback(() => {
    logout();
    setIsLoggedIn(false);
  }, [logout]);

  const handleUpdateProfile = useCallback(async (updatedProfile: UserProfile) => {
    try {
      //await updateUserProfile(updatedProfile);
      fetchUserProfile();
    } catch (error) {
      setFormError('Ошибка обновления профиля');
    }
  }, [fetchUserProfile]);


  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn, fetchUserProfile]);

  useEffect(() => {
    if (profileError) {
      setFormError(profileError);
    }
  }, [profileError]);

  const renderAuthContent = () => (
    <>
      {isSignUp ? (
        <>
          <SignUp onSignUp={handleRegister} error={error} loading={loading} />
          <div>{localStorage.getItem('token')}</div>
        </>
      ) : (
        <SignIn onSignIn={handleSignIn} error={error} loading={loading} />
      )}
      {formError && <p>{formError}</p>}
    </>
  );
  return (
    <section className={styles.sectionContainer}>
      <button className={styles.closeButton} onClick={onClose}>
        Закрыть
      </button>
      {isLoggedIn ? (
        <>
          {userProfile ? (
            <User
              userInfo={userProfile}
              onSignOut={handleSignOut}
              onUpdateProfile={handleUpdateProfile}
            />
          ) : (
            <p>Загрузка данных...</p>
          )}
          <SignOut />
        </>
      ) : (
        <>
          <div className={styles.tabContainer}>
            <button
              className={`${styles.tab} ${!isSignUp ? styles.activeTab : ''}`}
              onClick={() => setIsSignUp(false)}
            >
              Вход
            </button>
            <button
              className={`${styles.tab} ${isSignUp ? styles.activeTab : ''}`}
              onClick={() => setIsSignUp(true)}
            >
              Регистрация
            </button>
          </div>
          {renderAuthContent()}
        </>
      )}
    </section>
  );
};

export default React.memo(Profile);
