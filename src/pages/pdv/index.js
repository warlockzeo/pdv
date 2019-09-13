import React, { Component, Fragment } from 'react';
import moment from 'moment';
import TelaPdv from '../../components/TelaPdv';
import TelaPagamento from '../../components/TelaPagamento';

import './styles.css';

export default class Pdv extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: [],
      clientes: [],
      pagando: false,
      vendaId: 0,
      isFechadoCaixa: false,
      isWaiting: false
    };
  }

  //carrega informações dos produtos no state
  carregaProdutos() {
    fetch('http://pdv/exibir/produtos/')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          produtos: responseJson
        });
      });
  }

  //carrega informações dos clientes no state
  carregaClientes() {
    fetch('http://pdv/exibir/clientes/')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          clientes: responseJson
        });
      });
  }

  //função do callback para o botão pagar agora no componente telaPdv
  pagarAgora = itensVendidos => {
    this.setState({
      pagando: true,
      itensVendidos: itensVendidos
    });
  };

  //recebe os dados de pagamento e da venda e envia para pi para gravar no banco de dados
  pagar = async resp => {
    this.setState({ isWaiting: true });
    //1º gravar dados da venda(valor,id do cliente, total pago, etc)
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
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp === 'ok') {
          this.setState({ vendaId: responseJson.id });
          console.log(responseJson);
        }

        resp.itensVendidos.forEach(item => {
          //2º grava itens vendidos
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
            .then(response => response.json())
            .then(responseJson => {
              if (responseJson.resp === 'ok') {
                //console.log(responseJson)
              }
            });
        });
      }); //fim do 1º passo

    //3º atualiza saldo do cliente
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
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.resp === 'ok') {
            //console.log(responseJson.sql)
          }
        });

    //4º atualizar estoques
    resp.itensVendidos.forEach(item => {
      //atualiza estoques
      fetch(`http://pdv/diminuiEstoque/`, {
        method: 'POST',
        body: JSON.stringify({
          id: item.id,
          estoque: item.quant
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.resp === 'ok') {
            //console.log(responseJson)
          }
        });
    }); //fim do map()

    //5º imprimir cupom
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
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp === 'ok') {
          this.setState({ isWaiting: false });
          window.location.href = '/';
        }
      }); //fim do 5º passo
  };

  componentDidMount() {
    this.carregaProdutos();
    this.carregaClientes();

    const hoje = moment().format('YYYY-MM-DD');
    const amanha = moment()
      .add(1, 'days')
      .format('YYYY-MM-DD');

    fetch('http://pdv/exibir/vendas/', {
      method: 'POST',
      body: JSON.stringify({
        datai: hoje,
        dataf: amanha
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          vendas: responseJson.filter(venda => venda.dataVenda === hoje)
        });

        const fechado = responseJson.filter(
          venda =>
            venda.operacao === 'Fechamento de caixa' &&
            venda.dataVenda === amanha
        );

        fechado.length && this.setState({ isFechadoCaixa: true });
      });
  }

  render() {
    if (this.state.isFechadoCaixa) {
      return (
        <div className='fechamento__aviso'>Fechamento já realizado hoje</div>
      );
    } else if (this.state.isWaiting) {
      return (
        <div className='fechamento__aviso'>Aguarde, realizando pagamento!</div>
      );
    } else if (this.state.pagando) {
      return (
        <Fragment>
          <TelaPagamento
            itens={this.state.itensVendidos}
            clientes={this.state.clientes}
            callbackParent={resp => this.pagar(resp)}
          />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <TelaPdv
            produtos={this.state.produtos}
            callbackParent={itensVendidos => this.pagarAgora(itensVendidos)}
          />
        </Fragment>
      );
    }
  }
}
