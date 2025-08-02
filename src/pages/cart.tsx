import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Trash2, Plus, Minus } from 'lucide-react';
import type { Product } from './home';

interface CartItem extends Product {
  quantity: number;
}

export function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carrega os produtos da API e inicializa o carrinho
  useEffect(() => {
    const fetchProductsAndInitializeCart = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        const products: Product[] = Array.isArray(data) ? data : data.products || [];
        
        // Inicializa o carrinho com 1 unidade de cada produto (ou pode carregar de localStorage)
        
        
        
      } catch (err) {
        setError("Não foi possível carregar os produtos.");
        console.error("Erro na requisição:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndInitializeCart();
  }, []);

  // Calcula o total do carrinho
  const total = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );

  // Atualiza a quantidade de um item no carrinho
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove um item do carrinho
  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

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

  return (
    <div className="container  mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-emerald-800 mb-8">Seu Carrinho</h1>
      
      {cartItems.length === 0 ? (
       <div className="flex flex-col items-center justify-center min-h-[50vh] py-10">
          <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
          <Link 
            to="/" 
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded inline-block transition-colors"
          >
            Continuar comprando
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cartItems.map(item => (
                <div 
                  key={item.id} 
                  className="border-b border-gray-200 last:border-b-0 p-4 flex flex-col sm:flex-row"
                >
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                    <img 
                      src={item.cover} 
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
                      }}
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-emerald-600 font-bold">
                          {item.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div className="mt-4 flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>
                      
                      <span className="mx-4">{item.quantity}</span>
                      
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>
                      {(item.price * item.quantity).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    {total.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
              </div>
              
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-bold transition-colors">
                Finalizar Compra
              </button>
              
              <Link 
                to="/" 
                className="mt-4 inline-block text-center w-full text-emerald-600 hover:underline"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}