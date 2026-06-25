import React from 'react';

const Window = ({ title, content, onClose }) => {
  return (
    <section 
      style={{ 
        position: 'absolute', 
        top: '50px', 
        left: '50px', 
        width: '400px', 
        border: '1px solid #ccc', 
        background: '#fff',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.2)'
      }}
      role="dialog"
      aria-labelledby="window-title"
    >
      <header style={{ padding: '5px', background: '#eee', display: 'flex', justifyContent: 'space-between' }}>
        <h2 id="window-title" style={{ margin: 0, fontSize: '1rem' }}>{title}</h2>
        <button onClick={onClose} aria-label={`Close ${title}`}>X</button>
      </header>
      <div style={{ padding: '10px' }}>
        {content}
      </div>
    </section>
  );
};

export default Window;
