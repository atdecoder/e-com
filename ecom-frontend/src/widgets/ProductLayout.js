"use client";

import React from "react";
import { Container, Button, Stack } from "@mui/material";
import { logout } from "@/api";
import { useRouter } from "next/navigation";

export default function ProductLayout({ children }) {
    const router = useRouter();

    const handleLogout = async () => {
        const res = await logout();
        if (res.status) router.replace('/login');
    };

    return (
        <Container maxWidth="md" sx={{ mt: 6 }}>
            {children}
            <Stack justifySelf={'flex-start'}>
                <Button
                    type="button"
                    fullWidth
                    variant="text"
                    color="error"
                    sx={{ mt: 2, py: 1 }}
                    onClick={() => { handleLogout() }}
                >
                    Logout
                </Button>
            </Stack>
        </Container>
    );
}
