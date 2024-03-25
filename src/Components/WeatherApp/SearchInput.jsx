import React, {useState} from 'react';

const SearchInput = ({ onSearch }) => {

  const [query, setQuery] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery('');
  }
  return (
    <form onSubmit={handleSearch}>
      <input 
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-field"
      />
    </form>
  );
};

export default SearchInput;