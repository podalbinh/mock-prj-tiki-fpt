export const UserRole = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export const OrderStatus = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;