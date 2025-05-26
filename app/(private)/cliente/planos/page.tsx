"use client";

import React, { useEffect, useState } from 'react';

const PlanosPage = () => {
  interface Plano {
    id: number;
    nome: string;
    descricao: string;
    preco: string;
  }

  const [planos, setPlanos] = useState<Plano[]>([]);

  useEffect(() => {
    // Mock data
    const mockPlanos = [
      { id: 1, nome: 'Plano 1',
        descricao: 'descrição.', 
        preco: 'R$ 29,90'
    },
      { id: 2, nome: 'plano 2', 
        descricao: 'descrição.', 
        preco: 'R$ 59,90'
      },
      { id: 3, 
        nome: 'plano 3', 
        descricao: 'descrição.', 
        preco: 'R$ 99,90'
    },
    ];

    setPlanos(mockPlanos);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Serviços Disponíveis</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {planos.length > 0 ? (
          planos.map((plano) => (
            <div
              key={plano.id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold">{plano.nome}</h2>
              <p className="text-gray-600">{plano.descricao}</p>
              <p className="text-lg font-bold mt-2">{plano.preco}</p>
              <button className="mt-4 bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600">
                Assinar
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Carregando planos...</p>
        )}
      </div>
    </div>
  );
};

export default PlanosPage;