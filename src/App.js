import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import PublicView from './components/PublicView';

function AppContent() {
  const [people, setPeople] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('people');
    if (stored) {
      setPeople(JSON.parse(stored));
    }

    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('people', JSON.stringify(people));
  }, [people]);

  const savePeople = (list) => {
    setPeople(list);
    localStorage.setItem('people', JSON.stringify(list));
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('adminLoggedIn', 'true');
    navigate("");
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    navigate("");
  };

  const handleAddPerson = (person) => {
    savePeople([...people, person]);
  };

  const handleUpdatePerson = (idx, updatedPerson) => {
    const updated = [...people];
    updated[idx] = updatedPerson;
    savePeople(updated);
  };

  const handleDeletePerson = (idx) => {
    const filtered = people.filter((_, i) => i !== idx);
    savePeople(filtered);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Navigation />
              <PublicView people={people} />
            </>
          } />
          <Route path="/admin" element={<AdminLogin onLogin={handleAdminLogin} />} />
          <Route path="*" element={
            <>
              <Navigation />
              <PublicView people={people} />
            </>
          } />
        </Routes>
        <footer>
          <p>📇 Person Directory © 2026 | <a href="/admin" className="admin-link">Admin Login</a></p>
        </footer>
      </div>
    );
  }

  return (
    <div className="App">
      <AdminPanel
        people={people}
        onAddPerson={handleAddPerson}
        onUpdatePerson={handleUpdatePerson}
        onDeletePerson={handleDeletePerson}
        onLogout={handleAdminLogout}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
