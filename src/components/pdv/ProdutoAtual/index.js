import React, { useState } from 'react';

const ProdutoAtual = ({ dados, callbackParent }) => {
  const [subTotal, setSubTotal] = useState(0);

  const mudaSubtotal = (e) => {
    if (dados) {
      setSubTotal(dados.preco * parseInt(e.currentTarget.value));
    }
  };

  const quantOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (e.currentTarget.value > 0 && subTotal > 0) {
        callbackParent({ subTotal });
      }
      limpar();
    }
  };

  const limpar = () => {
    document.querySelector('.choose-produto__quant-input').value = '0';
    setSubTotal(0.0);
    document.querySelector('.input-autocomplete').value = '';
    document.querySelector('.input-autocomplete').focus();
  };

  const preco = dados ? dados.preco : '0,00';

  return (
    <>
      <div className="choose-produto__quant">
        <span className="choose-produto__quant-legenda">Quant:</span>
        <input
          className="form-control choose-produto__quant-input"
          onChange={mudaSubtotal}
          onKeyDown={quantOnKeyDown}
          onBlur={limpar}
          type="number"
          id="quant"
          min="1"
          defaultValue="0"
        />
      </div>
      <div className="choose-produto__preco">
        <span className="choose-produto__preco-legenda">Preço:</span>
        <input
          className="form-control choose-produto__preco-input"
          type="text"
          id="preco"
          disabled
          value={parseFloat(preco)
            .toFixed(2)
            .replace('.', ',')}
        />
      </div>
      <div className="choose-produto__preco-subtotal">
        <span className="choose-produto__preco-subtotal-legenda">
          Sub-total:
        </span>
        <input
          className="form-control choose-produto__preco-subtotal-input"
          type="text"
          id="preco-subtotal"
          disabled
          value={subTotal.toFixed(2).replace('.', ',')}
        />
      </div>
    </>
  );
};

export default ProdutoAtual;
