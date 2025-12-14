import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
}

const initialState: ProductsState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await axios.get<Product[]>(
      'http://localhost:3001/products'
    );
    return res.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
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
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;
