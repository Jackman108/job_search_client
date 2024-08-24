// src/components/User/Avatar.tsx
import React from 'react';
import styles from './Avatar.module.css';
import { AvatarProps } from '../../Interfaces/InterfaceProfile.types';

const DEFAULT_AVATAR_URL = 'https://polinka.top/uploads/posts/2023-06/1686471538_polinka-top-p-kartinka-dlya-profilya-muzhskoi-vkontakte-17.jpg';

const Avatar: React.FC<AvatarProps> = ({ src, alt = 'User Avatar', className }) => {
  const avatarUrl = src || DEFAULT_AVATAR_URL;

  return <img src={avatarUrl} alt={alt} className={`${styles.avatar} ${className}`} />;
};

export default Avatar;
