// src/components/User/AvatarUploader.tsx
import React from 'react';
import { ImageUploaderProps } from '../../Interfaces/InterfaceProfile.types';

const ImageUploader: React.FC<ImageUploaderProps> = ({ onChange }) => (
  <input
    type="file"
    name="avatarFile"
    accept="image/*"
    onChange={onChange}
  />
);

export default ImageUploader;
