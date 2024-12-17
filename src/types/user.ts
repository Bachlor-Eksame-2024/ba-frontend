export interface User {
  email: string;
  first_name: string;
  last_name: string;
  fitness_center: string;
  fitness_center_id: number;
  is_member: boolean;
  is_verified: boolean;
  user_id: number;
  user_phone: string;
  user_role: string;
  user_role_name: string;
}

// Admin user

export interface AdminUsersResponse {
  users: AdminUser[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
export interface AdminUser {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_member: boolean;
  role: string;
}
