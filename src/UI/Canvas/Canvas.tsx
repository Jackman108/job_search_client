import React from 'react';
import styles from './Canvas.module.css';

const cornersClasses = [
    'is-large', 
    'is-medium', 
    'is-small'
];
const circlesClasses = [
  'is-first',
  'is-second',
  'is-third',
  'is-fourth',
  'is-fifth',
  'is-sixth',
  'is-seventh',
  'is-eighth',
];

const Canvas: React.FC = () => {
  return (
    <div className={styles.wrapper}>
    <div className={styles.canvas}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
        <div className={styles.ninth} key={index}>
          <div className={styles.cornersWrapper}>
            {cornersClasses.map((cornerClass, idx) => (
              <div className={`${styles.corner} ${styles[cornerClass]}`} key={idx}></div>
            ))}
          </div>
        </div>
      ))}
      <div className={styles.ninth}></div>
      {circlesClasses.map((circleClass, idx) => (
        <div className={`${styles.circle} ${styles[circleClass]}`} key={idx}></div>
      ))}
      <div className={styles.meetingPoint}></div>
    </div>
    </div>
  );
};

export default Canvas;
