import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { LogIn, Mail, Lock, Zap } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Login successful! Welcome back.');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Quick fill for demo
  const quickFill = () => {
    setForm({ email: 'rahul@gmail.com', password: 'password123' });
  };

  return (
    <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card"
        style={{ width: '100%', maxWidth: '440px', padding: '40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <LogIn size={28} color="white" />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '8px' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Sign in to your account to continue
          </p>
        </div>

        {/* Quick Fill Button */}
        <button
          id="quick-fill-login"
          type="button"
          onClick={quickFill}
          className="btn-quickfill"
          style={{ width: '100%', justifyContent: 'center', marginBottom: '20px' }}
        >
          <Zap size={14} /> Quick Fill Demo Credentials
        </button>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label" htmlFor="login-email">
              <Mail size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              className="input-field"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label className="input-label" htmlFor="login-password">
              <Lock size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="input-field"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            id="login-submit"
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: '600', textDecoration: 'none' }}>
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
