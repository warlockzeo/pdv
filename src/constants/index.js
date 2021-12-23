import moment from 'moment';

export const hoje = moment().format('YYYY-MM-DD');

export const amanha = moment()
  .add(1, 'days')
  .format('YYYY-MM-DD');
