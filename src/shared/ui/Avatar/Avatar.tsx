import { FC } from 'react';
import { AvatarProps } from '@shared/types/Component.types';
import styles from './Avatar.module.css';
import {DEFAULT_AVATAR_URL} from "@config/defaultConfig";

const Avatar: FC<AvatarProps> = ({ src, alt = 'User Avatar', className }) => {
  const avatarUrl = src || DEFAULT_AVATAR_URL;

  return <img src={avatarUrl} alt={alt} className={`${styles.avatar} ${className}`} />;
};

export default Avatar;
