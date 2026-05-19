import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: '16px',
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 size={40} style={{ color: 'var(--accent-primary)' }} />
      </motion.div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500' }}>
        {text}
      </p>
    </div>
  );
}
