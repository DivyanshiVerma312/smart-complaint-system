import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../api/axios';
import ComplaintCard from '../components/ComplaintCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FileText, Search, Filter, MapPin, RefreshCw } from 'lucide-react';

const CATEGORIES = ['All', 'Water Supply', 'Electricity', 'Sanitation', 'Roads', 'Public Safety', 'Other'];

export default function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [locationSearch, setLocationSearch] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => { fetchComplaints(); }, [categoryFilter]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const params = categoryFilter !== 'All' ? `?category=${encodeURIComponent(categoryFilter)}` : '';
      const res = await API.get(`/complaints${params}`);
      setComplaints(res.data.data);
    } catch (err) {
      console.error('Failed to fetch complaints');
    } finally { setLoading(false); }
  };

  const searchByLocation = async () => {
    if (!locationSearch.trim()) { fetchComplaints(); return; }
    setSearching(true);
    try {
      const res = await API.get(`/complaints/search?location=${encodeURIComponent(locationSearch)}`);
      setComplaints(res.data.data);
    } catch (err) {
      console.error('Search failed');
    } finally { setSearching(false); }
  };

  const handleSearchKeyDown = (e) => { if (e.key === 'Enter') searchByLocation(); };

  const resetFilters = () => {
    setCategoryFilter('All');
    setLocationSearch('');
    fetchComplaints();
  };

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>All Complaints</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {loading ? 'Loading...' : `${complaints.length} complaints found`}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card" style={{ padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
            {/* Category Filter */}
            <div style={{ flex: '1 1 250px' }}>
              <label className="input-label" htmlFor="filter-category">
                <Filter size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                Filter by Category
              </label>
              <select id="filter-category" className="input-field" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ cursor: 'pointer' }}>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            {/* Location Search */}
            <div style={{ flex: '1 1 250px' }}>
              <label className="input-label" htmlFor="search-location">
                <MapPin size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                Search by Location
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input id="search-location" className="input-field" placeholder="e.g. Ghaziabad" value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} onKeyDown={handleSearchKeyDown} />
                <button id="search-btn" onClick={searchByLocation} className="btn-primary" disabled={searching} style={{ padding: '10px 16px', whiteSpace: 'nowrap' }}>
                  <Search size={16} /> {searching ? '...' : 'Search'}
                </button>
              </div>
            </div>

            {/* Reset */}
            <button onClick={resetFilters} className="btn-secondary" style={{ height: '46px' }}>
              <RefreshCw size={16} /> Reset
            </button>
          </div>
        </div>

        {/* Complaints Grid */}
        {loading ? (
          <LoadingSpinner text="Loading complaints..." />
        ) : complaints.length === 0 ? (
          <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
            <FileText size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>No Complaints Found</h3>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Try adjusting your filters or submit a new complaint.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {complaints.map((complaint, index) => (
              <ComplaintCard key={complaint._id} complaint={complaint} index={index} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
