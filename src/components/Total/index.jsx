import React from 'react';
import { MoedaReal } from '../../utils';
import { Total as S } from './styles';

const Total = ({ value }) => {
  return (
    <S.wrap>
      <MoedaReal valor={value} />
    </S.wrap>
  );
};

export default Total;
