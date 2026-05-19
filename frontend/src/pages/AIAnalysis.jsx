import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { Brain, Zap, Send, AlertTriangle, Building2, FileText, MessageSquare, Sparkles, Loader2 } from 'lucide-react';

const CATEGORIES = ['Water Supply', 'Electricity', 'Sanitation', 'Roads', 'Public Safety', 'Other'];

function PriorityBadge({ priority }) {
  if (!priority) return null;
  const cls = { 'High': 'badge-high', 'Medium': 'badge-medium', 'Low': 'badge-low' };
  return <span className={`badge ${cls[priority] || 'badge-medium'}`} style={{ fontSize: '0.9rem', padding: '6px 16px' }}>{priority} Priority</span>;
}

export default function AIAnalysis() {
  const [form, setForm] = useState({ title: '', description: '', category: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await API.post('/ai/analyze', form);
      setResult(res.data);
      toast.success('Analysis complete!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Analysis failed');
    } finally { setLoading(false); }
  };

  const quickFillExamples = [
    { title: 'Water Leakage Issue', description: 'Water pipeline damaged near market area causing flooding. The leakage has been ongoing for 3 days and is dangerous for pedestrians.', category: 'Water Supply' },
    { title: 'Electricity Outage Emergency', description: 'Complete power failure in entire Sector 62 since morning. Hospitals are severely affected. This is a critical emergency.', category: 'Electricity' },
    { title: 'Garbage Not Collected', description: 'Garbage has not been collected from Sector 15 for the past week. Waste is overflowing from bins.', category: 'Sanitation' },
  ];

  const resultCards = result ? [
    { icon: AlertTriangle, label: 'Priority Level', content: <PriorityBadge priority={result.data.priority} />, color: '#ef4444' },
    { icon: Building2, label: 'Recommended Department', content: <span style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--text-primary)' }}>{result.data.department}</span>, color: '#6366f1' },
    { icon: FileText, label: 'Complaint Summary', content: <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>{result.data.summary}</p>, color: '#10b981' },
    { icon: MessageSquare, label: 'Auto-generated Response', content: <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>{result.data.response}</p>, color: '#f59e0b' },
  ] : [];

  return (
    <div className="page-container" style={{ maxWidth: '800px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>AI Complaint Analyzer</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Analyze complaints using AI for priority, department, and auto-response</p>
          </div>
        </div>

        {/* Source indicator */}
        {result && (
          <div style={{ marginBottom: '20px', marginTop: '12px' }}>
            <span style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: '6px', background: result.source === 'openrouter-ai' ? '#d1fae5' : 'var(--accent-primary-light)', color: result.source === 'openrouter-ai' ? '#10b981' : 'var(--accent-primary)', fontWeight: '600' }}>
              <Sparkles size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              {result.source === 'openrouter-ai' ? 'Powered by GPT-4o-mini' : 'Local AI Fallback'}
            </span>
          </div>
        )}

        {/* Quick fill examples */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', marginTop: '20px' }}>
          {quickFillExamples.map((ex, i) => (
            <button key={i} onClick={() => setForm(ex)} className="btn-quickfill">
              <Zap size={12} /> {ex.category}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="glass-card" style={{ padding: '28px', marginBottom: '24px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label className="input-label" htmlFor="ai-title">Complaint Title *</label>
              <input id="ai-title" className="input-field" placeholder="Enter complaint title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label className="input-label" htmlFor="ai-description">Description *</label>
              <textarea id="ai-description" className="input-field" placeholder="Describe the complaint in detail..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={4} style={{ resize: 'vertical', minHeight: '100px' }} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label className="input-label" htmlFor="ai-category">Category *</label>
              <select id="ai-category" className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required style={{ cursor: 'pointer' }}>
                <option value="">Select category</option>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <button id="ai-analyze-btn" type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}>
              {loading ? <><Loader2 size={18} className="animate-spin" /> Analyzing...</> : <><Brain size={18} /> Analyze with AI</>}
            </button>
          </form>
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} style={{ color: 'var(--accent-primary)' }} /> Analysis Results
              </h2>
              <div style={{ display: 'grid', gap: '16px' }}>
                {resultCards.map((card, i) => (
                  <motion.div key={card.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <card.icon size={16} style={{ color: card.color }} />
                      </div>
                      <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{card.label}</span>
                    </div>
                    {card.content}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
