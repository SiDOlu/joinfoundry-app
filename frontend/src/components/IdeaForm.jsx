import React, { useState } from 'react';
import { createIdea } from '../api';

const IdeaForm = ({ onIdeaCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createIdea({ title, description, status: 'DRAFT' });
      setTitle('');
      setDescription('');
      onIdeaCreated();
    } catch (error) {
      console.error(error);
      alert('Failed to create idea');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '10px', background: '#e0e0e0', marginBottom: '20px' }}>
      <h2>New Idea</h2>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="title">Title:</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ marginLeft: '10px' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ marginLeft: '10px', display: 'block', width: '100%' }} />
      </div>
      <button type="submit">Create Idea</button>
    </form>
  );
};

export default IdeaForm;
