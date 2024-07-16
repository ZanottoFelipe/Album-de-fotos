import React from "react";

function Searchbar({ setQuery, setCategoria, setActivateSearch }) {
  const categorias = [
    "Natureza",
    "Animais",
    "Cidade",
    "Esportes",
    "Música",
    "Cinema",
  ];

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for images..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => setActivateSearch(true)}>Pesquisar</button>
      <select onChange={(e) => setCategoria(e.target.value)}>
        {categorias.map((category) => {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Searchbar;
