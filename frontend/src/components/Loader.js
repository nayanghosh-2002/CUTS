import React from 'react';

function Loader({ size = 40, color = '#2563EB' }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `4px solid ${color}33`,
        borderTop: `4px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: 'auto',
      }}
    />
  );
}

export default Loader;
