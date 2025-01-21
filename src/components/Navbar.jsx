import React, { useState } from 'react';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Llamar al manejador de búsqueda pasado desde el componente padre
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Digitalización de Albaranes</h1>
        <form onSubmit={handleSearch} className="flex space-x-2">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded text-black"
          />
          <button type="submit" className="bg-white text-blue-600 p-2 rounded">
            Buscar
          </button>
        </form>
      </div>
    </header>
  );
};

export default Navbar;
