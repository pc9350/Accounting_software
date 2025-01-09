import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  ButtonGroup,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AddCircleOutline as PlusIcon,
  RemoveCircleOutline as MinusIcon,
} from "@mui/icons-material";
import axios from "axios";
import API_URL from "../../config/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3001/api/products");
  //       setProducts(response.data);
  //     } catch (error) {
  //       showSnackbar("Error fetching products", "error");
  //     }
  //   };
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const handleOpenDialog = (product = null) => {
    if (product) {
      setFormData(product);
      setSelectedProduct(product);
    } else {
      setFormData({ name: "", price: "", quantity: "" });
      setSelectedProduct(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    setFormData({ name: "", price: "", quantity: "" });
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  //   const handleSubmit = async () => {
  //     try {
  //       if (selectedProduct) {
  //         // Update existing product
  //         await axios.put(
  //           `http://localhost:3001/api/products/${selectedProduct.id}`,
  //           formData
  //         );
  //         showSnackbar("Product updated successfully");
  //       } else {
  //         // Create new product
  //         await axios.post("http://localhost:3001/api/products", formData);
  //         showSnackbar("Product added successfully");
  //       }
  //       handleCloseDialog();
  //       fetchProducts();
  //     } catch (error) {
  //       showSnackbar(
  //         error.response?.data?.error || "Error saving product",
  //         "error"
  //       );
  //     }
  //   };
  const handleSubmit = async () => {
    try {
      if (selectedProduct) {
        // Update existing product
        await axios.put(
          `${API_URL}/api/products/${selectedProduct.id}`,
          formData
        );
        showSnackbar("Product updated successfully");
      } else {
        // Create new product
        await axios.post(`${API_URL}/api/products`, formData);
        showSnackbar("Product added successfully");
      }
      handleCloseDialog();
      fetchProducts();
    } catch (error) {
      showSnackbar(
        error.response?.data?.error || "Error saving product",
        "error"
      );
    }
  };

  //   const handleDelete = async (id) => {
  //     if (window.confirm("Are you sure you want to delete this product?")) {
  //       try {
  //         await axios.delete(`http://localhost:3001/api/products/${id}`);
  //         showSnackbar("Product deleted successfully");
  //         fetchProducts();
  //       } catch (error) {
  //         showSnackbar("Error deleting product", "error");
  //       }
  //     }
  //   };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        showSnackbar("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        showSnackbar("Error deleting product", "error");
      }
    }
  };

  //   const handleQuantityChange = async (product, change) => {
  //     const newQuantity = Math.max(0, parseInt(product.quantity) + change);
  //     try {
  //       await axios.put(`http://localhost:3001/api/products/${product.id}`, {
  //         ...product,
  //         quantity: newQuantity,
  //       });
  //       showSnackbar(
  //         `Quantity ${change > 0 ? "increased" : "decreased"} successfully`
  //       );
  //       fetchProducts();
  //     } catch (error) {
  //       showSnackbar("Error updating quantity", "error");
  //     }
  //   };

  const handleQuantityChange = async (product, change) => {
    const newQuantity = Math.max(0, parseInt(product.quantity) + change);
    try {
      await axios.put(`${API_URL}/api/products/${product.id}`, {
        ...product,
        quantity: newQuantity,
      });
      showSnackbar(
        `Quantity ${change > 0 ? "increased" : "decreased"} successfully`
      );
      fetchProducts();
    } catch (error) {
      showSnackbar("Error updating quantity", "error");
    }
  };

  const [editingCell, setEditingCell] = useState({
    id: null,
    field: null,
  });

  //   const handleInlineEdit = async (product, field, value) => {
  //     try {
  //       await axios.put(`http://localhost:3001/api/products/${product.id}`, {
  //         ...product,
  //         [field]: value,
  //       });
  //       setEditingCell({ id: null, field: null });
  //       showSnackbar("Updated successfully");
  //       fetchProducts();
  //     } catch (error) {
  //       showSnackbar("Error updating product", "error");
  //     }
  //   };
  const handleInlineEdit = async (product, field, value) => {
    try {
      await axios.put(`${API_URL}/api/products/${product.id}`, {
        ...product,
        [field]: value,
      });
      setEditingCell({ id: null, field: null });
      showSnackbar("Updated successfully");
      fetchProducts();
    } catch (error) {
      showSnackbar("Error updating product", "error");
    }
  };

  const calculateItemTotal = (price, quantity) => {
    return (parseFloat(price) * parseInt(quantity)).toFixed(2);
  };

  // Add this function to calculate grand total
  const calculateGrandTotal = () => {
    return products
      .reduce((total, product) => {
        return total + parseFloat(product.price) * parseInt(product.quantity);
      }, 0)
      .toFixed(2);
  };

  const validateForm = () => {
    return formData.name && formData.price && formData.quantity;
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "text.primary" }}
        >
          Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ px: 3 }}
        >
          Add Product
        </Button>
      </Box>

      <Paper elevation={0}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>
                    {editingCell.id === product.id &&
                    editingCell.field === "name" ? (
                      <TextField
                        autoFocus
                        defaultValue={product.name}
                        size="small"
                        onBlur={(e) =>
                          handleInlineEdit(product, "name", e.target.value)
                        }
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleInlineEdit(product, "name", e.target.value);
                          }
                        }}
                      />
                    ) : (
                      <Typography
                        onClick={() =>
                          setEditingCell({ id: product.id, field: "name" })
                        }
                        sx={{
                          cursor: "pointer",
                          "&:hover": { color: "primary.main" },
                        }}
                      >
                        {product.name}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingCell.id === product.id &&
                    editingCell.field === "price" ? (
                      <TextField
                        autoFocus
                        type="number"
                        defaultValue={product.price}
                        size="small"
                        onBlur={(e) =>
                          handleInlineEdit(product, "price", e.target.value)
                        }
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleInlineEdit(product, "price", e.target.value);
                          }
                        }}
                      />
                    ) : (
                      <Typography
                        onClick={() =>
                          setEditingCell({ id: product.id, field: "price" })
                        }
                        sx={{
                          cursor: "pointer",
                          "&:hover": { color: "primary.main" },
                        }}
                      >
                        ₹{Number(product.price).toFixed(2)}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ButtonGroup
                        size="small"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "36px", // Fixed height for consistent alignment
                        }}
                      >
                        <Tooltip title="Decrease quantity">
                          <IconButton
                            onClick={() => handleQuantityChange(product, -1)}
                            disabled={product.quantity <= 0}
                            color="primary"
                          >
                            <MinusIcon />
                          </IconButton>
                        </Tooltip>
                        {editingCell.id === product.id &&
                        editingCell.field === "quantity" ? (
                          <TextField
                            autoFocus
                            type="number"
                            defaultValue={product.quantity}
                            size="small"
                            sx={{ width: "80px" }}
                            onBlur={(e) =>
                              handleInlineEdit(
                                product,
                                "quantity",
                                e.target.value
                              )
                            }
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleInlineEdit(
                                  product,
                                  "quantity",
                                  e.target.value
                                );
                              }
                            }}
                          />
                        ) : (
                          <Typography
                            onClick={() =>
                              setEditingCell({
                                id: product.id,
                                field: "quantity",
                              })
                            }
                            sx={{
                              cursor: "pointer",
                              "&:hover": { color: "primary.main" },
                              px: 2,
                            }}
                          >
                            {product.quantity}
                          </Typography>
                        )}
                        <Tooltip title="Increase quantity">
                          <IconButton
                            onClick={() => handleQuantityChange(product, 1)}
                            color="primary"
                          >
                            <PlusIcon />
                          </IconButton>
                        </Tooltip>
                      </ButtonGroup>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: "primary.main",
                      }}
                    >
                      ₹{calculateItemTotal(product.price, product.quantity)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.quantity > 0 ? "In Stock" : "Out of Stock"}
                      color={product.quantity > 0 ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(product)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow
                sx={{
                  "& td": {
                    borderBottom: "none",
                    backgroundColor: "primary.light",
                    color: "white",
                    fontWeight: "bold",
                  },
                }}
              >
                <TableCell colSpan={3} align="right">
                  Grand Total:
                </TableCell>
                <TableCell>₹{calculateGrandTotal()}</TableCell>
                <TableCell colSpan={2} />{" "}
                {/* Empty cells for status and actions */}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedProduct ? "Edit Product" : "Add New Product"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Product Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!validateForm()}
          >
            {selectedProduct ? "Update" : "Add"} Product
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Products;
