import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function VerifyEmail() {
    const { token } = useParams();
    const history = useHistory();

    useEffect(() => {
        const verifyEmail = async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/auth/verify/${token}`, {
                method: 'GET',
            });

            if (response.ok) {
                alert('Email verified successfully');
                history.push('/login');
            } else {
                alert('Email verification failed');
            }
        };

        verifyEmail();
    }, [token, history]);

    return <div>Verifying your email...</div>;
}

export default VerifyEmail;
