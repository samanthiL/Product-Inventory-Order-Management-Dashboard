import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  getProductById,
  updateProduct,
} from "../services/productService";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  isActive: boolean;
  imageUrl: string;
  ratings: number;
}

interface ProductsState {
  list: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  list: [],
  loading: false,
  error: null,
  selectedProduct: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await getProducts();
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: string) => {
    return await getProductById(id);
  }
);
export const updateProductById = createAsyncThunk(
  "products/updateProductById",
  async (updatedProduct: Product) => {
    return await updateProduct(updatedProduct);
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      })
      .addCase(updateProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index >= 0) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
      });
  },
});

export default productsSlice.reducer;
