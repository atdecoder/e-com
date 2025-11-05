"use client";
import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    TextField,
    InputAdornment,
    Pagination,
    Typography,
    Box,
    Button,
    Stack
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchProducts } from "../api";
import AddProductDialog from "./AddProductForm";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const limit = 5;
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const load = async () => {
        const res = await fetchProducts({ page, limit, search });
        if (res.status) setProducts(res.data);
    };

    useEffect(() => {
        load();
    }, [page]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
        setTimeout(load, 400);
    };

    return (
        <Stack>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                    🛍️ E-COM
                </Typography>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    + Add Product
                </Button>
            </Box>
            <Card elevation={4}>
                <CardContent>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search products..."
                        value={search}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 2 }}
                    />

                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                    <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Stock</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.length > 0 ? (
                                    products.map((p) => (
                                        <TableRow key={p.id} hover>
                                            <TableCell>{p.name}</TableCell>
                                            <TableCell>{p.category || "—"}</TableCell>
                                            <TableCell>${p.price.toFixed(2)}</TableCell>
                                            <TableCell
                                                sx={{ color: p.in_stock ? "green" : "red", fontWeight: 500 }}
                                            >
                                                {p.in_stock ? "In Stock" : "Out of Stock"}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                                            No products found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Pagination
                        count={10}
                        page={page}
                        onChange={(e, value) => setPage(value)}
                        color="primary"
                        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                    />
                </CardContent>
                <AddProductDialog open={open} onClose={handleClose} onAdded={load} />
            </Card>
        </Stack>
    );
}
