import { useEffect, useState } from 'react';

export default function Home() {
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKey() {
      const res = await fetch('/api/key', { credentials: 'include' });
      const data = await res.json();
      setKey(data.key);
      setLoading(false);
    }
    fetchKey();
  }, []);

  function copyKey() {
    navigator.clipboard.writeText(key).then(() => {
      alert('Key copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy key, please copy manually.');
    });
  }

  if (loading) return <p style={{textAlign:'center', marginTop:50}}>Loading key...</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h1>Your Key</h1>
      <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{key}</p>
      <button
        onClick={copyKey}
        style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer' }}
      >
        Copy Key
      </button>
      <p style={{ fontStyle: 'italic', color: '#555' }}>(Do not refresh)</p>
    </div>
  );
}
