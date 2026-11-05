export interface UserProfile {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    balance: number;
    spin_count: number;
    successful_responses_count: number;
    current_status: string;
    user_id: string | number;
    updated_at: string | Date;
}