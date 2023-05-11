import React from 'react';
import './App.css';
import Home from './paginas/home/Home';
import Navbar from './componentes/estaticos/navbar/Navbar';
import Footer from './componentes/estaticos/footer/Footer';
import Login from './paginas/login/Login';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import Cotacoes from './paginas/apolices/ApolicesLista';
import Propostas from './paginas/proposta/Propostas';
import Apolices from './paginas/apolices/Apolices';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: '85vh' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastrousuario" element={<CadastroUsuario />} />
          <Route path= "/cotacoes" element={<Cotacoes />} />
          <Route path="/propostas" element={<Propostas/>}/>
          <Route path='/apolices' element={<Apolices/>}/>
          <Route path='/apolices-lista' element={<ApolicesLista/>}/>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;