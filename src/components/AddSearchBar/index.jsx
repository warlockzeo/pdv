import React from 'react';
import { Button } from 'reactstrap';
import { AddSearchBar as S } from './styled.js';

const AddSearchBar = ({ busca, onClickNovo }) => {
  return (
    <S.wrap>
      <Button
        color='success'
        className='col-xs-3 form-control'
        data-toggle='modal'
        data-target='#modalForm'
        onClick={onClickNovo}>
        <i className='fas fa-plus'></i> <span className='d-xs-none'>Novo</span>
      </Button>

      <input
        placeholder='Busca'
        className='col-xs-9 form-control'
        onChange={busca}
      />
    </S.wrap>
  );
};

export default AddSearchBar;
