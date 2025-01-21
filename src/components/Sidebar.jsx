import Link from 'next/link';

const Sidebar = () => (
  <header className="bg-blue-600 text-white p-4">
    <nav className="container mx-auto flex justify-between">
      <h1 className="text-xl font-bold">Digitalización de Albaranes</h1>
      <ul className="flex space-x-4 items-center">
        <li><Link href="/index" className="hover:underline">Index</Link></li>
        <li><Link href="/client" className="hover:underline">Clientes</Link></li>
        <li><Link href="/projects" className="hover:underline">Proyectos</Link></li>
        <li><Link href="/deliverynotes" className="hover:underline">Albaranes</Link></li>
        <li><Link href="/onboarding" className="hover:underline">Login</Link></li>
      </ul>
    </nav>
  </header>
);

export default Sidebar;

//layout no cambia children si???