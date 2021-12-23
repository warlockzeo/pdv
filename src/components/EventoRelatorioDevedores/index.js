import React from 'react';
import { MoedaReal } from '../../utils';

const EventoRelatorioDevedores = ({ evento }) => {
  const { nome, endereco, fone, saldo } = evento;
  return (
    <tr
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch'
      }}>
      <td style={{ flex: '0 1 40%' }} className="text-left">
        {nome}
      </td>
      <td style={{ flex: '0 1 30%' }} className="text-left">
        {endereco}
      </td>
      <td style={{ flex: '0 1 15%' }} className="text-left">
        {fone}
      </td>
      <td style={{ flex: '0 1 15%' }} className="text-right">
        <MoedaReal valor={saldo} />
      </td>
    </tr>
  );
};

export default EventoRelatorioDevedores;
