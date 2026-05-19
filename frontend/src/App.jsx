import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ComplaintForm from './pages/ComplaintForm';
import ComplaintList from './pages/ComplaintList';
import ComplaintDetail from './pages/ComplaintDetail';
import AIAnalysis from './pages/AIAnalysis';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complaints" element={<ProtectedRoute><ComplaintList /></ProtectedRoute>} />
        <Route path="/complaints/new" element={<ProtectedRoute><ComplaintForm /></ProtectedRoute>} />
        <Route path="/complaints/:id" element={<ProtectedRoute><ComplaintDetail /></ProtectedRoute>} />
        <Route path="/ai-analysis" element={<ProtectedRoute><AIAnalysis /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}
