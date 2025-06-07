import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../Services/api.js';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/produtos/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Produto não encontrado ou erro ao carregar.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Produto não disponível.</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl || 'https://via.placeholder.com/400x300'} alt={product.name} style={{ maxWidth: '400px' }} />
      <p><strong>Preço:</strong> R$ {product.price.toFixed(2)}</p>
      <p><strong>Descrição:</strong> {product.description}</p>
      <p><strong>Estoque:</strong> {product.stock}</p>
      <button style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Adicionar ao Carrinho</button>
    </div>
  );
};

export default ProductDetail;