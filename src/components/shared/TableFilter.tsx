import { Box, IconButton, MenuItem, Popover, TextField } from "@mui/material";
import { GridFilterListIcon } from "@mui/x-data-grid";
import { useState } from "react";

interface TableFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  onStatusChange: (value: string) => void;
  status?: string;
}

const TableFilter = ({
  search,
  onSearchChange,
  placeholder = "Search...",
  onStatusChange,
  status,
}: TableFilterProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  return (
    <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
      <TextField
        size="small"
        label={placeholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <GridFilterListIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Box sx={{ p: 2, width: 200 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>
        </Box>
      </Popover>
    </Box>
  );
};

export default TableFilter;
