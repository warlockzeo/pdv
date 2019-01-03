import React, {Component} from 'react';
import ListaClientes from '../../components/ListaClientes';

class TelaClientes extends Component {
    state = {
        clientes: []
    };

    exibirClientes(){
        fetch("http://localhost/react/pdv/public/api/")
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

    render(){
        return (
            <div className="tela-clientes col-md-12">
                <ListaClientes dados={this.state.clientes} gravar={this.gravar} atualizar={this.atualizar} />
            </div>
        );
    };
}
    
export default TelaClientes;