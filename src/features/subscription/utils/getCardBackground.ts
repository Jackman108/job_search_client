import {SUBSCRIPTION_TYPES} from "@entities/subscription";

export const getCardBackground = (subscriptionType: string) => {
    switch (subscriptionType) {
        case SUBSCRIPTION_TYPES.DAILY:
            return {background: 'linear-gradient(145deg, #275795, #1a365d)'};
        case SUBSCRIPTION_TYPES.WEEKLY:
            return {background: 'linear-gradient(145deg, #C0C0C0, #A9A9A9)'};
        case SUBSCRIPTION_TYPES.MONTHLY:
            return {background: 'linear-gradient(145deg, #000000, #333333)'};
        default:
            return {background: 'linear-gradient(145deg, #275795, #1a365d)'};
    }
};