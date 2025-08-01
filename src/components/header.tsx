import { Link } from 'react-router';
import { ShoppingCart, User } from 'lucide-react'; // Ícones (pode usar outra biblioteca)
import { Logo } from './logo';

export function Header() {
  return (
    <header className="bg-emerald-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo e Nome do PetShop */}
        <Link to="/" className="flex items-center gap-2">
          <Logo /> {/* Componente SVG criado anteriormente */}
          <h1 className="text-xl font-bold">PetShop Feliz</h1>
        </Link>

        {/* Navegação */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-amber-200 transition-colors">Home</Link>
          <Link to="/products" className="hover:text-amber-200 transition-colors">Produtos</Link>
          <Link to="/services" className="hover:text-amber-200 transition-colors">Serviços</Link>
          <Link to="/about" className="hover:text-amber-200 transition-colors">Sobre Nós</Link>
        </nav>

        {/* Ícones de Ação */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="p-2 hover:bg-emerald-700 rounded-full transition-colors relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-amber-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3 {/* Número dinâmico do carrinho */}
            </span>
          </Link>
          
          <Link to="/login" className="p-2 hover:bg-emerald-700 rounded-full transition-colors">
            <User size={20} />
          </Link>
        </div>
      </div>

      {/* Menu Mobile (opcional) */}
      <div className="md:hidden bg-emerald-700 px-4 py-2">
        <div className="flex justify-around">
          <Link to="/" className="text-sm">Home</Link>
          <Link to="/products" className="text-sm">Produtos</Link>
          <Link to="/services" className="text-sm">Serviços</Link>
        </div>
      </div>
    </header>
  );
}