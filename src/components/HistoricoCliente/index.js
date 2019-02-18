import React, {Component, Fragment} from 'react';
import {Col, Button} from 'reactstrap';
import DataBrasil from '../../components/DataBrasil';
import MoedaReal from '../../components/MoedaReal';

import Evento from '../EventoHistorico';

import './styles.css';

class HistoricoCliente extends Component {
    constructor(props){
        super(props);

        this.state = {
            isDetalhesOpen: false,
            eventoAtual: []
        };
    }

    voltar = () => {
        this.props.voltar();
    }

    fechaDetalhesEvento = () => {
        this.setState({
            isDetalhesOpen: false
        });
    }

    mostraDetalhesEvento = (id) => {
        this.props.mostraItens(id);
        const evento = this.props.historico.filter(eventoHist => id === eventoHist.id);
        this.setState({
            isDetalhesOpen: true,
            eventoAtual: evento
        });

    }

    render(){
        const itens = (this.props.itensVenda)?this.props.itensVenda
        .map(item => 
            <Fragment key={item.id}>
                <tr>
                    <td>{item.produto}</td>
                    <td>{item.quant}</td>
                    <td className='text-right'><MoedaReal valor={item.unit} /></td>
                    <td className='text-right'><MoedaReal valor={item.subTotal} /></td>
                </tr>
            </Fragment>
        )
        :<tr><td></td></tr>;
        const historico = (this.props.historico.length)?
        (
            <Col md={6} className='cliente-historico'>
                <table className='table table-sm table-hover'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Data</th>
                            <th>Número da Venda</th>
                            <th>Operação</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.historico.filter(evento => (evento.valor!=='0.00' || evento.operacao==='Pagamento')).map(evento =>
                            <Evento key={evento.id} dados={evento} mostraDetalhes={this.mostraDetalhesEvento} />
                        )}
                    </tbody>
                </table>
            </Col>
        ):(
            <Col md={6} className='cliente-historico'>
                <h1>Nenhuma operação realizada por este cliente</h1>
            </Col>
        );
    
        const detalhesEvento = (this.state.eventoAtual.length)?(
            <Col md={6} className='detalhes-evento'>
                <Button color='danger' onClick={this.fechaDetalhesEvento} className='form-control'>Fecha detalhes</Button>
                <div className='container'>
                    Venda número: {this.state.eventoAtual[0].id}<br />
                    Data: <DataBrasil data={this.state.eventoAtual[0].dataVenda} /><br />
                    Total da venda: <MoedaReal valor={this.state.eventoAtual[0].total} /><br />
                    Desconto: <MoedaReal valor={this.state.eventoAtual[0].desconto} /><br />
                    Total a pagar: <MoedaReal valor={this.state.eventoAtual[0].totalAPagar} /><br />
                    Valor Pago: <MoedaReal valor={this.state.eventoAtual[0].pago} /><br />
                    Forma de pagamento: {this.state.eventoAtual[0].formaPg}<br />
                    Crediário: <MoedaReal valor={this.state.eventoAtual[0].resta} /><br />

                    <h2>Ítens da venda</h2>
                    <table className='table table-sm table-hover'>
                        <tbody>
                            {itens}
                        </tbody>
                    </table>
                </div>
            </Col>
        ):'';

        const mostra = (this.state.isDetalhesOpen)?detalhesEvento:historico;

        return (
            <div className='wrap-historicoCliente'>
                <Col md={6} className='cliente-detalhes'>
                    <Button color='success' onClick={this.voltar} className='form-control'>Voltar</Button>
                    <div className='container'>
                        Nome: {this.props.cliente.nome}<br />
                        Endereço: {this.props.cliente.endereco}<br />
                        CPF: {this.props.cliente.cpf}<br />
                        RG: {this.props.cliente.rg}<br />
                        Telefone: {this.props.cliente.fone}<br />
                        Saldo: <MoedaReal valor={this.props.cliente.saldo} /><br />
                        Data do Saldo: <DataBrasil data={this.props.cliente.dataSaldo||'0/0/0'} /><br />
                        Complemento: {this.props.cliente.complemento}<br />
                    </div>

                </Col>
                
                {mostra}
            </div>
        )
    };
};

export default HistoricoCliente;