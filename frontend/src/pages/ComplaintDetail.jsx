import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { ArrowLeft, MapPin, Clock, Tag, User, Mail, Trash2, Save, Brain, AlertTriangle, Building2, FileText, MessageSquare } from 'lucide-react';

const STATUSES = ['Pending', 'In Progress', 'Resolved', 'Rejected'];

function StatusBadge({ status }) {
  const cls = { 'Pending': 'badge-pending', 'In Progress': 'badge-progress', 'Resolved': 'badge-resolved', 'Rejected': 'badge-rejected' };
  return <span className={`badge ${cls[status] || 'badge-pending'}`}>{status}</span>;
}

function PriorityBadge({ priority }) {
  if (!priority) return null;
  const cls = { 'High': 'badge-high', 'Medium': 'badge-medium', 'Low': 'badge-low' };
  return <span className={`badge ${cls[priority] || 'badge-medium'}`}>{priority} Priority</span>;
}

export default function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { fetchComplaint(); }, [id]);

  const fetchComplaint = async () => {
    try {
      const res = await API.get(`/complaints/${id}`);
      setComplaint(res.data.data);
      setNewStatus(res.data.data.status);
    } catch { toast.error('Complaint not found'); navigate('/complaints'); }
    finally { setLoading(false); }
  };

  const updateStatus = async () => {
    setUpdating(true);
    try {
      const res = await API.put(`/complaints/${id}`, { status: newStatus });
      setComplaint(res.data.data);
      toast.success('Updated status shown');
    } catch { toast.error('Failed to update'); }
    finally { setUpdating(false); }
  };

  const deleteComplaint = async () => {
    if (!window.confirm('Are you sure you want to delete this complaint?')) return;
    setDeleting(true);
    try {
      await API.delete(`/complaints/${id}`);
      toast.success('Complaint removed');
      navigate('/complaints');
    } catch { toast.error('Failed to delete'); }
    finally { setDeleting(false); }
  };

  if (loading) return <LoadingSpinner text="Loading complaint details..." />;
  if (!complaint) return null;

  const date = new Date(complaint.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const ai = complaint.aiAnalysis;

  return (
    <div className="page-container" style={{ maxWidth: '800px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Back button */}
        <button onClick={() => navigate('/complaints')} className="btn-secondary" style={{ marginBottom: '24px' }}>
          <ArrowLeft size={16} /> Back to Complaints
        </button>

        {/* Main Card */}
        <div className="glass-card" style={{ padding: '32px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: '700', flex: 1 }}>{complaint.title}</h1>
            <StatusBadge status={complaint.status} />
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem', marginBottom: '24px' }}>{complaint.description}</p>

          {/* Meta grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {[
              { icon: User, label: 'Name', value: complaint.name },
              { icon: Mail, label: 'Email', value: complaint.email },
              { icon: Tag, label: 'Category', value: complaint.category },
              { icon: MapPin, label: 'Location', value: complaint.location },
              { icon: Clock, label: 'Submitted', value: date },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ padding: '12px', borderRadius: '10px', background: 'var(--bg-tertiary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <Icon size={14} /> {label}
                </div>
                <div style={{ fontWeight: '500', fontSize: '0.9rem', color: 'var(--text-primary)', wordBreak: 'break-word' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Status Update */}
          <div style={{ borderTop: '1px solid var(--border-primary)', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label className="input-label" htmlFor="status-select">Update Status</label>
              <select id="status-select" className="input-field" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} style={{ cursor: 'pointer' }}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <button id="update-status-btn" onClick={updateStatus} className="btn-primary" disabled={updating || newStatus === complaint.status} style={{ height: '46px' }}>
              <Save size={16} /> {updating ? 'Updating...' : 'Update Status'}
            </button>
            <button id="delete-complaint-btn" onClick={deleteComplaint} className="btn-danger" disabled={deleting} style={{ height: '46px' }}>
              <Trash2 size={16} /> {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>

        {/* AI Analysis Section */}
        {ai && ai.priority && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Brain size={20} color="white" />
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '600' }}>AI Analysis Results</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-tertiary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginBottom: '8px' }}>
                  <AlertTriangle size={14} /> Priority Level
                </div>
                <PriorityBadge priority={ai.priority} />
              </div>
              <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-tertiary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginBottom: '8px' }}>
                  <Building2 size={14} /> Recommended Department
                </div>
                <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{ai.department}</div>
              </div>
            </div>

            {ai.summary && (
              <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-tertiary)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginBottom: '8px' }}>
                  <FileText size={14} /> Summary
                </div>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>{ai.summary}</p>
              </div>
            )}

            {ai.response && (
              <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-tertiary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginBottom: '8px' }}>
                  <MessageSquare size={14} /> Auto-generated Response
                </div>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>{ai.response}</p>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
