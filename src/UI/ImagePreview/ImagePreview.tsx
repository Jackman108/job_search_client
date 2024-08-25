// src/components/User/AvatarPreview.tsx
import React from 'react';
import styles from './ImagePreview.module.css';
import { ImagePreviewProps } from '../../Interfaces/InterfaceProfile.types';

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt = "Avatar Preview" }) => (
  <div className={styles.previewContainer}>
    <img src={src} alt={alt} className={styles.avatarPreview} />
  </div>
);

export default ImagePreview;
