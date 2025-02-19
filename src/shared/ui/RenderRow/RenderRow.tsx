import React from 'react';
import styles from './RenderRow.module.css';
import {RenderRowProps} from "@shared/types/Form.types";

const RenderRow: React.FC<RenderRowProps> = ({ label, value }) => (
  <p className={styles.infoRow}>
    <strong>{label}:</strong> {value}
  </p>
);

export default RenderRow;
