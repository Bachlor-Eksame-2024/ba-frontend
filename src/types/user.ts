export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  fitness_center: string;
  role: string;
}

// Admin user
export interface AdminUser {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_member: boolean;
  role: string;
}

export interface AdminUsersResponse {
  users: AdminUser[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
