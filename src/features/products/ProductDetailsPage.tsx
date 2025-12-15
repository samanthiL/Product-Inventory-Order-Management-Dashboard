import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Switch,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchProductById } from "../../store/productSlice";

import SpinnerField from "../../components/common/SpinnerField";

// Define the shape of your editable form state
interface FormStateType {
  stock: number;
  isActive: boolean;
}

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const { selectedProduct: product, loading } = useSelector(
    (state: RootState) => state.products
  );

  // Local form state initialized with sensible defaults
  const [formState, setFormState] = useState<FormStateType>({
    stock: 0,
    isActive: true,
  });

  // Fetch product on page load
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  // Update handler for the Switch to update local state
  const handleIsActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      isActive: e.target.checked,
    });
  };

  // Update handler (API thunk can be added later)
  const handleUpdate = () => {
    if (!product) return;

    console.log("Updated Data:", {
      id: product.id,
      ...formState, // Log data from local state
    });
  };

  // Loading UI
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }
  const handleQuantityChange = (val: number) => {
    console.log("Quantity changed:", val);
    setFormState({
      ...formState,
      stock: val,
    });
  };
  // Safety check
  if (!product) return null;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* LEFT: Product Image */}
        <Box sx={{ flex: 1 }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              width: "100%",
              maxHeight: 300,
              objectFit: "contain",
              borderRadius: 8,
            }}
          />
        </Box>

        {/* RIGHT: Product Details */}
        <Box sx={{ flex: 2 }}>
          <Typography variant="h5">{product.name}</Typography>

          <Typography sx={{ mt: 1 }}>{product.description}</Typography>

          <Typography sx={{ mt: 2 }}>
            <strong>Price:</strong> ${product.price}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            <strong>Ratings:</strong> {product.ratings}
          </Typography>

          {/* Stock Input */}
          <SpinnerField
            label="Products"
            initialValue={1}
            onChange={handleQuantityChange}
          />
          {/* Active Switch */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography sx={{ mr: 1 }}>Active</Typography>
            <Switch
              checked={formState.isActive}
              onChange={handleIsActiveChange} 
            />
          </Box>

          {/* Update Button */}
          <Button variant="contained" sx={{ mt: 3 }} onClick={handleUpdate}>
            Update Product
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailsPage;
