import React from 'react';
import { DataBrasil, MoedaReal } from '../../utils';

const Evento = ({ dados, mostraDetalhes }) => {
  const detalhesEvento = () => {
    if (dados.operacao === 'Venda') {
      mostraDetalhes(dados.id);
    }
  };

  return (
    <tr onClick={detalhesEvento}>
      <td>
        <DataBrasil data={dados.dataVenda} />
      </td>
      <td>{dados.operacao === 'Venda' && dados.id}</td>
      <td>{dados.operacao}</td>
      <td className="text-right">
        <MoedaReal
          valor={dados.operacao === 'Venda' ? dados.valor : dados.pago * -1}
        />
      </td>
    </tr>
  );
};

export default Evento;
