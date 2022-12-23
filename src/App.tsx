import * as React from 'react';
import './App.css';

import ProductList from './ProductList';
import Search from './Search';

export default function App() {
  const [filter, setFilter] = React.useState('');

  return (
    <div>
      <Search defaultValue={filter} onSearch={setFilter} />
      <ProductList filter={filter} />
    </div>
  );
}
