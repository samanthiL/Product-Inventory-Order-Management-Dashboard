
// import { useEffect, useState } from 'react';
// import { Box, Container, TextField, Typography, Alert, CircularProgress } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid'; // Use explicit GridColDef import
// import { useNavigate } from 'react-router-dom';
// import { api } from '../../api/api';
// import type { Product } from '../../types/product';
// import type { GridColDef } from '@mui/x-data-grid';

// const ProductListPage = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true); // Set loading to true initially
//   const [error, setError] = useState<string | null>(null);
//   const [search, setSearch] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Start by clearing any previous error
//     // setError(null);
//     // setLoading(true);
    
//     api.get('/products')
//       .then(res => {
//         // Assume res.data.products is an array of Product
//         const fetchedProducts = res.data.products.map((p: Product) => ({
//           ...p,
//           // Ensure every product has an 'id' property, which is required by DataGrid
//           // The dummy API you might be using usually has an 'id' field.
//           // If not, you might need to generate one here.
//           // e.g., id: p.id || someUniqueIdGenerator(),
//           active: true,
//         }));
//         setProducts(fetchedProducts);
//       })
//       .catch((err) => {
//         console.error('Failed to fetch products:', err);
//         setError('Failed to load products. Please try again.');
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   // Filter products based on search term (case-insensitive)
//   const filtered = products.filter(p =>
//     p.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const columns: GridColDef<Product>[] = [
//     // Include id column and hide it, as DataGrid requires an 'id' field
//     { field: 'id', headerName: 'ID', width: 90, hide: true }, 
//     { field: 'title', headerName: 'Name', flex: 1 },
//     { field: 'category', headerName: 'Category', width: 150 },
//     { field: 'price', headerName: 'Price', width: 100, 
//       // Example of custom rendering for price
//       renderCell: (params) => `$${params.value.toFixed(2)}`
//     },
//     { field: 'stock', headerName: 'Stock', width: 100 },
//   ];

//   if (error) {
//     return (
//       <Container maxWidth="md" sx={{ mt: 4 }}>
//         <Alert severity="error">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     // Updated Container: Using a max width for better centering and readability on large screens
//     <Container maxWidth="lg"> 
//       <Box sx={{ width: '110%', py: 0 }}> {/* Added vertical padding */}
//         <Typography variant="h4" component="h1" >
//           Product Inventory
//         </Typography>
        
//         <TextField
//           label="Search Product by Name" // More descriptive label
//           fullWidth
//           margin="normal"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <Box sx={{ height: 520, width: '100%', mt: 2 }}>
//           {/* Display loading state using a spinner if needed */}
//           {loading && (
//             <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//               <CircularProgress />
//             </Box>
//           )}

//           {!loading && (
//             <DataGrid
//               rows={filtered}
//               columns={columns}
//               // Tells DataGrid which field is the unique ID for each row
//               getRowId={(row) => row.id} 
//               loading={loading} // loading prop is now just for potential overlay
//               initialState={{
//                 pagination: {
//                   paginationModel: { pageSize: 10, page: 0 }, // Set default page size
//                 },
//               }}
//               pageSizeOptions={[5, 10, 20]} // Added 20 as an option
//               onRowClick={(params) =>
//                 navigate(`/products/${params.id}`)
//               }
//               // Added a property to disable selection on row click
//               disableRowSelectionOnClick
//             />
//           )}
//         </Box>
//       </Box>
//     </Container>
//   );
// }
// export default ProductListPage;


import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Box, TextField, Chip, CircularProgress  } from '@mui/material';
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
  {
    field: 'isActive',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => (
      <Chip
        label={params.value ? 'Active' : 'Inactive'}
        color={params.value ? 'success' : 'default'}
        size="small"
      />
    ),
  },
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
