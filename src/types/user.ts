export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_phone: string;
  fitness_center: string;
  fitness_center_id: string;
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
