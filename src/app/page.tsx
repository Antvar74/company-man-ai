// Ruta: src/app/page.tsx (Versión Simplificada y Refinada)
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">

      <div className="flex flex-col items-center text-center">

        {/* Contenedor del Logo */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-10">
          <Image
            src="/logo.jpeg" // ACTUALIZADO a .jpeg según tu archivo
            alt="Company Man AI Logo"
            fill
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Botón de Entrada */}
        <Link 
          href="/calculators" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          Entrar
        </Link>

      </div>
    </div>
  );
}