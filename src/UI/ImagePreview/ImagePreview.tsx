// src/components/User/AvatarPreview.tsx
import React from 'react';
import styles from './ImagePreview.module.css';
import { ImagePreviewProps } from '../../Interfaces/InterfaceProfile.types';

const AvatarPreview: React.FC<ImagePreviewProps> = ({ src, alt = "Avatar Preview" }) => (
  <img src={src} alt={alt} className={styles.avatarPreview} />
);

export default AvatarPreview;
