import React from 'react';

const DesktopIcon = ({ title, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        background: 'none', 
        border: 'none',
        cursor: 'pointer',
        padding: '10px'
      }}
    >
      <div style={{ width: '50px', height: '50px', background: '#ccc', marginBottom: '5px' }}></div>
      <span>{title}</span>
    </button>
  );
};

export default DesktopIcon;
