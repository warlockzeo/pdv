import React, {Component} from 'react';
import ListaClientes from '../../components/ListaClientes';

class TelaClientes extends Component {
    state = {
        clientes: []
    };

    exibirClientes(){
        fetch("http://pdv/exibir/")
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            this.setState({
                clientes:responseJson
            });
        })
    }

    componentDidMount(){
        this.exibirClientes();
    }

    gravar = (cliente) => {
        console.log(cliente);
    }

    atualizar = (cliente) => {
        console.log(cliente);
    }

    excluir = (cliente) => {
        //console.log(cliente.cliente);
        fetch(`http://pdv/delete/${cliente.cliente}`)
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            if(responseJson.resp==='ok'){
                this.exibirClientes();
            }
        })
    }

    render(){
        return (
            <div className="tela-clientes col-md-12">
                <ListaClientes dados={this.state.clientes} gravar={this.gravar} atualizar={this.atualizar} excluir={this.excluir} />
            </div>
        );
    };
}
    
export default TelaClientes;