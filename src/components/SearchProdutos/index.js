import React, { useState, useEffect } from 'react';
import Autocomplete from '../Autocomplete';

const SearchProdutos = (props) => {
  const [produtos, setProdutos] = useState([]);

  const loadProducts = async () => {
    // const response = await Api.get(`/produtos`);
    // setProdutos(response.data);

    setProdutos([
      'Alligator',
      'Bask',
      'Crocodilian',
      'Death Roll',
      'Eggs',
      'Jaws',
      'Reptile',
      'Solitary',
      'Tail',
      'Wetlands'
    ]);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <Autocomplete suggestions={produtos} />
    </>
  );
};

export default SearchProdutos;
