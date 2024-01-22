// Import necessary modules
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import ContactList from './components/ContactList';
import ContactImport from './components/ContactImport';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact component={ContactImport} />
          <Route path="/contacts" component={ContactList} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
