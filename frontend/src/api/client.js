const API_BASE = 'https://api.joinfoundry.run/v1';

export const validateIdea = async (problemStatement, context = '') => {
  const response = await fetch(`${API_BASE}/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ problem_statement: problemStatement, context }),
  });
  if (!response.ok) throw new Error('Failed to validate idea');
  return response.json();
};

export const listIdeas = async () => {
  const response = await fetch(`${API_BASE}/ideas`);
  if (!response.ok) throw new Error('Failed to list ideas');
  return response.json();
};

export const createIdea = async (idea) => {
  const response = await fetch(`${API_BASE}/ideas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(idea),
  });
  if (!response.ok) throw new Error('Failed to create idea');
  return response.json();
};
