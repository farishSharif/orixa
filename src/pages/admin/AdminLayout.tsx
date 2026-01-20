import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Folder, Users, LogOut } from 'lucide-react';
import './Admin.css';

const AdminDashboard = () => (
    <div className="admin-view">
        <h2>Overview</h2>
        <div className="stats-grid">
            <div className="stat-card">
                <h3>Total Revenue</h3>
                <p className="stat-value">₹1,24,450.00</p>
                <span className="stat-trend">+15% from last month</span>
            </div>
            <div className="stat-card">
                <h3>Total Orders</h3>
                <p className="stat-value">124</p>
                <span className="stat-trend">+8% from last month</span>
            </div>
            <div className="stat-card">
                <h3>Active Users</h3>
                <p className="stat-value">850</p>
                <span className="stat-trend">+20% from last month</span>
            </div>
        </div>
    </div>
);

const AdminProducts = () => (
    <div className="admin-view">
        <div className="view-header">
            <h2>Products</h2>
            <button className="btn btn-dark">Add Product</button>
        </div>
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
                <tr>
                    <td>Cotton Crew Neck</td>
                    <td>Apparel</td>
                    <td>₹1,299.00</td>
                    <td>24</td>
                    <td><button className="edit-link">Edit</button></td>
                </tr>
            </tbody>
        </table>
    </div>
);

const AdminLayout: React.FC = () => {
    const location = useLocation();

    // Mock role check - in real app, check user metadata or profile table
    const isAdmin = true;

    if (!isAdmin) {
        return <Navigate to="/" replace />;
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
                    <Link to="/admin/users" className={location.pathname === '/admin/users' ? 'active' : ''}>
                        <Users size={20} /> Users
                    </Link>
                </nav>
                <div className="admin-sidebar-footer">
                    <Link to="/"><LogOut size={20} /> Exit Admin</Link>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-topbar">
                    <div className="breadcrumb">Admin / {location.pathname.split('/').pop() || 'Dashboard'}</div>
                    <div className="admin-user">Admin User</div>
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
