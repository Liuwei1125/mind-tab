import React, { useEffect } from 'react';
import NewTabPage from './pages/NewTabPage';
import PopupPage from './pages/PopupPage';
import OptionsPage from './pages/OptionsPage';

function App() {
  useEffect(() => {
    console.log('[MindTab] Application mounted');
  }, []);

  const path = window.location.pathname;

  if (path.includes('popup')) {
    return <PopupPage />;
  }

  if (path.includes('options')) {
    return <OptionsPage />;
  }

  return <NewTabPage />;
}

export default App;
