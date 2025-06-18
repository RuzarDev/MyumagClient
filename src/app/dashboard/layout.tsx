import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const Layout = ({children}) => {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 md:p-6">
          {children} {/* Здесь рендерится содержимое страниц */}
        </div>
      </div>
    </div>
  );
};

export default Layout;