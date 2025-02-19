import React from 'react';
import AuthSwitch from "@features/auth/ui/AuthSwitch/AuthSwitch";
import SignUp from "@features/auth/ui/SignUp/SignUp";
import SignIn from "@features/auth/ui/SignIn/SignIn";
import {useAuthHandlers} from "@features/auth/hooks/useAuthHandlers";

const Auth: React.FC = () => {
    const {
        isSign,
        setIsSign,
        handleSignIn,
        handleRegister,
        authLoading: loading,
        authError,
        formError,
    } = useAuthHandlers();

    const error = formError || (authError ? authError.message : null);
    return (
        <div>
            <AuthSwitch isSign={isSign} setIsSign={setIsSign}/>
            {isSign ? (
                <SignUp onSignUp={handleRegister} error={error} loading={loading}/>
            ) : (
                <SignIn onSignIn={handleSignIn} error={error} loading={loading}/>
            )}
        </div>
    );
};

export default Auth;