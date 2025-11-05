"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import { login } from "@/api";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await login({ email, password });
            if (res.status) {
                router.replace("/");
            }
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f7fa",
            }}
        >
            <Paper sx={{ p: 4, width: 360, borderRadius: 3, textAlign: "center" }} elevation={4}>
                <Typography variant="h5" mb={2}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" variant="body2" mt={1}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, py: 1 }}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
