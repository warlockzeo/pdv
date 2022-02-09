import React from 'react';
import { Button } from 'reactstrap';

import { tags as S } from '../../../components/tags';

const Produto = ({
  produto,
  produto: { preco, descr, estoque, id },
  callbackParent,
  excluir
}) => {
  const onClickDetalhes = () => {
    callbackParent({
      produto: produto,
      status: 'view'
    });
  };

  const onClickAtualizar = () => {
    callbackParent({
      produto: produto,
      status: 'update'
    });
  };

  const precoFormatado = parseFloat(preco).toFixed(2).replace('.', ',');

  return (
    <>
      <S.tdDescription>{descr}</S.tdDescription>
      <S.tdNumbers className='text-center d-xs-none'>{estoque}</S.tdNumbers>
      <S.tdNumbers className='text-right d-xs-none'>
        {precoFormatado}
      </S.tdNumbers>
      <S.tdButtons>
        <Button
          color='info'
          data-toggle='modal'
          data-target='#modalForm'
          onClick={onClickAtualizar}>
          <span className='d-xs-none'>Editar</span>{' '}
          <i className='fas fa-pencil-alt d-sm-none'></i>
        </Button>
        &nbsp;
        <Button
          color='primary'
          data-toggle='modal'
          data-target='#modalForm'
          onClick={onClickDetalhes}>
          <span className='d-xs-none'>Detalhes</span>{' '}
          <i className='far fa-eye d-sm-none'></i>
        </Button>
        &nbsp;
        <Button color='danger' onClick={() => excluir({ produto: id })}>
          <span className='d-xs-none'>Excluir</span>{' '}
          <i className='fas fa-minus  d-sm-none'></i>
        </Button>
      </S.tdButtons>
    </>
  );
};

export default Produto;
