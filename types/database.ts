export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  file_url: string;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  product_id: string;
  stripe_session_id: string;
  amount_paid: number;
  created_at: string;
}

export interface Download {
  id: string;
  order_id: string;
  download_token: string;
  expires_at: string;
}
