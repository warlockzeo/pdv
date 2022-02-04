import React from 'react';
import { MoedaReal } from '../../utils';
import { Total as S } from './styles';

const Total = ({ value }) => {
  return (
    <S.wrap>
      <div data-testid='total-green-value'>
        <MoedaReal valor={value} />
      </div>
    </S.wrap>
  );
};

export default Total;
