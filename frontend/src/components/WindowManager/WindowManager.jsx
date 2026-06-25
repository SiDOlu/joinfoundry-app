import React, { useState } from 'react';
import Taskbar from './Taskbar';
import Window from './Window';

const WindowManager = () => {
  const [windows, setWindows] = useState([]);

  const openWindow = (id, title, content) => {
    setWindows([...windows, { id, title, content, isOpen: true }]);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(win => win.id !== id));
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', background: '#f0f0f0' }}>
      {windows.map(win => (
        <Window key={win.id} {...win} onClose={() => closeWindow(win.id)} />
      ))}
      <Taskbar onOpen={openWindow} />
    </div>
  );
};

export default WindowManager;
