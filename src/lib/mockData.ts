// Mock data for development and auth

export type Permission =
  | "orders:read"
  | "orders:write"
  | "tickets:read"
  | "tickets:write"
  | "support:read"
  | "support:write"
  | "warranty:read"
  | "warranty:write"
  | "me:read"
  | "me:write"
  | "dashboard:read"
  | "settings:read"
  | "settings:write"
  | "admin:read"
  | "admin:write";

export type Role = "admin" | "customer" | "support" | "manager";

export interface MockUser {
  id: string;
  email: string;
  password: string; // In real app this would be hashed; for mock we compare plain text
  name: string;
  role: Role;
  permissions: Permission[];
  avatar?: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "user-admin-1",
    email: "admin@netland.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    permissions: [
      "orders:read",
      "orders:write",
      "tickets:read",
      "tickets:write",
      "support:read",
      "support:write",
      "warranty:read",
      "warranty:write",
      "me:read",
      "me:write",
      "dashboard:read",
      "settings:read",
      "settings:write",
      "admin:read",
      "admin:write",
    ],
  },
  {
    id: "user-customer-1",
    email: "alex@example.com",
    password: "customer123",
    name: "Alex Johnson",
    role: "customer",
    permissions: [
      "orders:read",
      "tickets:read",
      "tickets:write",
      "warranty:read",
      "me:read",
      "me:write",
      "dashboard:read",
      "settings:read",
      "settings:write",
    ],
  },
  {
    id: "user-support-1",
    email: "support@netland.com",
    password: "support123",
    name: "Support Agent",
    role: "support",
    permissions: [
      "orders:read",
      "tickets:read",
      "tickets:write",
      "support:read",
      "support:write",
      "warranty:read",
      "me:read",
      "dashboard:read",
    ],
  },
  {
    id: "user-manager-1",
    email: "manager@netland.com",
    password: "manager123",
    name: "Store Manager",
    role: "manager",
    permissions: [
      "orders:read",
      "orders:write",
      "tickets:read",
      "tickets:write",
      "support:read",
      "support:write",
      "warranty:read",
      "warranty:write",
      "me:read",
      "me:write",
      "dashboard:read",
      "settings:read",
      "admin:read",
    ],
  },
];

/** Find user by email and validate password. Returns user without password for auth state. */
export function findUserByCredentials(
  email: string,
  password: string
): Omit<MockUser, "password"> | null {
  const normalizedEmail = email.trim().toLowerCase();
  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    permissions: user.permissions,
    avatar: user.avatar,
  };
}

/** Check if user has a specific permission */
export function hasPermission(
  permissions: Permission[],
  permission: Permission
): boolean {
  return permissions.includes(permission) || permissions.includes("admin:read");
}
