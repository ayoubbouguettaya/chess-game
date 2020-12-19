import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import MainRouter from './pages';
import { GameProvider } from './store';

function App() {
  return (
    <GameProvider>
      <Router>
        <MainRouter />
      </Router>
    </GameProvider>
  );
}

export default App;
