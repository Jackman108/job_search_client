// src/components/SignOut.tsx

import React from 'react';
import useFetchAuth from '../../hooks/fetch/useFetchAuth';

const SignOut: React.FC = () => {
  const { logout } = useFetchAuth();

  const handleSignOut = () => {
    logout();
  };

  return <button onClick={handleSignOut}>Выйти</button>;
};

export default SignOut;
