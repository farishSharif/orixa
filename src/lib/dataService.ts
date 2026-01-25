import { supabase } from './supabaseClient';
import type { Product, Order, Profile } from '../types/database';

export const dataService = {
    // --- Products ---
    async getProducts() {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data as Product[];
    },

    async getProductById(id: string) {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data as Product;
    },

    async createProduct(product: Partial<Product>) {
        const { data, error } = await supabase
            .from('products')
            .insert([product])
            .select()
            .single();
        if (error) throw error;
        return data as Product;
    },

    async updateProduct(id: string, updates: Partial<Product>) {
        const { data, error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data as Product;
    },

    async deleteProduct(id: string) {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    // --- Orders ---
    async getOrders() {
        const { data, error } = await supabase
            .from('orders')
            .select('*, profiles(full_name)')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async getMyOrders(userId: string) {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data as Order[];
    },

    // --- Profiles ---
    async getProfile(id: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data as Profile;
    }
};
