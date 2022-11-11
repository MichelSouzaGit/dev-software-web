import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { Rotas } from './components/routes/routes.jsx'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'


function App() {
  return (
      <div className="container">
        < NavBar />
        < Rotas />
        < Footer />
      </div>
  );
}

export default App;
