// src/components/User/AvatarUploader.tsx
import { FC } from 'react';
import { ImageUploaderProps } from '../../Interfaces/InterfaceComponent.types';
import styles from './ImageUploader.module.css';

const ImageUploader: FC<ImageUploaderProps> = ({ onChange }) => (
  <div className={styles.uploaderContainer}>
    <input
      id="avatarFile"
      type="file"
      name="avatarFile"
      accept="image/*"
      onChange={onChange}
      className={styles.fileInput}
    />
    <label htmlFor="avatarFile" className={styles.fileLabel}>
      Выберите изображение
    </label>
  </div>
);

export default ImageUploader;
