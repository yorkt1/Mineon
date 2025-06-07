import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import ProductDetail from './pages/ProductDetail/ProductDetail.jsx';
import Login from './pages/Login/index.jsx';
import Register from './pages/Register/Register.jsx';
// Importe outras páginas aqui

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#f8f8f8', borderBottom: '1px solid #eee' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
        <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
        <Link to="/cadastro">Cadastre-se</Link>
        {/* Adicione outros links de navegação */}
      </nav>
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          {/* Adicione outras rotas */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;