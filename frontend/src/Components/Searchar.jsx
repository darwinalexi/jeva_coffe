import React from 'react';
import { Input } from '@nextui-org/react';

/**
 * Componente SearchBar - buscador responsive con NextUI.
 * 
 * Props:
 * - value: string - valor actual del input
 * - onChange: function - callback al cambiar el valor
 * - placeholder: string - texto placeholder (opcional, default "Buscar...")
 */
export default function SearchBar({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <Input
      clearable
      underlined
      fullWidth
      placeholder={placeholder}
      value={value}
      className="border-b-1 border-b-[#003333] rounded-b-xl focus:outline"
      onChange={onChange}
      aria-label="Campo de búsqueda"
      css={{
        maxWidth: '400px',
        minWidth: '200px',
        '@xsMax': {
          maxWidth: '100%',
        },
      }}
    />
  );
}

