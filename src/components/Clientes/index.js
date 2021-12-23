import React from 'react';
import { Button } from 'reactstrap';
import { MoedaReal } from '../../utils';

import './styles.css';

const Clientes = ({ cliente, historico, callbackParent, excluir, pagar }) => {
  const onClickDetalhes = async () => {
    await historico({ cliente });
  };

  const onClickAtualizar = async () => {
    await callbackParent({
      cliente,
      status: 'update'
    });
  };

  const onClickExcluir = async () => {
    await excluir({ cliente: cliente.id });
  };

  const onClickPagar = () => {
    pagar({ cliente });
  };

  return (
    <>
      <td style={{ flex: '0 1 45%' }} className="text-left">
        {cliente.nome}
      </td>
      <td style={{ flex: '10%' }} className="d-xs-none text-left">
        {cliente.fone}
      </td>
      <td style={{ flex: '10%' }} className="d-xs-none text-right">
        <MoedaReal valor={cliente.saldo} />
      </td>
      <td style={{ flex: '1 0 40%' }} className="text-right">
        <Button
          color="success"
          data-toggle="modal"
          data-target="#modalPagarForm"
          onClick={onClickPagar}>
          <span className="d-xs-none">Pagar</span>{' '}
          <i className="fas fa-dollar-sign d-sm-none" />
        </Button>
        &nbsp;
        <Button
          color="info"
          data-toggle="modal"
          data-target="#modalForm"
          onClick={onClickAtualizar}>
          <span className="d-xs-none">Editar</span>{' '}
          <i className="fas fa-pencil-alt d-sm-none" />
        </Button>
        &nbsp;
        <Button color="primary" onClick={onClickDetalhes}>
          <span className="d-xs-none">Detalhes</span>{' '}
          <i className="far fa-eye d-sm-none" />
        </Button>
        &nbsp;
        <Button color="danger" onClick={onClickExcluir}>
          <span className="d-xs-none">Excluir</span>{' '}
          <i className="fas fa-minus  d-sm-none" />
        </Button>
      </td>
    </>
  );
};

export default Clientes;
