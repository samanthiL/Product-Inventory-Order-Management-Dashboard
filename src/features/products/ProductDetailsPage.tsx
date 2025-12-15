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
import { fetchProductById, updateProductById } from "../../store/productSlice";
import SpinnerField from "../../components/common/SpinnerField";
import ProductCard from "../../components/shared/ProductCard";
import ConfirmationDialog from "../../components/shared/ConfirmationDialog";

interface FormStateType {
  stock: number;
  isActive: boolean;
}

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedProduct: product, loading } = useSelector(
    (state: RootState) => state.products
  );

  const [formState, setFormState] = useState<FormStateType>({
     stock: product?.stock ?? 0,
  isActive: product?.isActive ?? true,
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleIsActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      isActive: e.target.checked,
    });
  };
    const [open, setOpen] = useState(false);

 const handleClickOpen = () => {
    setOpen(true);
  };
  const handleUpdate = () => {
    if (!product) return;

   const updatedProduct = {
    ...product,      
    stock: formState.stock,
    isActive: formState.isActive,
  };

  console.log("Updated Product Payload:", updatedProduct);
   dispatch(updateProductById(updatedProduct))
    .unwrap()
    .then(() => {
      console.log("Product updated successfully!");
    })
    .catch((err) => {
      console.error("Update failed:", err);
    });
}
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
  if (!product) return null;


  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, p: 2 }}>
      <ProductCard
        name={product.name}
        imageUrl={product.imageUrl}
        description={product.description}
        price={product.price}
        ratings={product.ratings || 0}
        stock={product.stock}
      />
        <SpinnerField
          label="Stock Quantity"
          initialValue={product.stock} 
          onChange={handleQuantityChange}
        />
        <Box sx={{ display: "flex", alignItems: "center", mt: 3, mb: 3 }}>
          <Typography sx={{ mr: 2, fontWeight: "bold" }}>
            Product Status:
          </Typography>
          <Switch
            checked={formState.isActive}
            onChange={handleIsActiveChange}
          />
          <Typography
            color={formState.isActive ? "success.main" : "error.main"}
          >
            {formState.isActive ? "Active" : "Inactive"}
          </Typography>
        </Box>

        {/* Update Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleClickOpen}
        >
          Update Product
        </Button>

         <ConfirmationDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleUpdate}
        description="Are you sure you want to update this product?"
      />
      </Box>
  );
};

export default ProductDetailsPage;