import React from 'react';

const IdeaList = ({ ideas }) => {
  return (
    <div style={{ padding: '10px', background: '#f0f0f0' }}>
      <h2>Ideas</h2>
      {ideas.length === 0 ? (
        <p>No ideas yet.</p>
      ) : (
        <ul>
          {ideas.map((idea) => (
            <li key={idea.id} style={{ marginBottom: '10px' }}>
              <strong>{idea.title}</strong> - {idea.status}
              <p>{idea.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IdeaList;
