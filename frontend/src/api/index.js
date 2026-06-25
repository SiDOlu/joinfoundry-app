const BASE_URL = ''; // Assume relative path for now

export const listIdeas = async () => {
  const response = await fetch(`${BASE_URL}/ideas`);
  if (!response.ok) throw new Error('Failed to fetch ideas');
  return response.json();
};

export const createIdea = async (idea) => {
  const response = await fetch(`${BASE_URL}/ideas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(idea),
  });
  if (!response.ok) throw new Error('Failed to create idea');
  return response.json();
};
