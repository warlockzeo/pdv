import { initialState as pdvInitialState } from '../reducers/pdv';

export const getIsLogged = (store) =>
  store?.pdv?.logged ? store.pdv.logged : pdvInitialState.pdv;
