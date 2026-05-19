import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Tag, ArrowRight } from 'lucide-react';

// Status badge component
function StatusBadge({ status }) {
  const statusClasses = {
    'Pending': 'badge-pending',
    'In Progress': 'badge-progress',
    'Resolved': 'badge-resolved',
    'Rejected': 'badge-rejected',
  };

  return (
    <span className={`badge ${statusClasses[status] || 'badge-pending'}`}>
      {status}
    </span>
  );
}

// Priority badge
function PriorityBadge({ priority }) {
  if (!priority) return null;
  const priorityClasses = {
    'High': 'badge-high',
    'Medium': 'badge-medium',
    'Low': 'badge-low',
  };

  return (
    <span className={`badge ${priorityClasses[priority] || 'badge-medium'}`}>
      {priority} Priority
    </span>
  );
}

export default function ComplaintCard({ complaint, index = 0 }) {
  const formattedDate = new Date(complaint.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/complaints/${complaint._id}`}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <div
          className="glass-card"
          style={{
            padding: '20px',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <h3 style={{
              fontSize: '1.05rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              flex: 1,
              marginRight: '12px',
              lineHeight: '1.4',
            }}>
              {complaint.title}
            </h3>
            <StatusBadge status={complaint.status} />
          </div>

          {/* Description preview */}
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {complaint.description}
          </p>

          {/* Meta info */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: 'var(--text-tertiary)',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Tag size={14} />
              {complaint.category}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} />
              {complaint.location}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} />
              {formattedDate}
            </span>
            {complaint.aiAnalysis?.priority && (
              <PriorityBadge priority={complaint.aiAnalysis.priority} />
            )}
            <span style={{ marginLeft: 'auto', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
              View <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
