import React, { useState, useEffect } from 'react';
import TelaPdv from '../../components/TelaPdv';
import TelaPagamento from '../../components/TelaPagamento';

import { hoje, amanha } from '../../constants';

import './styles.css';

const Pdv = () => {
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [pagando, setPagando] = useState(false);
  const [isFechadoCaixa, setIsFechadoCaixa] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [itensVendidos, setItensVendidos] = useState([]);

  const carregaProdutos = () => {
    fetch('http://pdv/exibir/produtos/')
      .then((response) => response.json())
      .then((responseJson) => {
        setProdutos(responseJson);
      });
  };

  const carregaClientes = () => {
    fetch('http://pdv/exibir/clientes/')
      .then((response) => response.json())
      .then((responseJson) => {
        setClientes(responseJson);
      });
  };

  const pagarAgora = (itensVendidos) => {
    setPagando(true);
    setItensVendidos(itensVendidos);
  };

  const pagar = async (resp) => {
    setIsWaiting(true);
    const resta =
      resp.venda.resta > 0
        ? parseFloat(resp.venda.resta)
            .toFixed(2)
            .replace(',', '.')
        : '0.00';
    const troco =
      resp.venda.resta < 0
        ? parseFloat(resp.venda.resta * -1)
            .toFixed(2)
            .replace(',', '.')
        : '0.00';

    await fetch(`http://pdv/gravar/vendas/`, {
      method: 'POST',
      body: JSON.stringify({
        cliente: resp.venda.cliente,
        total: parseFloat(resp.venda.total)
          .toFixed(2)
          .replace(',', '.'),
        desconto: parseFloat(resp.venda.desconto)
          .toFixed(2)
          .replace(',', '.'),
        totalAPagar: parseFloat(resp.venda.totalAPagar)
          .toFixed(2)
          .replace(',', '.'),
        pago: parseFloat(resp.venda.pago)
          .toFixed(2)
          .replace(',', '.'),
        formaPg: resp.venda.formaPg,
        resta: resta,
        operacao: 'Venda'
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // if (responseJson.resp === 'ok') {
        //   setVendaId(responseJson.id);
        // }

        resp.itensVendidos.forEach((item) => {
          fetch(`http://pdv/gravarItensVendidos/`, {
            method: 'POST',
            body: JSON.stringify({
              idVenda: responseJson.id,
              idProduto: item.id,
              quant: item.quant,
              unit: parseFloat(item.unit)
                .toFixed(2)
                .replace(',', '.'),
              subTotal: parseFloat(item.subTotal)
                .toFixed(2)
                .replace(',', '.')
            })
          })
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.resp === 'ok') {
                //console.log(responseJson)
              }
            });
        });
      });

    if (resp.venda.resta)
      fetch(`http://pdv/atualizaSaldo/`, {
        method: 'POST',
        body: JSON.stringify({
          id: resp.venda.cliente,
          saldo: parseFloat(resp.venda.resta)
            .toFixed(2)
            .replace(',', '.')
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.resp === 'ok') {
            //console.log(responseJson.sql)
          }
        });

    resp.itensVendidos.forEach((item) => {
      fetch(`http://pdv/diminuiEstoque/`, {
        method: 'POST',
        body: JSON.stringify({
          id: item.id,
          estoque: item.quant
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.resp === 'ok') {
            //console.log(responseJson)
          }
        });
    });

    fetch(`http://pdv/imprimeCupom/`, {
      method: 'POST',
      body: JSON.stringify({
        venda: {
          cliente: resp.venda.cliente,
          total: parseFloat(resp.venda.total)
            .toFixed(2)
            .replace(',', '.'),
          desconto: parseFloat(resp.venda.desconto)
            .toFixed(2)
            .replace(',', '.'),
          totalAPagar: parseFloat(resp.venda.totalAPagar)
            .toFixed(2)
            .replace(',', '.'),
          pago: parseFloat(resp.venda.pago)
            .toFixed(2)
            .replace(',', '.'),
          formaPg: resp.venda.formaPg,
          resta: resta,
          troco: troco
        },
        itensVendidos: resp.itensVendidos
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.resp === 'ok') {
          setIsWaiting(false);
          window.location.href = '/';
        }
      });
  };

  useEffect(() => {
    carregaProdutos();
    carregaClientes();

    fetch('http://pdv/exibir/vendas/', {
      method: 'POST',
      body: JSON.stringify({
        datai: hoje,
        dataf: amanha
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //setVendas(responseJson.filter((venda) => venda.dataVenda === hoje));

        const fechado = responseJson.filter(
          (venda) =>
            venda.operacao === 'Fechamento de caixa' &&
            venda.dataVenda === amanha
        );

        fechado.length && setIsFechadoCaixa(true);
      });
  }, []);

  if (isFechadoCaixa) {
    return (
      <div className="fechamento__aviso">Fechamento já realizado hoje</div>
    );
  } else if (isWaiting) {
    return (
      <div className="fechamento__aviso">Aguarde, realizando pagamento!</div>
    );
  } else if (pagando) {
    return (
      <>
        <TelaPagamento
          itens={itensVendidos}
          clientes={clientes}
          callbackParent={(resp) => pagar(resp)}
        />
      </>
    );
  } else {
    return (
      <>
        <TelaPdv
          produtos={produtos}
          callbackParent={(itensVendidos) => pagarAgora(itensVendidos)}
        />
      </>
    );
  }
};

export default Pdv;
