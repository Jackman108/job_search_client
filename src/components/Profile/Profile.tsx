import { FC } from 'react';
import styles from './Profile.module.css'; // Создайте соответствующий CSS файл
import { ProfileProps } from '../../Interfaces/Interface.types';

const Profile: FC<ProfileProps> = ({ onClose, isOpen }) => {
  return (
    <section className={styles.sectionContainer}>
      <button className={styles.closeButton} onClick={onClose}>
        Закрыть
      </button>
      <h2>Профиль</h2>
      {/* Добавьте содержимое профиля здесь */}
    </section>
  );
};

export default Profile;
