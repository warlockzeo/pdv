import React, {Component} from 'react';
import ListaProdutos from '../../components/ListaProdutos';

class TelaProdutos extends Component {
    state = {
        produtos: []
    };

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

    componentDidMount(){
        this.exibirProdutos();
    }

    gravar = (produto) => {
        fetch(`http://pdv/gravar/produtos/`,{
            method:'POST',
            body:JSON.stringify({
                codBarra:produto.codBarra,
                descr:produto.descr,
                preco:produto.preco,
                estoque:produto.estoque
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            //console.log(responseJson);
            //console.log(produto);
            if(responseJson.resp==='ok'){
                this.exibirProdutos();
            }
        })
    }

    atualizar = (produto) => {
        fetch(`http://pdv/atualizar/produtos/`,{
            method:'POST',
            body:JSON.stringify({
                id:produto.id,
                codBarra:produto.codBarra,
                descr:produto.descr,
                preco:produto.preco,
                estoque:produto.estoque
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            //console.log(responseJson);
            //console.log(produto);
            if(responseJson.resp==='ok'){
                this.exibirProdutos();
            }
        })
    }

    excluir = (produto) => {
        if (window.confirm("Confirma exclusão?")) {
            fetch(`http://pdv/apagar/produtos/${produto.produto}`)
            .then((response)=>response.json())
            .then((responseJson)=>
            {
                if(responseJson.resp==='ok'){
                    this.exibirProdutos();
                }
            })
        }
    }

    render(){
        return (
            <div className="tela-produtos col-md-12">
                <ListaProdutos dados={this.state.produtos} gravar={this.gravar} atualizar={this.atualizar} excluir={this.excluir} />
            </div>
        );
    };
}
    
export default TelaProdutos;