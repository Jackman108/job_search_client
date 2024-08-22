// src/components/Profile/Profile.tsx

import React, { FC, useCallback, useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { ProfileProps } from '../../Interfaces/Interface.types';
import useFetchAuth from '../../hooks/useFetchAuth';
import User from '../../UI/User/User';
import SignIn from '../../UI/SignIn/SignIn';
import SignUp from '../../UI/SignUp/SignUp';
import { UserProfile } from '../../Interfaces/InterfaceProfile.types';
import useFetchUserProfile from '../../hooks/useFetchUserProfile';

const Profile: FC<ProfileProps> = ({ onClose, isOpen }) => {
  const { login, register, logout, error, loading } = useFetchAuth();
  const { userProfile, fetchUserProfile, error: profileError, loading: profileLoading } = useFetchUserProfile();
  const [isSign, setIsSign] = useState<boolean>(true);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile === null) {
      fetchUserProfile();
    }
  }, [fetchUserProfile, userProfile]);

  const handleSignIn = useCallback(async (email: string, password: string) => {
    setFormError(null);
    try {
      await login(email, password);
      
    } catch {
      setFormError('Ошибка при входе: неверный email или пароль');
    }
  }, [login]);

  const handleRegister = useCallback(async (email: string, password: string, passwordRepeat: string) => {
    setFormError(null);
    try {
      await register(email, password, passwordRepeat);      
    } catch {
      setFormError('Ошибка при регистрации: проверьте правильность введенных данных');
    }
  }, [register, fetchUserProfile]);

  const handleSignOut = useCallback(() => {
    logout();
    onClose();
    setFormError(null);
  }, [logout]);

  const handleUpdateProfile = useCallback(async (updatedProfile: UserProfile) => {
    try {
      await fetchUserProfile();
    } catch {
      setFormError('Ошибка обновления профиля');
    }
  }, [fetchUserProfile]);

  useEffect(() => {
    if (profileError) {
      setFormError(profileError);
    }
  }, [profileError]);

  return (
    <section className={styles.sectionContainer}>
      <button className={styles.closeButton} onClick={onClose}>
        Закрыть
      </button>
      {userProfile ? (
        <User
          userInfo={userProfile}
          onSignOut={handleSignOut}
          onUpdateProfile={handleUpdateProfile}
        />
      ) : (
        <>
          <div className={styles.tabContainer}>
            <button
              className={`${styles.tab} ${!isSign ? styles.activeTab : ''}`}
              onClick={() => setIsSign(false)}
            >
              Вход
            </button>
            <button
              className={`${styles.tab} ${isSign ? styles.activeTab : ''}`}
              onClick={() => setIsSign(true)}
            >
              Регистрация
            </button>
          </div>
          {isSign ? (
            <SignUp onSignUp={handleRegister} error={error} loading={loading} />
          ) : (
            <SignIn onSignIn={handleSignIn} error={error} loading={loading} />
          )}
          {formError && <p>{formError}</p>}

        </>
      )}
    </section>
  );
};

export default React.memo(Profile);
