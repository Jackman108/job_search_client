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


const Profile: FC<ProfileProps> = ({ onClose, isOpen }) => {
  const { login, register, logout, error, loading, currentUser, fetchUserProfile } = useFetchAuth();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token'));
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

  const handleUpdateProfile = useCallback((updatedProfile: UserProfile) => {
    // логика для обновления профиля
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && currentUser?.email) {
      fetchUserProfile(currentUser.email, token);
    }
  }, [currentUser, fetchUserProfile]);

  const renderAuthContent = () => (
    <>
      {isSignUp ? (
        <SignUp onSignUp={handleRegister} error={error} loading={loading} />
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
          {currentUser ? (
            <User 
              userInfo={currentUser}
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
