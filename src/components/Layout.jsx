import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, onSearch }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64">
      <Navbar onSearch={onSearch} />
      <main className="p-4">{children}</main>
      <Footer />
    </div>
  </div>
);

export default Layout;
