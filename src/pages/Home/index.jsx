import React, { useEffect, useState } from 'react';
import api from '../../Services/api.js';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await api.get('/produto');
        setProducts(productsResponse.data);

        const categoriesResponse = await api.get('/categoria');
        setCategories(categoriesResponse.data);
      } catch (err) {
        setError('Erro ao carregar dados. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Bem-vindo à nossa loja!</h1>

      <div
        style={{
          background: '#f0f0f0',
          padding: '20px',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        <h2>Promoções Imperdíveis!</h2>
        <p>Aproveite nossos descontos especiais.</p>
        <img
          src="https://via.placeholder.com/800x200?text=Banner+Promocional"
          alt="Banner Promo"
          style={{ maxWidth: '100%' }}
        />
      </div>

      <h2>Categorias</h2>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap',
        }}
      >
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/categorias/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </ul>

      <h2>Produtos em Destaque</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
        {products.slice(0, 6).map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '5px',
              textAlign: 'center',
            }}
          >
            <img
              src={product.imageUrl || 'https://via.placeholder.com/150'}
              alt={product.name}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                marginBottom: '10px',
              }}
            />
            <h3>{product.name}</h3>
            <p>R$ {(product.preco?.toFixed(2) ?? '0.00').replace('.', ',')}</p>
            <Link
              to={`/produto/${product.id}`}
              style={{
                display: 'inline-block',
                padding: '8px 15px',
                background: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
              }}
            >
              Ver Detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
