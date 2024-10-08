// src/components/SignOut.tsx

import React from 'react';
import useFetchAuth from '../../hooks/useFetchAuth';

const SignOut: React.FC = () => {
  const { logout } = useFetchAuth();

  const handleSignOut = () => {
    logout();
  };

  return <button onClick={handleSignOut}>Выйти</button>;
};

export default SignOut;
