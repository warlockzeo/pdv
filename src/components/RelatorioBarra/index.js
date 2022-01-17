import React from 'react';
import moment from 'moment';
import { Button } from 'reactstrap';
import { hoje } from '../../constants';

import { RelatorioBarra as S } from './styles';

const RelatorioBarra = ({ datai, dataf, mudaDatai, mudaDataf }) => {
  const diario = () => {
    mudaDatai(hoje);
    mudaDataf('');
  };

  const semanal = () => {
    const domingo = moment().startOf('week').format('YYYY-MM-DD');
    const sabado = moment().endOf('week').format('YYYY-MM-DD');

    mudaDatai(domingo);
    mudaDataf(sabado);
  };

  const mensal = () => {
    const inicioMes = moment().format('YYYY-MM-01');
    const fimMes = moment().endOf('month').format('YYYY-MM-DD');

    mudaDatai(inicioMes);
    mudaDataf(fimMes);
  };

  // useEffect(() => {
  //   mudaDatai(hoje);
  // }, []);

  return (
    <S.wrap>
      <input
        type='date'
        id='datai'
        className='form-control'
        onChange={mudaDatai}
        value={datai || hoje}
      />

      <input
        type='date'
        id='dataf'
        className='form-control'
        onChange={mudaDataf}
        value={dataf}
      />

      <Button color='primary' className='form-control' onClick={diario}>
        Diário
      </Button>

      <Button color='success' className='form-control' onClick={semanal}>
        Semanal
      </Button>

      <Button color='warning' className='form-control' onClick={mensal}>
        Mensal
      </Button>
    </S.wrap>
  );
};

export default RelatorioBarra;
