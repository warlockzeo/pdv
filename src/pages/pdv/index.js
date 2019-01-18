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
            pagando:false,
            vendaId:0
        };
    }

    //carrega informações dos produtos no state
    carregaProdutos(){
        fetch("http://pdv/exibir/produtos/")
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            this.setState({
                produtos:responseJson
            });
        })
    }

    //carrega informações dos clientes no state
    carregaClientes(){
        fetch("http://pdv/exibir/clientes/")
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            this.setState({
                clientes:responseJson
            });
        })
    }

    //função do callback para o botão pagar agora no componente telaPdv
    pagarAgora = (itensVendidos) => {
        this.setState({
            pagando:true,
            itensVendidos:itensVendidos,
        });
    }

    //recebe os dados de pagamento e da venda e envia para pi para gravar no banco de dados
    pagar = (resp) => {
        //1º gravar dados da venda(valor,id do cliente, total pago, etc)
        const resta = (resp.venda.resta>0)?parseFloat(resp.venda.resta).toFixed(2).replace(',','.'):'0,00';
        fetch(`http://pdv/gravar/vendas/`,{
            method:'POST',
            body:JSON.stringify({
                cliente: resp.venda.cliente,
                total: parseFloat(resp.venda.total).toFixed(2).replace(',','.'),
                desconto: parseFloat(resp.venda.desconto).toFixed(2).replace(',','.'),
                totalAPagar: parseFloat(resp.venda.totalAPagar).toFixed(2).replace(',','.'),
                pago:parseFloat(resp.venda.pago).toFixed(2).replace(',','.'),
                formaPg:resp.venda.formaPg,
                resta:resta
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            if(responseJson.resp==='ok'){
                this.setState({vendaId:responseJson.id});
                //console.log(responseJson);
            }

            resp.itensVendidos.forEach( item => {
                //2º grava itens vendidos
                fetch(`http://pdv/gravarItensVendidos/`,{
                    method:'POST',
                    body:JSON.stringify({
                        idVenda: responseJson.id,
                        idProduto: item.id,
                        quant: item.quant,
                        unit: parseFloat(item.unit).toFixed(2).replace(',','.'),
                        subTotal: parseFloat(item.subTotal).toFixed(2).replace(',','.')
                    })
                })
                .then((response)=>response.json())
                .then((responseJson)=>
                {
                    if(responseJson.resp==='ok'){
                        //console.log(responseJson)
                    }
                })
            });
        })//fim do 1º passo

        //3º atualiza saldo do cliente
        if(resp.venda.resta)
        fetch(`http://pdv/atualizaSaldo/`,{
            method:'POST',
            body:JSON.stringify({
                id: resp.venda.cliente,
                saldo:parseFloat(resp.venda.resta).toFixed(2).replace(',','.')
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            if(responseJson.resp==='ok'){
                //console.log(responseJson.sql)
            }
        })

        //4º atualizar estoques
        resp.itensVendidos.forEach( item => {
            //atualiza estoques
            fetch(`http://pdv/diminuiEstoque/`,{
                method:'POST',
                body:JSON.stringify({
                    id: item.id,
                    estoque: item.quant
                })
            })
            .then((response)=>response.json())
            .then((responseJson)=>
            {
                if(responseJson.resp==='ok'){
                    //console.log(responseJson)
                }
            })
        });//fim do map()

        //5º imprimir cupom
        fetch(`http://pdv/imprimeCupom/`,{
            method:'POST',
            body:JSON.stringify({
                venda:{
                    cliente: resp.venda.cliente,
                    total: parseFloat(resp.venda.total).toFixed(2).replace(',','.'),
                    desconto: parseFloat(resp.venda.desconto).toFixed(2).replace(',','.'),
                    totalAPagar: parseFloat(resp.venda.totalAPagar).toFixed(2).replace(',','.'),
                    pago:parseFloat(resp.venda.pago).toFixed(2).replace(',','.'),
                    formaPg:resp.venda.formaPg,
                    resta:parseFloat(resp.venda.resta).toFixed(2).replace(',','.')
                },
                itensVendidos: resp.itensVendidos
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>
        {
             if(responseJson.resp==='ok'){
                console.log(responseJson);
                window.location.href = '/';
            }
        })//fim do 5º passo
    }

    componentDidMount(){
        this.carregaProdutos();
        this.carregaClientes();
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