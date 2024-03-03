import React, { useState } from 'react';


}

const App = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  }

  return (
    <div>
      <SearchIcon onClick={toggleSearch} />
      {showSearch && <SearchCity />}
    </div>
  );
}

export default App;