export const MoedaReal = ({ valor }) => {
  const moeda = (val) => {
    const valorFormatado = parseFloat(val).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }); // R$1.231.230.123,23
    return valorFormatado;
  };

  return moeda(valor);
};
