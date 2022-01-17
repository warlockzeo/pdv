import React from 'react';
import { MoedaReal } from '../../utils';

const EventoRelatorioDevedores = ({ evento }) => {
  const { nome, endereco, fone, saldo } = evento;

  return (
    <tr>
      <td className='text-left'>{nome}</td>
      <td className='text-left'>{endereco}</td>
      <td className='text-left'>{fone}</td>
      <td className='text-right'>
        <MoedaReal valor={saldo} />
      </td>
    </tr>
  );
};

export default EventoRelatorioDevedores;
