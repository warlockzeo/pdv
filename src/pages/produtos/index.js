import React, {Component} from 'react';
import ListaProdutos from '../../components/ListaProdutos';

class TelaProdutos extends Component {
    state = {
        produtos: []
    };

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

    componentDidMount(){
        this.carregaProdutos();
    }

    gravar = (produto) => {
        fetch(`http://pdv/gravar/produtos/`,{
            method:'POST',
            body:JSON.stringify({
                codBarra:produto.codBarra,
                descr:produto.descr,
                preco:(produto.preco).replace(",","."),
                estoque:produto.estoque
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            if(responseJson.resp==='ok'){
                this.carregaProdutos();
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
                preco:(produto.preco).replace(",","."),
                estoque:produto.estoque
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            if(responseJson.resp==='ok'){
                this.carregaProdutos();
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
                    this.carregaProdutos();
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