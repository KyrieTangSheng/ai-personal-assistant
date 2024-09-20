import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { MainPage } from './components/MainPage';
import { ChatPage } from './components/Chat/ChatPage';
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <h1>AI Personal Assistant</h1>
        </header>
        <main>
          <Routes>
            <Route path='/' element = {<MainPage />} />
            <Route path='/chat/*' element = {<ChatPage />} />
          </Routes> 
        </main>
      </div>
    </Router>
  );
}

export default App;
