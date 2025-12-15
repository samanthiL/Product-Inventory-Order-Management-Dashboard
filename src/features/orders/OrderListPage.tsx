import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchOrders } from "../../store/orderSlice";
import type { Order } from "../../store/orderSlice";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Chip,
  TableSortLabel,
  Box,
} from "@mui/material";
import TableFilter from "../../components/shared/TableFilter";

const statusColors: Record<
  Order["status"],
  "default" | "primary" | "success" | "error"
> = {
  Pending: "default",
  Shipped: "primary",
  Delivered: "success",
  Cancelled: "error",
};

type SortKey = "id" | "customerName" | "totalAmount" | "orderDate";

const OrderListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.orders
  );

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("orderDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filteredOrders = orders
    .filter((o) => !statusFilter || o.status === statusFilter)
    .filter((order) => {
      if (!search) return true;
      const searchTerm = search.toLowerCase();
      const matchesId = order.id.toString().toLowerCase().includes(searchTerm);
      const matchesCustomerName = order.customerName
        .toLowerCase()
        .includes(searchTerm);
      const matchesOrderDate = order.orderDate
        .toLowerCase()
        .includes(searchTerm);
      return matchesId || matchesCustomerName || matchesOrderDate;
    });

  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      let valA: number | string = a[sortKey];
      let valB: number | string = b[sortKey];

      if (sortKey === "orderDate") {
        valA = new Date(a.orderDate).getTime();
        valB = new Date(b.orderDate).getTime();
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredOrders, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box>
      <h2>Order List</h2>
      <TableFilter
        search={search}
        onSearchChange={setSearch}
        status={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Orders Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortKey === "id"}
                  direction={sortOrder}
                  onClick={() => handleSort("id")}
                >
                  Order ID
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={sortKey === "customerName"}
                  direction={sortOrder}
                  onClick={() => handleSort("customerName")}
                >
                  Customer Name
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={sortKey === "totalAmount"}
                  direction={sortOrder}
                  onClick={() => handleSort("totalAmount")}
                >
                  Total
                </TableSortLabel>
              </TableCell>

              <TableCell>Status</TableCell>

              <TableCell>
                <TableSortLabel
                  active={sortKey === "orderDate"}
                  direction={sortOrder}
                  onClick={() => handleSort("orderDate")}
                >
                  Order Date
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={statusColors[order.status]}
                  />
                </TableCell>
                <TableCell>{order.orderDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderListPage;
