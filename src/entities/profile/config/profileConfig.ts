import {ConfigItem} from "@type";

export const profileConfig: Record<string, ConfigItem> = {
    profile: {
        title: 'Profile',
        apiEndpoint: '/profile',
        fields: {
            id: 'ID',
            first_name: 'First Name',
            last_name: 'Last Name',
            avatar: 'Avatar',
            balance: 'Balance',
            spin_count: 'Spin Count',
            successful_responses_count: 'Successful Responses Count',
            current_status: 'Current Status',
            user_id: 'User ID',
            updated_at: 'Updated At',
        },
    },
};