import '../App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router'; 

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        // Verifica se a resposta é um array ou tem propriedade products
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        setError("Não foi possível carregar os produtos. Tente novamente mais tarde.");
        console.error("Erro na requisição:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-yellow-600 text-2xl">Home page</h1>
      <h1 className="text-3xl font-bold text-emerald-800 mb-8 text-center">Produtos em Destaque</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Nenhum produto disponível</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/products/${product.id}`} className="block">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.cover} 
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300'; // Fallback image
                    }}
                  />
                </div>
                
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-600 font-bold">
                      {product.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </span>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded text-sm transition-colors">
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}