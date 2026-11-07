import { FC, ReactNode } from 'react';
import { UnauthorizedMessage } from '@ui';
import { useAuthSession } from '@features/auth';
import type { AccessLevel } from '@utils';

interface RequireAccessProps {
    access: AccessLevel;
    children: ReactNode;
}

const RequireAccess: FC<RequireAccessProps> = ({ access, children }) => {
    const { canAccess } = useAuthSession();

    if (!canAccess(access)) {
        return <UnauthorizedMessage />;
    }

    return <>{children}</>;
};

export default RequireAccess;
