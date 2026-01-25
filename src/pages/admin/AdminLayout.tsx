import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Folder, LogOut, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../lib/dataService';
import type { Product } from '../../types/database';
import ProductForm from './ProductForm';
import './Admin.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ revenue: 0, orders: 0, users: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Simple aggregate for demo - in production use Supabase RPC
                setStats({
                    revenue: 124450, // Mocked for now till orders persist
                    orders: 12,
                    users: 45
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="admin-view">
            <h2>Overview</h2>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Revenue</h3>
                    <p className="stat-value">₹{stats.revenue.toLocaleString('en-IN')}</p>
                    <span className="stat-trend">+15% from last month</span>
                </div>
                <div className="stat-card">
                    <h3>Total Orders</h3>
                    <p className="stat-value">{stats.orders}</p>
                    <span className="stat-trend">+8% from last month</span>
                </div>
                <div className="stat-card">
                    <h3>Active Users</h3>
                    <p className="stat-value">{stats.users}</p>
                    <span className="stat-trend">+20% from last month</span>
                </div>
            </div>
        </div>
    );
};

const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const fetchProducts = async () => {
        try {
            const data = await dataService.getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSave = async (formData: Partial<Product>) => {
        if (editingProduct) {
            await dataService.updateProduct(editingProduct.id, formData);
        } else {
            await dataService.createProduct(formData);
        }
        fetchProducts();
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await dataService.deleteProduct(id);
            fetchProducts();
        }
    };

    return (
        <div className="admin-view">
            <div className="view-header">
                <h2>Products</h2>
                <button
                    className="btn btn-dark"
                    onClick={() => { setEditingProduct(null); setIsFormOpen(true); }}
                >
                    Add Product
                </button>
            </div>

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>₹{product.price.toLocaleString('en-IN')}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <div className="admin-actions">
                                        <button
                                            className="edit-link"
                                            onClick={() => { setEditingProduct(product); setIsFormOpen(true); }}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="delete-link"
                                            onClick={() => handleDelete(product.id)}
                                            style={{ color: '#ff4d4d', marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {isFormOpen && (
                <ProductForm
                    product={editingProduct}
                    onSave={handleSave}
                    onClose={() => setIsFormOpen(false)}
                />
            )}
        </div>
    );
};

const AdminLayout: React.FC = () => {
    const { user, isAdmin, loading, profile } = useAuth();
    const location = useLocation();

    if (loading) return <div className="container" style={{ padding: '150px 0', textAlign: 'center' }}>Checking permissions...</div>;

    if (!user) return <Navigate to="/login" replace />;

    if (!isAdmin) {
        return (
            <div className="container" style={{ padding: '150px 0', textAlign: 'center' }}>
                <h1 style={{ color: '#ff4d4d' }}>Access Denied</h1>
                <p style={{ marginTop: '1rem', color: 'var(--color-gray)' }}>
                    You do not have administrator privileges.
                </p>
                {!profile && (
                    <div style={{ background: '#fff5f5', padding: '2rem', marginTop: '2rem', border: '1px solid #feb2b2' }}>
                        <p><strong>Troubleshooting:</strong> Your user profile was not found in the database.</p>
                        <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                            Ensure you have ran the <code>supabase_schema.sql</code> script in your Supabase SQL Editor.
                        </p>
                    </div>
                )}
                <div style={{ marginTop: '2rem' }}>
                    <Link to="/" className="btn btn-outline" style={{ display: 'inline-block' }}>Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-logo">ORIXA ADMIN</div>
                <nav className="admin-nav">
                    <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/admin/products" className={location.pathname === '/admin/products' ? 'active' : ''}>
                        <ShoppingBag size={20} /> Products
                    </Link>
                    <Link to="/admin/orders" className={location.pathname === '/admin/orders' ? 'active' : ''}>
                        <Folder size={20} /> Orders
                    </Link>
                </nav>
                <div className="admin-sidebar-footer">
                    <Link to="/"><LogOut size={20} /> Exit Admin</Link>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-topbar">
                    <div className="breadcrumb">Admin / {location.pathname.split('/').pop() || 'Dashboard'}</div>
                    <div className="admin-user">Administrator</div>
                </header>
                <div className="admin-content">
                    <Routes>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="/products" element={<AdminProducts />} />
                        <Route path="*" element={<div>Coming Soon</div>} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
