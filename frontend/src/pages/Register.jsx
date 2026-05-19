import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { UserPlus, User, Mail, Lock, Zap } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Quick fill for demo
  const quickFill = () => {
    setForm({ name: 'Test User', email: `test${Date.now()}@gmail.com`, password: 'password123' });
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
            <UserPlus size={28} color="white" />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '8px' }}>Create Account</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Join to start managing complaints
          </p>
        </div>

        {/* Quick Fill Button */}
        <button
          id="quick-fill-register"
          type="button"
          onClick={quickFill}
          className="btn-quickfill"
          style={{ width: '100%', justifyContent: 'center', marginBottom: '20px' }}
        >
          <Zap size={14} /> Quick Fill Demo Data
        </button>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label" htmlFor="register-name">
              <User size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              Full Name
            </label>
            <input
              id="register-name"
              type="text"
              className="input-field"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="input-label" htmlFor="register-email">
              <Mail size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              Email Address
            </label>
            <input
              id="register-email"
              type="email"
              className="input-field"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label className="input-label" htmlFor="register-password">
              <Lock size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              Password
            </label>
            <input
              id="register-password"
              type="password"
              className="input-field"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
            />
          </div>

          <button
            id="register-submit"
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: '600', textDecoration: 'none' }}>
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
