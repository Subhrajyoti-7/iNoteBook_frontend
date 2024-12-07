import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route path="/" element=<Home /> />
            <Route path="/about" element=<About /> />
            <Route path="/login" element=<Login showAlert={showAlert} /> />
            <Route path="/signup" element=<Signup showAlert={showAlert} /> />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
