import { Input } from '@nextui-org/react';

export default function SearchBar({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <Input
      clearable
      underlined
      fullWidth
      placeholder={placeholder}
      value={value}
      className="border-b-1 border-b-[#003333] rounded-b-xl focus:outline "
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

