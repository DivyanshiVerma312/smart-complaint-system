import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Home,
  FileText,
  PlusCircle,
  Brain,
  LogOut,
  LogIn,
  UserPlus,
  Sun,
  Moon,
  Menu,
  X,
  Shield
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = user
    ? [
        { to: '/', icon: Home, label: 'Home' },
        { to: '/complaints', icon: FileText, label: 'Complaints' },
        { to: '/complaints/new', icon: PlusCircle, label: 'New Complaint' },
        { to: '/ai-analysis', icon: Brain, label: 'AI Analysis' },
      ]
    : [
        { to: '/', icon: Home, label: 'Home' },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        background: 'var(--bg-navbar)',
        borderBottom: '1px solid var(--border-primary)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Shield size={20} color="white" />
          </div>
          <span
            style={{
              fontWeight: '700',
              fontSize: '1.15rem',
              color: 'var(--text-primary)',
            }}
          >
            Smart<span className="gradient-text">Complaint</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
          className="desktop-nav"
        >
          {navLinks.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: isActive(to) ? '600' : '500',
                color: isActive(to) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                background: isActive(to) ? 'var(--accent-primary-light)' : 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </div>

        {/* Right side - theme toggle + auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Theme Toggle */}
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: '1px solid var(--border-primary)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Auth buttons / user info */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                className="desktop-nav"
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: 'var(--bg-tertiary)',
                }}
              >
                👋 {user.name}
              </span>
              <button
                id="logout-btn"
                onClick={logout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-primary)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                }}
              >
                <LogOut size={16} />
                <span className="desktop-nav">Logout</span>
              </button>
            </div>
          ) : (
            <div className="desktop-nav" style={{ display: 'flex', gap: '8px' }}>
              <Link to="/login" className="btn-secondary" style={{ textDecoration: 'none' }}>
                <LogIn size={16} /> Login
              </Link>
              <Link to="/register" className="btn-primary" style={{ textDecoration: 'none' }}>
                <UserPlus size={16} /> Sign Up
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: '1px solid var(--border-primary)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              overflow: 'hidden',
              borderTop: '1px solid var(--border-primary)',
              padding: '12px 20px',
            }}
          >
            {navLinks.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: isActive(to) ? '600' : '500',
                  color: isActive(to) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  background: isActive(to) ? 'var(--accent-primary-light)' : 'transparent',
                }}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
            {!user && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-secondary"
                  style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}
                >
                  <LogIn size={16} /> Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary"
                  style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}
                >
                  <UserPlus size={16} /> Sign Up
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
