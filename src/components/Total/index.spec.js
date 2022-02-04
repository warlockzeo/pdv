import React from 'react';
import { render } from '@testing-library/react';
import Total from './index';

describe('hhg', () => {
  it('render value', () => {
    const { getByTestId } = render(<Total value={5} />);
    expect(getByTestId('total-green-value').textContent).toEqual('R$ 5,00');
  });

  it('render value 2', () => {
    const { getByTestId } = render(<Total value={5} />);
    const val = getByTestId('total-green-value').textContent;
    const val2 = val.includes('R$');
    expect(val2).toBeTruthy();
  });
});
