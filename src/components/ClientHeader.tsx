import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  activeTab: 'orders' | 'check' | 'client';
  setActiveTab: (tab: 'orders' | 'check' | 'client') => void;
  setOpenModal: (value: boolean) => void;
}

const ClientHeader: React.FC<HeaderProps> = ({ activeTab, setActiveTab,setOpenModal}) => {
  return (
    <div className="bg-gray-800 text-white flex justify-between items-center">
      <div className="flex">
        <button
          className={`px-6 py-5 ${activeTab === 'orders' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <Link href={'/dashboard'}>Back to Dashboard</Link>
        </button>
        <button
          className={`px-6 py-5 ${activeTab === 'check' ? 'bg-white text-gray-800' : ''}`}
          onClick={() => setActiveTab('check')}
        >
          Чек
        </button>
        <button
          className={`px-6 py-5 ${activeTab === 'client' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('client')}
        >
          Клиент
        </button>
      </div>

      <div className="flex items-center pr-4">
        <div className="mx-2">
            <span>▼</span>
        </div>
        <div className="mx-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-receipt">
            <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/>
            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
            <path d="M12 17.5v-11"/>
          </svg>
        </div>
        <div className="mx-2 flex items-center" onClick={() => setOpenModal(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
        </div>
        <div className="mx-2 flex items-center font-medium">
          <span className="mr-2">Уразов Рузар</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <div className="ml-2 w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ClientHeader;