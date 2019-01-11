import React, {Component, Fragment} from 'react';
import TelaPdv from '../../components/TelaPdv';
import TelaPagamento from '../../components/TelaPagamento';

import './styles.css';

export default class Pdv extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produtos: [],
            clientes: [],
            pagando:false
        };
    }

    exibirProdutos(){
        fetch("http://pdv/exibir/produtos/")
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            this.setState({
                produtos:responseJson
            });
        })
    }

    exibirClientes(){
        fetch("http://pdv/exibir/clientes/")
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            this.setState({
                clientes:responseJson
            });
        })
    }

    pagarAgora = (itensVendidos) => {
        this.setState({
            pagando:true,
            itensVendidos:itensVendidos
        });
    }

    //recebe os dados de pagamento e da venda e envia para pi para gravar no banco de dados
    pagar = (resp) => {
        //1º gravar dados da venda(valor,id do cliente, total pago, etc)
        fetch("http://pdv/exibir/clientes/")
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            this.setState({
                clientes:responseJson
            });
        })
    }

    componentDidMount(){
        this.exibirProdutos();
        this.exibirClientes();
    }

    render() {
        const toggleTela = (this.state.pagando)?
        <TelaPagamento itens={this.state.itensVendidos} clientes={this.state.clientes} callbackParent={(resp) => this.pagar(resp)} />
        :
        <TelaPdv produtos={this.state.produtos} callbackParent={(itensVendidos) => this.pagarAgora(itensVendidos)} />
        return(
            <Fragment>
                {toggleTela}
            </Fragment>
        );
    }
}