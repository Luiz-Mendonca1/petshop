import { Link } from 'react-router';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-emerald-600 text-white shadow-lg mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Grid de conteúdo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Seção 1: Logo e descrição */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <svg
                className="h-8 w-8 text-amber-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="10" r="4" />
                <path d="M8 6L6 4" />
                <path d="M16 6L18 4" />
                <circle cx="12" cy="10" r="1" fill="currentColor" />
                <path d="M10 13Q12 15 14 13" />
              </svg>
              <h2 className="text-xl font-bold">PetShop Feliz</h2>
            </Link>
            <p className="text-center md:text-left text-emerald-100">
              Cuidando do seu pet com amor e qualidade desde 2023.
            </p>
          </div>

          {/* Seção 2: Links rápidos */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 text-amber-200">Links Rápidos</h3>
            <ul className="space-y-2 text-center">
              <li><Link to="/products" className="hover:text-amber-300 transition-colors">Produtos</Link></li>
              <li><Link to="/services" className="hover:text-amber-300 transition-colors">Serviços</Link></li>
              <li><Link to="/about" className="hover:text-amber-300 transition-colors">Sobre Nós</Link></li>
              <li><Link to="/contact" className="hover:text-amber-300 transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Seção 3: Contatos */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 text-amber-200">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-amber-300" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-amber-300" />
                <span>contato@petshopfeliz.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-amber-300" />
                <span>Rua dos Pets, 123 - São Paulo</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Redes sociais e copyright */}
        <div className="border-t border-emerald-500 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-amber-300 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-amber-300 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-amber-300 transition-colors">
              <Twitter size={20} />
            </a>
          </div>
          <p className="text-sm text-emerald-100">
            © {new Date().getFullYear()} PetShop Feliz. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}