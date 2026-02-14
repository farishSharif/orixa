import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import './Auth.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
        } else {
            navigate('/account');
        }
        setLoading(false);
    };

    return (
        <div className="auth-page container">
            <div className="auth-card fade-in">
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to your ORIXA account.</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-with-icon">
                            <Mail size={18} />
                            <input
                                type="email"
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-with-icon">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-actions">
                        <button type="submit" className="btn btn-dark w-full" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} />
                        </button>
                    </div>
                </form>

                <div className="auth-divider">
                    <span>Or continue with</span>
                </div>

                <div className="social-auth">
                    <button className="btn btn-outline-dark w-full">
                        <Mail size={18} /> Gmail
                    </button>
                </div>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/signup">Create account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;