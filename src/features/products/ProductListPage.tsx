import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import type { RootState, AppDispatch } from "../../store";
import { fetchProducts } from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
const CUSTOM_ROW_HEIGHT = 124;

const columns: GridColDef[] = [
  {
    field: "imageUrl",
    headerName: "image",
    width: 200,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <img
        src={params.value}
        alt="product"
        style={{
          width: 120,
          height: 120,
          margin: 10,
          objectFit: "cover",
          borderRadius: 4,
        }}
      />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "category",
    headerName: "Category",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "price",
    headerName: "Price ($)",
    width: 100,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 100,
    headerAlign: "center",
    align: "center",
  },
];

const ProductListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = list.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log("list", list);
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 3,
        }}
      >
        <TextField
          placeholder="Search Here..."
          size="medium"
          sx={{
            width: 450,
            "& .MuiOutlinedInput-root": {
              height: 38,
              borderRadius: 25,
              paddingRight: "10px",
              margin: "7px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ccc",
            },
            "& input::placeholder": {
              opacity: 0.7,
              color: "grey.400",
            },
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: "action.active" }} />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
        />
      </Box>
      <Box sx={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={filteredProducts}
          columns={columns}
          pageSizeOptions={[5]}
          rowHeight={CUSTOM_ROW_HEIGHT}
          onRowClick={(params) => navigate(`/products/${params.id}`)}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default ProductListPage;
