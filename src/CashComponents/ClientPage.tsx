import React, { useState } from 'react';
import { Client } from '../types';
import { clients } from '../data/clients';

interface ClientPageProps {
  onSelectClient: (client: Client) => void;
}

const ClientPage: React.FC<ClientPageProps> = ({ onSelectClient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client.id);
    setTimeout(() => {
      onSelectClient(client);
    }, 300);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск по имени или телефону"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        {filteredClients.map(client => (
          <div
            key={client.id}
            onClick={() => handleClientSelect(client)}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedClient === client.id
                ? 'bg-green-100 border-green-500'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{client.name}</h3>
                <p className="text-gray-600">{client.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Визитов: {client.visits}</p>
                <p className="text-sm text-gray-500">
                  Последний визит: {new Date(client.lastVisit).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientPage;