import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/DashBoard';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckCircle, faCoffee } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faCheckCircle, faCoffee)
function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
