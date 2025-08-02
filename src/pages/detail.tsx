import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react'; // Ícone para voltar (opcional)

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  // Adicione outras propriedades conforme necessário
}

export function Detail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError("Não foi possível carregar o produto. Tente novamente mais tarde.");
        console.error("Erro na requisição:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
        <Link to="/" className="text-emerald-600 hover:underline mt-4 inline-block">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Produto não encontrado</p>
        <Link to="/" className="text-emerald-600 hover:underline mt-4 inline-block">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link 
        to="/" 
        className="flex items-center text-emerald-600 hover:text-emerald-800 mb-6"
      >
        <ArrowLeft className="mr-2" size={20} />
        Voltar para produtos
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={product.cover} 
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600';
              }}
            />
          </div>
          
          <div className="p-6 md:w-1/2">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
            
            <div className="mb-4">
              <span className="text-emerald-600 font-bold text-xl">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </span>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Descrição</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded transition-colors">
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}