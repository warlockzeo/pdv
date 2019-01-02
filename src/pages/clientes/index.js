import React, {Component} from 'react';
import ListaClientes from '../../components/ListaClientes';

class TelaClientes extends Component {
    constructor(){
        super();
        this.state = {
            clientes: []
        };
        this.exibirClientes();
    }

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

     render(){
        console.log(this.state.clientes);
        return (
            <div className="tela-clientes col-md-12">
                <ListaClientes dados={this.state.clientes} />
            </div>
        );
    };
}
    
export default TelaClientes;