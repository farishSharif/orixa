export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images: string[];
    details: string[];
    sizes: string[];
    created_at?: string;
    updated_at?: string;
}

export interface Profile {
    id: string;
    full_name: string | null;
    role: 'user' | 'admin';
    avatar_url: string | null;
}

export interface Order {
    id: string;
    user_id: string;
    total_amount: number;
    status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shipping_address: any;
    created_at: string;
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price: number;
    size: string;
}
