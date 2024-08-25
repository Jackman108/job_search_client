// src/components/User/Avatar.tsx
import { FC } from 'react';
import styles from './Avatar.module.css';
import { AvatarProps } from '../../Interfaces/InterfaceProfile.types';
import { DEFAULT_AVATAR_URL } from '../../config/formConfigs';

const Avatar: FC<AvatarProps> = ({ src, alt = 'User Avatar', className }) => {
  const avatarUrl = src || DEFAULT_AVATAR_URL;

  return <img src={avatarUrl} alt={alt} className={`${styles.avatar} ${className}`} />;
};

export default Avatar;
