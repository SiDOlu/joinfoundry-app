import React, { useEffect, useRef } from 'react';

const Window = ({ title, content, onClose }) => {
  const windowRef = useRef(null);

  useEffect(() => {
    // Save current focus to restore it later
    const previousActiveElement = document.activeElement;

    // Focus the window or first focusable element
    if (windowRef.current) {
        const focusableElements = windowRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        } else {
            windowRef.current.focus();
        }
    }

    // Keydown handler
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }

        if (e.key === 'Tab') {
            const focusableElements = windowRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length === 0) {
                e.preventDefault();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    };

    windowRef.current.addEventListener('keydown', handleKeyDown);

    // Cleanup: restore focus
    return () => {
        windowRef.current.removeEventListener('keydown', handleKeyDown);
        if (previousActiveElement) {
          previousActiveElement.focus();
        }
    };
  }, [onClose]);

  return (
    <section 
      ref={windowRef}
      tabIndex="-1"
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
