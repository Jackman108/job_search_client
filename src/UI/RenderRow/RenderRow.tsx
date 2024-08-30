import React from 'react';
import { RenderRowProps } from '../../Interfaces/InterfaceForm.types';
import styles from './RenderRow.module.css';

const RenderRow: React.FC<RenderRowProps> = ({ label, value }) => (
  <p className={styles.infoRow}>
    <strong>{label}:</strong> {value}
  </p>
);

export default RenderRow;
