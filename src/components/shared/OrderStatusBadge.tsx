import * as React from "react";
import Chip, { type ChipProps } from "@mui/material/Chip";

export type OrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled";

const statusColors: Record<OrderStatus, ChipProps["color"]> = {
  Pending: "default",
  Shipped: "primary",
  Delivered: "success",
  Cancelled: "error",
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const color = statusColors[status] || "default";
  return (
    <Chip
      label={status}
      color={color}
      size="small"
      sx={{
        fontWeight: 600,
        textTransform: "uppercase",
        minWidth: 80,
      }}
    />
  );
};
export default OrderStatusBadge;
