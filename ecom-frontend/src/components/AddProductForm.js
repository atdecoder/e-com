"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControlLabel,
    Switch,
} from "@mui/material";
import { addProduct } from "../api";

export default function AddProductDialog({ open, onClose, onAdded }) {
    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "",
        in_stock: true,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.price) return alert("Name and price are required");
        setLoading(true);
        try {
            const res = await addProduct({
                name: form.name,
                price: parseFloat(form.price),
                category: form.category,
                in_stock: form.in_stock,
            });
            if (!res.status) {
                return
            }
            setForm({ name: "", price: "", category: "", in_stock: true });
            onClose();
            onAdded();
        } catch (err) {
            alert("Error adding product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Product</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        name="name"
                        label="Product Name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="price"
                        label="Price"
                        value={form.price}
                        onChange={handleChange}
                        fullWidth
                        type="number"
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="category"
                        label="Category"
                        value={form.category}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={form.in_stock}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, in_stock: e.target.checked }))
                                }
                            />
                        }
                        label="In Stock"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? "Saving..." : "Add Product"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

