import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, LogOut, Package, MapPin } from 'lucide-react';
import './Account.css';

const Account: React.FC = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    if (!user) {
        return (
            <div className="account-page container" style={{ textAlign: 'center', padding: '150px 0' }}>
                <h2>Please sign in to view your account.</h2>
                <button onClick={() => navigate('/login')} className="btn btn-dark" style={{ marginTop: '2rem' }}>Login</button>
            </div>
        );
    }

    return (
        <div className="account-page container">
            <div className="account-layout">
                <aside className="account-sidebar">
                    <div className="user-profile-mini">
                        <div className="avatar-placeholder">
                            <UserIcon size={30} />
                        </div>
                        <div className="user-name">
                            <h3>{user.email?.split('@')[0]}</h3>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    <nav className="account-nav">
                        <button className="active"><Package size={18} /> My Orders</button>
                        <button><UserIcon size={18} /> Profile Details</button>
                        <button><MapPin size={18} /> Addresses</button>
                        <button onClick={handleSignOut} className="sign-out"><LogOut size={18} /> Sign Out</button>
                    </nav>
                </aside>

                <main className="account-content">
                    <section className="orders-section">
                        <h2>Order History</h2>
                        <div className="orders-list">
                            {/* Sample Order */}
                            <div className="order-card">
                                <div className="order-header">
                                    <div className="order-meta">
                                        <p className="order-number">#ORX-92837</p>
                                        <p className="order-date">Placed on Jan 15, 2026</p>
                                    </div>
                                    <div className="order-status processing">Processing</div>
                                </div>
                                <div className="order-items">
                                    <div className="order-item-thumb">
                                        <div className="placeholder-img" style={{ background: '#f5f5f5', width: '60px', height: '80px' }}></div>
                                    </div>
                                </div>
                                <div className="order-footer">
                                    <p>Total: <strong>₹3,798.00</strong></p>
                                    <button className="view-details-link">View Details</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Account;
