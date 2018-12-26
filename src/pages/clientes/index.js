import React, {Component} from 'react';
import ListaClientes from '../../components/ListaClientes';

const clientes = [{
        id: 1,
        name: "Jonathan",
        endereco: "Rua jose alves dias, 23",
        bairro: "Centro",
        fone: "99982-3437"
    }, {
        id: 2,
        name: "Joana",
        endereco: "Rua jose alves dias, 23",
        bairro: "Centro",
        fone: "99982-3437"
    }, {
        id: 3,
        name: "Sansão",
        endereco: "Rua jose alves dias, 23",
        bairro: "Centro",
        fone: "99982-3437"
    }, {
        id: 4,
        name: "Maria",
        endereco: "Rua jose alves dias, 23",
        bairro: "Brasília",
        fone: "99982-3437"
    }, {
        id: 5,
        name: "Cida",
        endereco: "Rua jose alves dias, 23",
        bairro: "Centro",
        fone: "99982-3437"
    }];

class TelaClientes extends Component {
    state = {
        clientes :[]
    };

    componentDidMount(){
        this.setState({
            clientes: clientes
        });
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