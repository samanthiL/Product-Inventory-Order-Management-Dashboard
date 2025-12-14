import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Box, TextField, CircularProgress  } from '@mui/material';
import { useEffect, useState } from 'react';
import type { RootState, AppDispatch } from '../../store';
import { fetchProducts } from '../../store/productSlice';
import { useDispatch, useSelector } from 'react-redux';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'price', headerName: 'Price ($)', width: 120 },
  { field: 'stock', headerName: 'Stock', width: 100 },
 
];

const ProductListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = list.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <TextField
        label="Search products"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DataGrid
        rows={filteredProducts}
        columns={columns}
        pageSizeOptions={[5]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default ProductListPage;
