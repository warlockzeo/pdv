import React, { useState, useEffect } from 'react';
import { MoedaReal } from '../../utils';
import { hoje, amanha } from '../../constants';

import './styles.css';

const FechamentoCaixa = () => {
  const [vendas, setVendas] = useState([]);
  const [input, setInput] = useState(0);
  const [isFechado, setIsFechado] = useState(false);

  const atualizaInput = (e) => {
    setInput(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    fetch(`http://pdv/fechamentoDeCaixa/`, {
      method: 'POST',
      body: JSON.stringify({
        cliente: 0,
        pago: parseFloat(this.state.input)
          .toFixed(2)
          .replace(',', '.'),
        formaPg: 'Dinheiro',
        operacao: 'Fechamento de caixa'
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.resp === 'ok') {
          window.location.href = '/';
        }
      });
  };

  useEffect(() => {
    fetch('http://pdv/exibir/vendas/', {
      method: 'POST',
      body: JSON.stringify({
        datai: hoje,
        dataf: amanha
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setVendas(responseJson.filter((venda) => venda.dataVenda === hoje));

        const fechado = responseJson.filter(
          (venda) =>
            venda.operacao === 'Fechamento de caixa' &&
            venda.dataVenda === amanha
        );

        fechado.length && setIsFechado(true);
      });
  }, []);

  const total = vendas.length
    ? vendas.length > 1
      ? vendas
          .map(
            (evento) =>
              evento.operacao !== 'Fechamento de caixa' &&
              parseFloat(evento.pago)
          )
          .reduce((a, b) => a + b)
      : vendas[0].pago
    : '0,00';

  const mostra = isFechado ? (
    <div className="fechamento__aviso">Fechamento já realizado hoje</div>
  ) : (
    <form
      onSubmit={onSubmit}
      name="formFechamento"
      className="fechamento__form">
      <label className="fechamento__label">Valor do troco de amanhã:</label>
      <input
        className="form-control fechamento__input"
        type="text"
        placeholder="Valor"
        onChange={atualizaInput}
        value={input}
      />
      <button className="btn btn-success form-control">Fechar caixa</button>
    </form>
  );
  return (
    <div className="fechamento container">
      <div className="text-center">
        <h2>ATENÇÃO!</h2>O valor não pode ser corrigido e <br />
        nenhuma venda será realizada após fechamento do caixa.
      </div>

      <div className="fechamento__saldo">
        Saldo do caixa de hoje: <MoedaReal valor={total} />
      </div>

      {mostra}
    </div>
  );
};

export default FechamentoCaixa;
