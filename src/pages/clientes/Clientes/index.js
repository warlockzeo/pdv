import React from 'react';
import { Button } from 'reactstrap';
import { MoedaReal } from '../../../utils';

import { tags as S } from '../../../components/tags';

const Clientes = ({ cliente, historico, callbackParent, excluir, pagar }) => {
  const onClickAtualizar = async () => {
    await callbackParent({
      cliente,
      status: 'update'
    });
  };

  const onClickExcluir = async () => {
    await excluir({ cliente: cliente.id });
  };

  return (
    <>
      <S.tdDescription>{cliente.nome}</S.tdDescription>
      <td className='d-xs-none'>{cliente.fone}</td>
      <td className='d-xs-none'>
        <MoedaReal valor={cliente.saldo} />
      </td>
      <S.tdButtons>
        <Button
          color='success'
          data-toggle='modal'
          data-target='#modalPagarForm'
          onClick={() => pagar({ cliente })}>
          <span className='d-xs-none'>Pagar</span>{' '}
          <i className='fas fa-dollar-sign d-sm-none' />
        </Button>
        &nbsp;
        <Button
          color='info'
          data-toggle='modal'
          data-target='#modalForm'
          onClick={onClickAtualizar}>
          <span className='d-xs-none'>Editar</span>{' '}
          <i className='fas fa-pencil-alt d-sm-none' />
        </Button>
        &nbsp;
        <Button color='primary' onClick={() => historico({ cliente })}>
          <span className='d-xs-none'>Detalhes</span>{' '}
          <i className='far fa-eye d-sm-none' />
        </Button>
        &nbsp;
        <Button color='danger' onClick={onClickExcluir}>
          <span className='d-xs-none'>Excluir</span>{' '}
          <i className='fas fa-minus d-sm-none' />
        </Button>
      </S.tdButtons>
    </>
  );
};

export default Clientes;
