function SearchBar({ value, onChange, placeholder = 'Buscar dulce...' }) {
  return (
    <label className="block w-full max-w-md">
      <span className="sr-only">Buscar dulces</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-white/10 bg-surface px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
      />
    </label>
  )
}

export default SearchBar