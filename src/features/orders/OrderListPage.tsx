// // src/pages/OrderListPage.tsx
// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import type { RootState, AppDispatch } from '../../store';
// import { fetchOrders } from '../../store/orderSlice';
// import type { Order } from '../../store/orderSlice';
// import {
//   Table,
//   TableHead,
//   TableBody,
//   TableCell,
//   TableRow,
//   TableContainer,
//   Paper,
//   Chip,
//   TextField,
//   MenuItem,
// } from '@mui/material';

// const statusColors: Record<Order['status'], 'default' | 'primary' | 'success' | 'error'> = {
//   Pending: 'default',
//   Shipped: 'primary',
//   Delivered: 'success',
//   Cancelled: 'error',
// };

// const OrderListPage = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { orders, loading, error } = useSelector((state: RootState) => state.orders);

//   const [statusFilter, setStatusFilter] = useState<string>('');
//   const [search, setSearch] = useState<string>('');

//   useEffect(() => {
//     dispatch(fetchOrders());
//   }, [dispatch]);

//   const filteredOrders = orders
//     .filter((o) => !statusFilter || o.status === statusFilter)
//     .filter((o) => o.customerName.toLowerCase().includes(search.toLowerCase()));

//   if (loading) return <div>Loading orders...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2>Order List</h2>

//       {/* Filters */}
//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
//         <TextField
//           label="Search Customer"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <TextField
//           label="Filter by Status"
//           select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           style={{ width: 180 }}
//         >
//           <MenuItem value="">All</MenuItem>
//           <MenuItem value="Pending">Pending</MenuItem>
//           <MenuItem value="Shipped">Shipped</MenuItem>
//           <MenuItem value="Delivered">Delivered</MenuItem>
//           <MenuItem value="Cancelled">Cancelled</MenuItem>
//         </TextField>
//       </div>

//       {/* Orders Table */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Order ID</TableCell>
//               <TableCell>Customer Name</TableCell>
//               {/* <TableCell>Products</TableCell> */}
//               <TableCell>Total</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Order Date</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredOrders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.id}</TableCell>
//                 <TableCell>{order.customerName}</TableCell>
//                 {/* <TableCell>
//                   {order.products.map((p) => `${p.name} (${p.quantity})`).join(', ')}
//                 </TableCell> */}
//                 <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
//                 <TableCell>
//                   <Chip label={order.status} color={statusColors[order.status]} />
//                 </TableCell>
//                 <TableCell>{order.orderDate}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default OrderListPage;

// src/pages/OrderListPage.tsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { fetchOrders } from '../../store/orderSlice';
import type { Order } from '../../store/orderSlice';

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Chip,
  TextField,
  MenuItem,
  TableSortLabel,
} from '@mui/material';

const statusColors: Record<Order['status'], 'default' | 'primary' | 'success' | 'error'> = {
  Pending: 'default',
  Shipped: 'primary',
  Delivered: 'success',
  Cancelled: 'error',
};

type SortKey = 'id' | 'customerName' | 'totalAmount' | 'orderDate';

const OrderListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);

  const [statusFilter, setStatusFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sortKey, setSortKey] = useState<SortKey>('orderDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Filter orders
  const filteredOrders = orders
    .filter((o) => !statusFilter || o.status === statusFilter)
    .filter((o) => o.customerName.toLowerCase().includes(search.toLowerCase()));

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let valA: string | number = a[sortKey];
    let valB: string | number = b[sortKey];

    // Convert dates to timestamp for sorting
    if (sortKey === 'orderDate') {
      valA = new Date(a.orderDate).getTime();
      valB = new Date(b.orderDate).getTime();
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Order List</h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <TextField
          label="Search Customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          label="Filter by Status"
          select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ width: 180 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Shipped">Shipped</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </TextField>
      </div>

      {/* Orders Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortKey === 'id'}
                  direction={sortOrder}
                  onClick={() => handleSort('id')}
                >
                  Order ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortKey === 'customerName'}
                  direction={sortOrder}
                  onClick={() => handleSort('customerName')}
                >
                  Customer Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortKey === 'totalAmount'}
                  direction={sortOrder}
                  onClick={() => handleSort('totalAmount')}
                >
                  Total
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortKey === 'orderDate'}
                  direction={sortOrder}
                  onClick={() => handleSort('orderDate')}
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
                  <Chip label={order.status} color={statusColors[order.status]} />
                </TableCell>
                <TableCell>{order.orderDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderListPage;
