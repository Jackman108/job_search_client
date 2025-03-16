import {FC} from 'react';
import {ImageUploaderProps} from "@type";
import styles from './ImageUploader.module.css';
import {useTranslation} from "react-i18next";

const ImageUploader: FC<ImageUploaderProps> = ({onChange}) => {
    const {t} = useTranslation('profile');

    return (
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
                {t('button.selectImage')}
            </label>
        </div>
    )
};

export default ImageUploader;
