import React, { useState } from 'react';
import styles from './User.module.css';
import { UserProfile, UserProps } from '../../Interfaces/InterfaceProfile.types';


const User: React.FC<UserProps> = ({ userInfo, onSignOut, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState<UserProfile>(userInfo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditProfile({
      ...editProfile,
      [name]: value,
    });
  };

  const handleSave = () => {
    onUpdateProfile(editProfile);
    setIsEditing(false);
  };

  return (
    <div className={styles.userContainer}>
      <h2>Профиль</h2>
      {isEditing ? (
        <div className={styles.editForm}>
          <label>
            Имя:
            <input
              type="text"
              name="firstName"
              value={editProfile.firstName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Фамилия:
            <input
              type="text"
              name="lastName"
              value={editProfile.lastName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={editProfile.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Баланс:
            <input
              type="number"
              name="balance"
              value={editProfile.balance}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Текущий статус:
            <input
              type="text"
              name="currentStatus"
              value={editProfile.currentStatus}
              onChange={handleInputChange}
            />
          </label>
          {/* Добавьте другие поля по необходимости */}
          <button onClick={handleSave} className={styles.saveButton}>Сохранить</button>
          <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>Отмена</button>
        </div>
      ) : (
        <div className={styles.profileInfo}>
          <p><strong>Имя:</strong> {userInfo.firstName}</p>
          <p><strong>Фамилия:</strong> {userInfo.lastName}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Баланс:</strong> {userInfo.balance}</p>
          <p><strong>Текущий статус:</strong> {userInfo.currentStatus}</p>
          {/* Отобразите другие поля по необходимости */}
          <button onClick={() => setIsEditing(true)} className={styles.editButton}>Редактировать</button>
          <button onClick={onSignOut} className={styles.signOutButton}>Выйти</button>
        </div>
      )}
    </div>
  );
};

export default User;
