"use client";
import { authCheck } from '@/api';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await authCheck();
                if (res.status) {
                    setIsAuthenticated(true);
                    router.replace('/');

                } else {
                    setIsAuthenticated(false);
                    router.replace('/login');
                }
            } catch (err) {
                setIsAuthenticated(false);
                router.replace('/login');
            }
        };

        checkAuth();
    }, [router]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}
