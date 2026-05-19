import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { PlusCircle, Zap, Send } from 'lucide-react';

const CATEGORIES = ['Water Supply', 'Electricity', 'Sanitation', 'Roads', 'Public Safety', 'Other'];

export default function ComplaintForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', title: '', description: '', category: '', location: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/complaints', form);
      toast.success('Complaint stored successfully!');
      navigate('/complaints');
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) errors.forEach(e => toast.error(e));
      else toast.error(err.response?.data?.message || 'Failed to submit');
    } finally { setLoading(false); }
  };

  const quickFill = () => {
    setForm({
      name: 'Rahul Kumar', email: 'rahul@gmail.com',
      title: 'Water Leakage Issue',
      description: 'Water pipeline damaged near market area causing flooding on the main road. The leakage has been ongoing for 3 days and is affecting nearby shops. Urgent repair needed.',
      category: 'Water Supply', location: 'Ghaziabad',
    });
  };

  return (
    <div className="page-container" style={{ maxWidth: '700px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlusCircle size={24} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Register Complaint</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Submit a new complaint for resolution</p>
            </div>
          </div>
          <button id="quick-fill-complaint" type="button" onClick={quickFill} className="btn-quickfill">
            <Zap size={14} /> Quick Fill
          </button>
        </div>

        <div className="glass-card" style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label className="input-label" htmlFor="complaint-name">Full Name *</label>
                <input id="complaint-name" name="name" className="input-field" placeholder="Rahul Kumar" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <label className="input-label" htmlFor="complaint-email">Email Address *</label>
                <input id="complaint-email" name="email" type="email" className="input-field" placeholder="rahul@gmail.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="input-label" htmlFor="complaint-title">Complaint Title *</label>
              <input id="complaint-title" name="title" className="input-field" placeholder="Brief title describing the issue" value={form.title} onChange={handleChange} required />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="input-label" htmlFor="complaint-description">Description *</label>
              <textarea id="complaint-description" name="description" className="input-field" placeholder="Provide detailed description..." value={form.description} onChange={handleChange} required rows={5} style={{ resize: 'vertical', minHeight: '120px' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
              <div>
                <label className="input-label" htmlFor="complaint-category">Category *</label>
                <select id="complaint-category" name="category" className="input-field" value={form.category} onChange={handleChange} required style={{ cursor: 'pointer' }}>
                  <option value="">Select a category</option>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="input-label" htmlFor="complaint-location">Location *</label>
                <input id="complaint-location" name="location" className="input-field" placeholder="e.g. Ghaziabad" value={form.location} onChange={handleChange} required />
              </div>
            </div>

            <button id="complaint-submit" type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}>
              <Send size={18} /> {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
