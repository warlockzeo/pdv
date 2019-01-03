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

     render(){
        return (
            <div className="tela-clientes col-md-12">
                <ListaClientes dados={this.state.clientes} />
            </div>
        );
    };
}
    
export default TelaClientes;