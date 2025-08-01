export function Logo() {
  return (
    <svg
      className="h-12 w-12 text-amber-500" // Cor e tamanho ajustáveis
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Cabeça do cachorro */}
      <circle cx="12" cy="10" r="5" />
      {/* Orelhas */}
      <path d="M8 6L6 4" />
      <path d="M16 6L18 4" />
      {/* Focinho */}
      <circle cx="12" cy="10" r="1" fill="currentColor" />
      {/* Boca (formato de "U") */}
      <path d="M10 13Q12 15 14 13" />
      {/* Corpo (opcional) */}
      <path d="M12 15L12 20" />
    </svg>
  );
}