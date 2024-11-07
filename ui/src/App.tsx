import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { MainPage } from './components/MainPage';
import { ChatPage } from './components/Chat/ChatPage';

function App() {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeader(false);
    }, 3000); // Header will disappear after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App">
        {showHeader && (
          <header className={`App-header full-screen`}>
            <h1>AI Personal Assistant</h1>
          </header>
        )}
        {!showHeader && (
        <main>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/chat/*' element={<ChatPage />} />
          </Routes> 
        </main>
        )}
      </div>    
    </Router>
  );
}

export default App;
