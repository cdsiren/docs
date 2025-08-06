import React, { useEffect, useState } from 'react';

export const ChainList = () => {
  const [chainList, setChainList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = 'https://api-v2.swaps.xyz/api/getChainList';
  const demoKeyFromPlayground = 'e2c440ee9c0cf66bb58ede58ac0eb7f1';

  const formatChainName = (name) => {
    const overrides = {
      btc: 'Bitcoin',
    };
  
    if (!name || typeof name !== 'string') return name;
  
    const lowered = name.toLowerCase();
    if (overrides[lowered]) {
      return overrides[lowered];
    }
  
    const withSpaces = name.replace(/-/g, ' ');
  
    const capitalized = withSpaces
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  
    return capitalized;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'x-api-key': demoKeyFromPlayground },
        });

        const result = await response.json();

        if (Array.isArray(result)) {
          const sorted = [...result].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setChainList(sorted);
          setFilteredList(sorted);
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (err) {
        console.error('Failed to fetch chain list:', err);
        setError('Failed to load chains');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = chainList.filter((chain) =>
      `${formatChainName(chain.name)} ${chain.chainId} ${chain.vmId}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredList(filtered);
  }, [searchTerm, chainList]);

  return (
    <div style={{
      borderLeft: '4px solid #ccc',
      padding: '1rem',
      borderRadius: '12px',
      margin: '1rem 0',
      fontSize: '14px',
      backgroundColor: '#f9f9f9',
      overflowX: 'auto'
    }}>
      {loading && <div>Loading supported chains...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && (
        <>
          <input
            type="text"
            placeholder="Search by name, chain ID, or VM ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.5rem',
              marginBottom: '1rem',
              width: '100%',
              maxWidth: '300px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}
          />

          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Name</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Chain Id</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '0.5rem' }}>VM Id</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((chain) => (
                  <tr key={chain.chainId}>
                    <td style={{ padding: '0.5rem' }}>{formatChainName(chain.name)}</td>
                    <td style={{ padding: '0.5rem' }}>{chain.chainId}</td>
                    <td style={{ padding: '0.5rem' }}>{chain.vmId}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ padding: '0.5rem', fontStyle: 'italic' }}>
                    No matching chains found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
