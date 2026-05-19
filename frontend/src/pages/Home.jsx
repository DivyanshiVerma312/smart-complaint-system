import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import {
  Shield,
  Brain,
  FileText,
  BarChart3,
  ArrowRight,
  Zap,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Users,
} from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, inProgress: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await API.get('/complaints');
      const complaints = res.data.data;
      setStats({
        total: complaints.length,
        pending: complaints.filter(c => c.status === 'Pending').length,
        resolved: complaints.filter(c => c.status === 'Resolved').length,
        inProgress: complaints.filter(c => c.status === 'In Progress').length,
      });
    } catch (err) {
      // Silently fail for stats
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: FileText,
      title: 'Smart Registration',
      description: 'Submit complaints with detailed categorization and location tracking.',
      color: '#3b82f6',
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'AI-powered priority detection, department routing, and auto-responses.',
      color: '#8b5cf6',
    },
    {
      icon: BarChart3,
      title: 'Real-time Tracking',
      description: 'Track complaint status with live updates and filtering capabilities.',
      color: '#10b981',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'JWT authentication with encrypted passwords for data protection.',
      color: '#f59e0b',
    },
  ];

  const statCards = [
    { label: 'Total Complaints', value: stats.total, icon: FileText, color: '#6366f1' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: '#f59e0b' },
    { label: 'In Progress', value: stats.inProgress, icon: AlertTriangle, color: '#3b82f6' },
    { label: 'Resolved', value: stats.resolved, icon: CheckCircle2, color: '#10b981' },
  ];

  return (
    <div className="page-container">
      {/* Cold start banner for deployed version */}
      <div className="cold-start-banner">
        <AlertTriangle size={16} />
        <span>
          <strong>Note for evaluators:</strong> Free-tier backends (Render) may take ~30 seconds to wake up on first request.
        </span>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          marginBottom: '48px',
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '20px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: 'var(--shadow-glow)',
          }}
        >
          <Shield size={36} color="white" />
        </motion.div>

        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '16px',
          }}
        >
          AI-Powered{' '}
          <span className="gradient-text">Smart Complaint</span>{' '}
          Management
        </h1>

        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            maxWidth: '640px',
            margin: '0 auto 32px',
            lineHeight: '1.7',
          }}
        >
          Register, track, and resolve complaints intelligently with AI-driven
          priority detection, department routing, and automated responses.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {user ? (
            <>
              <Link to="/complaints/new" className="btn-primary" style={{ textDecoration: 'none', fontSize: '1rem', padding: '14px 28px' }}>
                <Zap size={18} /> New Complaint
              </Link>
              <Link to="/complaints" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '1rem', padding: '14px 28px' }}>
                <FileText size={18} /> View All <ArrowRight size={16} />
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="btn-primary" style={{ textDecoration: 'none', fontSize: '1rem', padding: '14px 28px' }}>
                <Users size={18} /> Get Started
              </Link>
              <Link to="/login" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '1rem', padding: '14px 28px' }}>
                Sign In <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>
      </motion.div>

      {/* Stats Section (logged in only) */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass-card"
              style={{ padding: '24px', textAlign: 'center' }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                }}
              >
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {loading ? '—' : stat.value}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '32px',
            color: 'var(--text-primary)',
          }}
        >
          Powerful Features
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '48px',
          }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass-card"
              style={{ padding: '28px' }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${feature.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <feature.icon size={24} style={{ color: feature.color }} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
