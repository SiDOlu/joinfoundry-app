import React from 'react';

const Taskbar = ({ onOpen }) => {
  return (
    <footer style={{ position: 'fixed', bottom: 0, width: '100%', height: '40px', background: '#333', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
      <button onClick={() => onOpen(Date.now(), 'New Window', 'Content here')}>Open Window</button>
    </footer>
  );
};

export default Taskbar;
