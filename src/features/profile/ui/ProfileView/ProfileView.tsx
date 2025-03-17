import React from 'react';
import {Avatar, Button, RenderRow} from '@ui';
import styles from './ProfileView.module.css';
import {useTranslation} from "react-i18next";
import {UserInfoProps} from "@features/profile/props/Profile.props";

const ProfileView: React.FC<UserInfoProps> = ({userInfo, onEdit, onSignOut}) => {
    const {t} = useTranslation('profile');

    return (
        <div className={styles.profileInfo}>
            <Avatar src={userInfo.avatar} className={styles.avatar}/>

            <div className={styles.infoContainer}>
                <RenderRow label={t('row.firstName')} value={userInfo.first_name}/>
                <RenderRow label={t('row.lastName')} value={userInfo.last_name}/>
                <RenderRow label={t('row.balance')} value={userInfo.balance}/>
                <RenderRow label={t('row.spinCount')} value={userInfo.spin_count}/>
                <RenderRow label={t('row.successfulResponses')} value={userInfo.successful_responses_count}/>
                <RenderRow label={t('row.currentStatus')} value={userInfo.current_status}/>
            </div>

            <div className={styles.buttonGroup}>
                <Button variant="primary" onClick={onEdit}>
                    {t('button.editProfile')}
                </Button>
                <Button variant="danger" onClick={onSignOut}>
                    {t('button.signOut')}
                </Button>
            </div>
        </div>
    );
}
export default ProfileView;
