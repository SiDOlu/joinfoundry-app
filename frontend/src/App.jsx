import React, { useState, useEffect } from 'react';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';
import { listIdeas } from './api';

const WindowManager = () => {
  const [ideas, setIdeas] = useState([]);

  const fetchIdeas = async () => {
    try {
      const data = await listIdeas();
      setIdeas(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#008080', position: 'relative' }}>
      <header style={{ height: '40px', background: '#c0c0c0', borderBottom: '2px solid #fff', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
        Foundry OS
      </header>
      <main style={{ padding: '20px' }}>
        <h1>Workspace Canvas</h1>
        <IdeaForm onIdeaCreated={fetchIdeas} />
        <IdeaList ideas={ideas} />
      </main>
      <footer style={{ height: '40px', background: '#c0c0c0', borderTop: '2px solid #fff', position: 'absolute', bottom: 0, width: '100%' }}>
        Start
      </footer>
    </div>
  );
};

export default WindowManager;
